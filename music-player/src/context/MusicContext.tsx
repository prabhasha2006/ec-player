import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { Track, PlaylistState, EqualizerBand, EQUALIZER_FREQUENCIES } from '../types/music';

interface MusicContextType {
  state: PlaylistState;
  audioRef: React.RefObject<HTMLAudioElement>;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  equalizer: BiquadFilterNode[];
  actions: {
    setTracks: (tracks: Track[]) => void;
    addTrack: (track: Track) => void;
    playTrack: (index: number) => void;
    togglePlay: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    setVolume: (volume: number) => void;
    setPlaybackRate: (rate: number) => void;
    setCurrentTime: (time: number) => void;
    toggleShuffle: () => void;
    toggleLoop: () => void;
    setEqualizerGain: (bandIndex: number, gain: number) => void;
  };
}

type MusicAction =
  | { type: 'SET_TRACKS'; payload: Track[] }
  | { type: 'ADD_TRACK'; payload: Track }
  | { type: 'PLAY_TRACK'; payload: number }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYBACK_RATE'; payload: number }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_LOOP' };

const initialState: PlaylistState = {
  tracks: [],
  currentTrack: null,
  currentIndex: -1,
  isPlaying: false,
  isShuffled: false,
  isLooping: false,
  volume: 0.8,
  playbackRate: 1,
  currentTime: 0,
};

function musicReducer(state: PlaylistState, action: MusicAction): PlaylistState {
  switch (action.type) {
    case 'SET_TRACKS':
      return { ...state, tracks: action.payload };
    case 'ADD_TRACK':
      return { ...state, tracks: [...state.tracks, action.payload] };
    case 'PLAY_TRACK':
      const track = state.tracks[action.payload];
      return {
        ...state,
        currentTrack: track,
        currentIndex: action.payload,
        isPlaying: true,
      };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'NEXT_TRACK':
      const nextIndex = state.isShuffled 
        ? Math.floor(Math.random() * state.tracks.length)
        : (state.currentIndex + 1) % state.tracks.length;
      return {
        ...state,
        currentIndex: nextIndex,
        currentTrack: state.tracks[nextIndex],
      };
    case 'PREV_TRACK':
      const prevIndex = state.isShuffled
        ? Math.floor(Math.random() * state.tracks.length)
        : state.currentIndex - 1 < 0 ? state.tracks.length - 1 : state.currentIndex - 1;
      return {
        ...state,
        currentIndex: prevIndex,
        currentTrack: state.tracks[prevIndex],
      };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PLAYBACK_RATE':
      return { ...state, playbackRate: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'TOGGLE_SHUFFLE':
      return { ...state, isShuffled: !state.isShuffled };
    case 'TOGGLE_LOOP':
      return { ...state, isLooping: !state.isLooping };
    default:
      return state;
  }
}

const MusicContext = createContext<MusicContextType | null>(null);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const equalizerRef = useRef<BiquadFilterNode[]>([]);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      // Create equalizer bands
      equalizerRef.current = EQUALIZER_FREQUENCIES.map((freq) => {
        const filter = audioContextRef.current!.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = freq;
        filter.Q.value = 1;
        filter.gain.value = 0;
        return filter;
      });

      // Connect equalizer in series
      equalizerRef.current.forEach((filter, index) => {
        if (index === 0) {
          // Will connect source later
        } else {
          equalizerRef.current[index - 1].connect(filter);
        }
      });

      // Connect last filter to analyser and destination
      const lastFilter = equalizerRef.current[equalizerRef.current.length - 1];
      lastFilter.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioContextRef.current && !mediaSourceRef.current) {
      mediaSourceRef.current = audioContextRef.current.createMediaElementSource(audio);
      mediaSourceRef.current.connect(equalizerRef.current[0]);
    }

    return () => {
      if (mediaSourceRef.current) {
        mediaSourceRef.current.disconnect();
      }
    };
  }, []);

  const actions = {
    setTracks: (tracks: Track[]) => dispatch({ type: 'SET_TRACKS', payload: tracks }),
    addTrack: (track: Track) => dispatch({ type: 'ADD_TRACK', payload: track }),
    playTrack: (index: number) => dispatch({ type: 'PLAY_TRACK', payload: index }),
    togglePlay: () => dispatch({ type: 'TOGGLE_PLAY' }),
    nextTrack: () => dispatch({ type: 'NEXT_TRACK' }),
    prevTrack: () => dispatch({ type: 'PREV_TRACK' }),
    setVolume: (volume: number) => dispatch({ type: 'SET_VOLUME', payload: volume }),
    setPlaybackRate: (rate: number) => dispatch({ type: 'SET_PLAYBACK_RATE', payload: rate }),
    setCurrentTime: (time: number) => dispatch({ type: 'SET_CURRENT_TIME', payload: time }),
    toggleShuffle: () => dispatch({ type: 'TOGGLE_SHUFFLE' }),
    toggleLoop: () => dispatch({ type: 'TOGGLE_LOOP' }),
    setEqualizerGain: (bandIndex: number, gain: number) => {
      if (equalizerRef.current[bandIndex]) {
        equalizerRef.current[bandIndex].gain.value = gain;
      }
    },
  };

  return (
    <MusicContext.Provider
      value={{
        state,
        audioRef,
        audioContext: audioContextRef.current,
        analyser: analyserRef.current,
        equalizer: equalizerRef.current,
        actions,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};