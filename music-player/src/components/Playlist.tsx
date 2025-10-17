import React from 'react';
import { Play, Pause, Music2, Clock } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

const Playlist: React.FC = () => {
  const { state, actions } = useMusicContext();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (index: number) => {
    if (state.currentIndex === index) {
      actions.togglePlay();
    } else {
      actions.playTrack(index);
    }
  };

  if (state.tracks.length === 0) {
    return (
      <div className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/20">
        <div className="text-center">
          <Music2 className="w-16 h-16 text-emerald-600/50 mx-auto mb-4" />
          <h3 className="text-emerald-200 text-lg font-medium mb-2">No music loaded</h3>
          <p className="text-emerald-400">Import songs or folders to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-950/40 backdrop-blur-sm rounded-xl border border-emerald-500/20 overflow-hidden">
      <div className="p-6 border-b border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-semibold text-emerald-100">Playlist</h2>
          </div>
          <div className="text-emerald-400 text-sm">
            {state.tracks.length} track{state.tracks.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {state.tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => handleTrackClick(index)}
            className={`group flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${
              state.currentIndex === index
                ? 'bg-emerald-600/20 border-r-4 border-emerald-500'
                : 'hover:bg-emerald-900/20'
            }`}
          >
            <div className="flex-shrink-0 relative">
              <div className="w-10 h-10 bg-emerald-900/40 rounded-lg flex items-center justify-center">
                {state.currentIndex === index && state.isPlaying ? (
                  <Pause className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Play className="w-5 h-5 text-emerald-300 ml-0.5" />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h4 className={`font-medium truncate ${
                    state.currentIndex === index
                      ? 'text-emerald-100'
                      : 'text-emerald-200 group-hover:text-emerald-100'
                  }`}>
                    {track.title}
                  </h4>
                  <p className="text-emerald-400 text-sm truncate">{track.artist}</p>
                  {track.album && (
                    <p className="text-emerald-500 text-xs truncate">{track.album}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-400 text-sm">
                    {track.duration ? formatTime(track.duration) : '--:--'}
                  </span>
                </div>
              </div>
            </div>

            {state.currentIndex === index && (
              <div className="flex-shrink-0">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-emerald-500 rounded animate-pulse"></div>
                  <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse delay-75"></div>
                  <div className="w-1 h-4 bg-emerald-300 rounded animate-pulse delay-150"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;