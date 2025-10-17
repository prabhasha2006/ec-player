import React, { useRef } from 'react';
import { FolderOpen, Upload, Music } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';
import { Track } from '../types/music';

const ImportSection: React.FC = () => {
  const { actions } = useMusicContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const createTrackFromFile = (file: File): Track => {
    return {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Unknown Artist',
      duration: 0, // Will be updated when loaded
      file,
      url: URL.createObjectURL(file),
    };
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const audioFiles = Array.from(files).filter(file =>
      file.type.startsWith('audio/') || 
      /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)
    );

    const tracks = audioFiles.map(createTrackFromFile);
    
    if (tracks.length === 1) {
      actions.addTrack(tracks[0]);
      actions.playTrack(0); // Auto-play single file
    } else {
      actions.setTracks(tracks);
    }

    // Clear the input
    event.target.value = '';
  };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const audioFiles = Array.from(files).filter(file =>
      file.type.startsWith('audio/') || 
      /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)
    );

    const tracks = audioFiles.map(createTrackFromFile);
    actions.setTracks(tracks);

    // Clear the input
    event.target.value = '';
  };

  return (
    <div className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-semibold text-emerald-100">Import Music</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Single File Import */}
        <div className="space-y-3">
          <h3 className="text-emerald-300 font-medium">Single Track</h3>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-6 border-2 border-dashed border-emerald-600/40 rounded-xl bg-emerald-900/20 hover:bg-emerald-800/30 hover:border-emerald-500/60 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <div className="text-center">
                <p className="text-emerald-200 font-medium">Upload a song</p>
                <p className="text-emerald-400 text-sm mt-1">
                  MP3, WAV, OGG, M4A, AAC, FLAC
                </p>
              </div>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Folder Import */}
        <div className="space-y-3">
          <h3 className="text-emerald-300 font-medium">Music Folder</h3>
          <button
            onClick={() => folderInputRef.current?.click()}
            className="w-full p-6 border-2 border-dashed border-emerald-600/40 rounded-xl bg-emerald-900/20 hover:bg-emerald-800/30 hover:border-emerald-500/60 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center gap-3">
              <FolderOpen className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <div className="text-center">
                <p className="text-emerald-200 font-medium">Import folder</p>
                <p className="text-emerald-400 text-sm mt-1">
                  Select multiple audio files
                </p>
              </div>
            </div>
          </button>
          <input
            ref={folderInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
            multiple
            onChange={handleFolderSelect}
            className="hidden"
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-900/20 rounded-lg border border-emerald-700/30">
        <p className="text-emerald-300 text-sm">
          <span className="font-medium">Supported formats:</span> MP3, WAV, OGG, M4A, AAC, FLAC
        </p>
      </div>
    </div>
  );
};

export default ImportSection;