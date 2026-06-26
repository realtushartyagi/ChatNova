import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import AudioPlayer from './AudioPlayer'
import { File as FileIcon, Download, X } from 'lucide-react'

const Message = ({message}) => {
  const [fullscreenImage, setFullscreenImage] = useState(null)

  useEffect(()=>{
    Prism.highlightAll()
  },[message.content])

  return (
    <>
      <div>
        {message.role === "user" ? (
          <div className='flex items-start justify-end my-8 gap-4 animate-fade-in-up'>
            <div className='flex flex-col gap-1 p-5 px-7 bg-white/5 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)] rounded-[24px] rounded-tr-sm max-w-2xl backdrop-blur-md'>
              
              {/* Attachments Rendering */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {message.attachments.map(att => (
                    <div key={att.id} className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 group">
                      {att.isImage ? (
                        <img 
                          src={att.previewUrl} 
                          alt={att.name} 
                          className="w-24 h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity" 
                          onClick={() => setFullscreenImage(att.previewUrl)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-48 p-3 flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors">
                          <FileIcon size={32} className="text-indigo-400 shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm text-white font-medium truncate">{att.name}</span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">{att.name.split('.').pop()} • {(att.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          <a href={URL.createObjectURL(att.file)} download={att.name} className="ml-auto text-gray-400 hover:text-indigo-400 p-1">
                            <Download size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Voice Note Rendering */}
              {message.voiceNote && (
                <div className="mb-3">
                  <AudioPlayer audioUrl={message.voiceNote.url} />
                </div>
              )}

              {/* Text Content */}
              {message.content && (
                <p className='text-[16px] leading-relaxed font-light text-white'>{message.content}</p>
              )}

              <span className='text-[10px] text-[#B8BEC8] font-medium tracking-wide self-end mt-2 uppercase'>
                {moment(message.timestamp).fromNow()}
              </span>
            </div>
            <div className='w-10 h-10 mt-1 rounded-full border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center bg-[#0B0F14] shrink-0'>
               <img src={assets.user_icon} alt="User" className='w-6 h-6 invert opacity-80'/>
            </div>
          </div>
        )
        : 
        (
          <div className='flex items-start justify-start my-8 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
          <div className='inline-flex flex-col gap-1 p-6 px-8 w-full max-w-3xl bg-black/40 border border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.15)] rounded-[24px] rounded-tl-sm backdrop-blur-[30px]'>
            {message.isImage ? (
              <img src={message.content} alt="AI output" className='w-full max-w-md mt-2 rounded-[16px] object-cover shadow-[0_0_20px_rgba(99,102,241,0.3)] animate-blur-in cursor-pointer' onClick={() => setFullscreenImage(message.content)} loading="lazy"/>
            ):
            (
              <div className='text-[16px] leading-[1.8] text-white reset-tw font-light tracking-wide'>
               <Markdown>{message.content}</Markdown>
              </div>
            )}
            <span className='text-[10px] text-[#B8BEC8] font-medium tracking-wide mt-4 uppercase'>{moment(message.timestamp).fromNow()}</span>
          </div>
          </div>
        )
      }
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setFullscreenImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={fullscreenImage} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            alt="Fullscreen Preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default Message
