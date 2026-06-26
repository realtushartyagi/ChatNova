import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Paperclip, Mic, Send, X, File as FileIcon, Image as ImageIcon, Trash2, StopCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ChatInput = ({ onSend, loading, mode, setMode, isPublished, setIsPublished }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const textRef = useRef(text);
  const isRecordingRef = useRef(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Keep textRef updated
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Focus textarea on load
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [text]);

  // Voice Recording Functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        onSend(textRef.current, attachments, { url: audioUrl, blob: audioBlob });
        
        setAttachments([]);
        setText('');
        setIsRecording(false);
        isRecordingRef.current = false;
        setRecordingTime(0);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      isRecordingRef.current = true;
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Start Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true; // Live transcription
        
        const initialText = textRef.current;
        
        recognition.onresult = (event) => {
          if (!isRecordingRef.current) return;
          
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setText(initialText + (initialText ? ' ' : '') + currentTranscript);
        };
        
        speechRecognitionRef.current = recognition;
        recognition.start();
      }

    } catch (err) {
      toast.error('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      isRecordingRef.current = false;
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(timerRef.current);
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsRecording(false);
      isRecordingRef.current = false;
      setRecordingTime(0);
      setText(''); // clear text since we cancelled
      audioChunksRef.current = [];
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // File Handling
  const handleFiles = (files) => {
    const newAttachments = Array.from(files).map(file => {
      const isImage = file.type.startsWith('image/');
      return {
        file,
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        isImage,
        previewUrl: isImage ? URL.createObjectURL(file) : null
      };
    });

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => {
      const target = prev.find(a => a.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(a => a.id !== id);
    });
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Paste Support
  const handlePaste = (e) => {
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      handleFiles(e.clipboardData.files);
    }
  };

  // Key handlers
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (loading) return;
    if (text.trim() === '' && attachments.length === 0) return;

    onSend(text, attachments, null);
    setText('');
    setAttachments([]);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  return (
    <div 
      className="w-full relative animate-slide-in-up z-20"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Global Drag Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-[#0B0F14]/90 backdrop-blur-md flex items-center justify-center border-4 border-dashed border-indigo-500 m-4 rounded-[40px]">
          <div className="flex flex-col items-center gap-4 text-indigo-400">
            <ImageIcon size={64} className="animate-bounce" />
            <h2 className="text-3xl font-bold tracking-tight">Drop files here</h2>
            <p className="text-gray-400">Attach images, PDFs, code files, and more</p>
          </div>
        </div>
      )}

      {/* Mode Selector & Community Toggle */}
      {mode === 'image' && (
        <div className='flex justify-center mb-4'>
          <label className='inline-flex items-center gap-3 cursor-pointer group bg-[#081019]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10'>
            <div className='relative w-4 h-4 rounded border border-white/30 flex items-center justify-center group-hover:border-indigo-400 transition-colors bg-white/5'>
                {isPublished && <div className='w-2 h-2 bg-indigo-400 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.8)]'></div>}
            </div>
            <input type="checkbox" className='hidden' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)}/>
            <p className='text-xs text-[#B8BEC8] font-medium uppercase tracking-widest group-hover:text-white transition-colors'>Publish to Community</p>
          </label>
        </div>
      )}

      <div className={`bg-[#121822]/90 backdrop-blur-[30px] border border-white/10 rounded-[28px] p-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${isRecording ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'focus-within:border-indigo-500/40 focus-within:shadow-[0_0_40px_rgba(99,102,241,0.15)]'}`}>
        
        {/* Attachment Previews */}
        {attachments.length > 0 && (
          <div className="flex gap-3 overflow-x-auto p-2 mb-2 custom-scrollbar">
            {attachments.map(att => (
              <div key={att.id} className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                {att.isImage ? (
                  <img src={att.previewUrl} alt={att.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-white/5">
                    <FileIcon size={24} className="text-indigo-400" />
                    <span className="text-[10px] text-gray-400 truncate w-full text-center px-1 font-medium uppercase">{att.name.split('.').pop()}</span>
                  </div>
                )}
                <button 
                  onClick={(e) => { e.preventDefault(); removeAttachment(att.id); }}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        {isRecording ? (
          <div className="flex items-center gap-4 px-4 py-3 min-h-[50px]">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
              <span className="text-red-400 font-mono font-medium">{formatTime(recordingTime)}</span>
              {/* Fake Waveform */}
              <div className="flex items-center gap-1 h-6 ml-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 bg-red-400/50 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
            <button type="button" onClick={cancelRecording} className="text-gray-400 hover:text-white p-2 transition-colors">
              <Trash2 size={20} />
            </button>
            <button type="button" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
              <StopCircle size={20} />
            </button>
          </div>
        ) : (
          <form className="flex items-end gap-2" onSubmit={handleSubmit}>
            <div className="flex items-center pb-1 pl-2">
              <input 
                type="file" 
                multiple 
                className="hidden" 
                ref={fileInputRef} 
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = null;
                }}
                accept="image/*,.pdf,.doc,.docx,.txt,.md,.rtf,.csv,.xls,.xlsx,.ppt,.pptx,.js,.ts,.jsx,.tsx,.html,.css,.scss,.json,.xml,.yaml,.yml,.py,.java,.cpp,.c,.cs,.go,.rs,.php,.zip,.rar,.7z,.tar,.gz,.mp3,.wav,.ogg,.m4a,.mp4,.mov,.mkv,.avi,.webm"
              />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2.5 text-[#B8BEC8] hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all">
                <Paperclip size={20} />
              </button>
            </div>

            <div className='flex flex-col flex-1 pb-1'>
               <div className='flex items-center px-2 mb-2 opacity-60 hover:opacity-100 transition-opacity w-max'>
                  <select onChange={(e)=>setMode(e.target.value)} value={mode} className='appearance-none text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 py-1 pl-3 pr-6 rounded-lg outline-none cursor-pointer transition-colors border border-indigo-500/20'>
                    <option className='bg-[#0B0F14] text-white' value="text">Text Generation</option>
                    <option className='bg-[#0B0F14] text-white' value="image">Image Generation</option>
                  </select>
                  <div className='pointer-events-none -ml-4 text-indigo-400 text-[8px]'>▼</div>
               </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                placeholder="Message Nova..."
                className="w-full bg-transparent text-white placeholder:text-[#B8BEC8] px-3 py-1 outline-none resize-none min-h-[44px] max-h-[150px] custom-scrollbar"
                rows={1}
              />
            </div>

            <div className="flex items-center gap-1 pb-1 pr-1">
              {!text.trim() && attachments.length === 0 ? (
                <button type="button" onClick={startRecording} className="p-3 text-[#B8BEC8] hover:text-white hover:bg-white/10 rounded-full transition-all">
                  <Mic size={22} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${loading ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)] text-black'}`}
                >
                  <Send size={20} className={loading ? 'opacity-50' : 'translate-x-0.5'} />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
