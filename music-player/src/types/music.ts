export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  file: File;
  url: string;
  cover?: string;
}

export interface PlaylistState {
  tracks: Track[];
  currentTrack: Track | null;
  currentIndex: number;
  isPlaying: boolean;
  isShuffled: boolean;
  isLooping: boolean;
  volume: number;
  playbackRate: number;
  currentTime: number;
}

export interface EqualizerBand {
  frequency: number;
  gain: number;
  label: string;
}

export interface EqualizerPreset {
  name: string;
  gains: number[];
}

export const EQUALIZER_FREQUENCIES = [62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

export const EQUALIZER_PRESETS: EqualizerPreset[] = [
  { name: 'Custom', gains: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'Pop', gains: [-1, 2, 4, 4, 1, -1, -2, -2, -1] },
  { name: 'Rock', gains: [4, 3, -2, -3, -1, 2, 5, 6, 6] },
  { name: 'Jazz', gains: [2, 1, 1, 2, -1, -1, 0, 1, 2] },
  { name: 'Classical', gains: [3, 2, -1, -1, -1, -1, -1, 2, 3] },
  { name: 'Electronic', gains: [3, 2, 0, -1, -2, 1, 0, 2, 4] },
  { name: 'Hip Hop', gains: [4, 3, 1, 2, -1, -1, 1, 2, 3] },
  { name: 'Vocal', gains: [-2, -1, -1, 1, 3, 3, 2, 1, 0] }
];