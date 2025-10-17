import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Gauge,
} from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

const PlayerControls: React.FC = () => {
  const { state, actions, audioRef } = useMusicContext();
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + 30
      );
    }
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      actions.setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(state.volume);
      actions.setVolume(0);
      setIsMuted(true);
    }
  };

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="bg-emerald-950/60 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/30">
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Shuffle */}
        <button
          onClick={actions.toggleShuffle}
          className={`p-3 rounded-full transition-all duration-200 ${
            state.isShuffled
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
              : 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/40'
          }`}
          title="Shuffle"
        >
          <Shuffle className="w-5 h-5" />
        </button>

        {/* Previous Track */}
        <button
          onClick={actions.prevTrack}
          disabled={state.tracks.length === 0}
          className="p-3 rounded-full bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Previous Track"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        {/* Rewind 10s */}
        <button
          onClick={handleRewind}
          disabled={!state.currentTrack}
          className="p-3 rounded-full bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Rewind 10 seconds"
        >
          <Rewind className="w-5 h-5" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={actions.togglePlay}
          disabled={!state.currentTrack}
          className="p-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105"
          title={state.isPlaying ? 'Pause' : 'Play'}
        >
          {state.isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>

        {/* Fast Forward 30s */}
        <button
          onClick={handleFastForward}
          disabled={!state.currentTrack}
          className="p-3 rounded-full bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Fast forward 30 seconds"
        >
          <FastForward className="w-5 h-5" />
        </button>

        {/* Next Track */}
        <button
          onClick={actions.nextTrack}
          disabled={state.tracks.length === 0}
          className="p-3 rounded-full bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Next Track"
        >
          <SkipForward className="w-6 h-6" />
        </button>

        {/* Loop */}
        <button
          onClick={actions.toggleLoop}
          className={`p-3 rounded-full transition-all duration-200 ${
            state.isLooping
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
              : 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/40'
          }`}
          title="Loop"
        >
          <Repeat className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleVolumeToggle}
            className="p-2 rounded-lg text-emerald-400 hover:text-emerald-200 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || state.volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.volume}
              onChange={(e) => {
                const volume = parseFloat(e.target.value);
                actions.setVolume(volume);
                if (volume > 0) setIsMuted(false);
              }}
              className="absolute w-full h-2 bg-emerald-900/30 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-lg pointer-events-none"
              style={{ width: `${state.volume * 100}%` }}
            />
          </div>
          <span className="text-emerald-300 text-sm min-w-[3ch]">
            {Math.round(state.volume * 100)}
          </span>
        </div>

        {/* Current Track Info */}
        <div className="text-center">
          {state.currentTrack && (
            <div className="text-emerald-100">
              <div className="font-medium truncate">{state.currentTrack.title}</div>
              <div className="text-emerald-400 text-sm truncate">{state.currentTrack.artist}</div>
            </div>
          )}
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={() => setShowSpeedControl(!showSpeedControl)}
            className="p-2 rounded-lg text-emerald-400 hover:text-emerald-200 transition-colors"
            title="Playback Speed"
          >
            <Gauge className="w-5 h-5" />
          </button>
          {showSpeedControl && (
            <div className="flex items-center gap-2">
              {playbackSpeeds.map((speed) => (
                <button
                  key={speed}
                  onClick={() => actions.setPlaybackRate(speed)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    state.playbackRate === speed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;