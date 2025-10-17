import React, { useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';
import PlayerControls from './PlayerControls';
import WaveVisualizer from './WaveVisualizer';
import Equalizer from './Equalizer';
import Playlist from './Playlist';
import ImportSection from './ImportSection';
import ProgressBar from './ProgressBar';

const MusicPlayer: React.FC = () => {
  const { state, actions, audioRef } = useMusicContext();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume and playback rate
    audio.volume = state.volume;
    audio.playbackRate = state.playbackRate;

    // Handle play/pause
    if (state.isPlaying && state.currentTrack) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [state.isPlaying, state.volume, state.playbackRate, audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (state.isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        actions.nextTrack();
      }
    };

    const handleLoadedMetadata = () => {
      // Update track duration when loaded
      // This would typically update the track in the context
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [state.isLooping, actions, audioRef]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">
            Advanced Music Player
          </h1>
          <p className="text-emerald-300">Professional audio experience with advanced controls</p>
        </div>

        {/* Import Section */}
        <ImportSection />

        {/* Main Player Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Player Controls & Visualizer */}
          <div className="xl:col-span-2 space-y-6">
            {/* Progress Bar */}
            <ProgressBar />
            
            {/* Wave Visualizer */}
            <WaveVisualizer />
            
            {/* Player Controls */}
            <PlayerControls />
            
            {/* Equalizer */}
            <Equalizer />
          </div>

          {/* Right Column - Playlist */}
          <div className="xl:col-span-1">
            <Playlist />
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={state.currentTrack?.url}
          preload="metadata"
          className="hidden"
        />
      </div>
    </div>
  );
}

export default MusicPlayer