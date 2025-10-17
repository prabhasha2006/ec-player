import React, { useEffect, useState } from 'react';
import { useMusicContext } from '../context/MusicContext';

const ProgressBar: React.FC = () => {
  const { state, actions, audioRef } = useMusicContext();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
        actions.setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [isDragging, actions, audioRef]);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    actions.setCurrentTime(time);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!state.currentTrack) {
    return null;
  }

  return (
    <div className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
      <div className="flex items-center gap-4">
        <span className="text-emerald-300 text-sm font-mono min-w-[5ch]">
          {formatTime(currentTime)}
        </span>
        
        <div className="flex-1 relative group">
          <div className="relative h-2 bg-emerald-900/40 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
        </div>
        
        <span className="text-emerald-300 text-sm font-mono min-w-[5ch]">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;