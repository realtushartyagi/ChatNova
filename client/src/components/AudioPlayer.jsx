import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 mt-2 w-64 border border-white/10 group">
      <audio ref={audioRef} src={audioUrl} />
      
      <button 
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-black rounded-full hover:bg-cyan-400 transition-colors shrink-0"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-[1px]" />}
      </button>

      <div className="flex flex-col flex-1 gap-1 cursor-pointer" onClick={handleSeek}>
        {/* Fake waveform generation for visual effect */}
        <div className="flex items-center gap-[2px] h-4">
          {[...Array(20)].map((_, i) => {
            const isActive = (i / 20) <= (progress / duration);
            return (
              <div 
                key={i} 
                className={`flex-1 rounded-full transition-colors ${isActive ? 'bg-cyan-400' : 'bg-gray-600'}`} 
                style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
              />
            )
          })}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <a 
        href={audioUrl} 
        download="voice-note.webm" 
        className="text-gray-400 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Download size={16} />
      </a>
    </div>
  );
};

export default AudioPlayer;
