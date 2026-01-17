import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat, Upload, Maximize, Minimize, Sliders } from 'lucide-react';

// --- Types ---
export interface Theme {
    name: string;
    bg: string;
    bars: string[];
    peak: string;
    button: string;
    buttonHover: string;
    slider: string;
}

export type ThemeKey =
    | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'neon' | 'purple' | 'amber' | 'rose';

export type Themes = Record<ThemeKey, Theme>;

export interface ThemeSelectorProps {
    theme: ThemeKey | Theme;
    setTheme: (theme: any) => void;
    close: () => void;
}

export interface VisualizePlayerProps {
    audio?: string;
    name?: string;
    author?: string;
    theme?: ThemeKey | Theme;
    volume?: number;
    thumbnail?: string | null;
    controls?: {
        play?: boolean;
        pause?: boolean;
        stop?: boolean;
        seekbar?: boolean;
        volume?: boolean;
        loop?: boolean;
        trackName?: boolean;
        equalizer?: boolean;
        speed?: boolean;
    };
    mode?: 'light' | 'dark';
    bands?: { freq: number }[] | null;
    transparent?: boolean;
    autoPlay?: boolean;
    equalizer?: {
        bass?: number;
        mid?: number;
        treble?: number;
    };
}

export interface WaveAudioPlayerProps {
    audio: string;
    gradient?: string[];
    background?: string;
    autoPlay?: boolean;
    thumbnail?: string | null;
    width?: number;
    equalizer?: {
        bass?: number;
        mid?: number;
        treble?: number;
    };
    mode?: 'light' | 'dark';
}

export interface NanoAudioPlayerProps {
    audio: string;
    thumbnail?: string;
    gradient?: string[];
    background?: string;
    autoPlay?: boolean;
    mode?: 'light' | 'dark';
}

export interface VideoPlayerProps {
    video: string;
    name?: string;
    audioVisual?: {
        side: 'left' | 'right' | 'top' | 'bottom';
        color?: string;
        peak?: string;
    } | null;
    volume?: number;
    thumbnail?: string | null;
    controls?: {
        play?: boolean;
        pause?: boolean;
        stop?: boolean;
        seekbar?: boolean;
        volume?: boolean;
        fullscreen?: boolean;
        videoName?: boolean;
        equalizer?: boolean;
        speed?: boolean;
    };
    mode?: 'light' | 'dark';
    transparent?: boolean;
    autoPlay?: boolean;
    color?: string;
    equalizer?: {
        bass?: number;
        mid?: number;
        treble?: number;
    };
}

// --- Themes ---

const themes: Themes = {
    rainbow: {
        name: 'Rainbow',
        bg: 'linear-gradient(135deg, #ef444422 0%, #f9731622 15%, #f59e0b22 30%, #10b98122 45%, #06b6d422 60%, #3b82f622 75%, #6366f122 85%, #a855f722 92%, #ec489922 100%)',
        bars: [
            '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
            '#22c55e', '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6',
            '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
        ],
        peak: '#a0a0a0ff',
        button: '#ec4899',
        buttonHover: '#d946ef',
        slider: '#ec4899'
    },
    ocean: {
        name: 'Ocean Blue',
        bg: 'linear-gradient(135deg, #667eea43 0%, #764ba243 100%)',
        bars: ['#0ea5e9', '#38bdf8', '#06b6d4', '#22d3ee'],
        peak: '#0369a1',
        button: '#0ea5e9',
        buttonHover: '#0284c7',
        slider: '#0ea5e9'
    },
    sunset: {
        name: 'Sunset',
        bg: 'linear-gradient(135deg, #f093fb43 0%, #f5576c43 100%)',
        bars: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
        peak: '#be123c',
        button: '#f43f5e',
        buttonHover: '#e11d48',
        slider: '#f43f5e'
    },
    forest: {
        name: 'Forest Green',
        bg: 'linear-gradient(135deg, #0ba36043 0%, #3cba9243 100%)',
        bars: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
        peak: '#047857',
        button: '#10b981',
        buttonHover: '#059669',
        slider: '#10b981'
    },
    midnight: {
        name: 'Midnight',
        bg: 'linear-gradient(135deg, #2c3e5043 0%, #3498db43 100%)',
        bars: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
        peak: '#1e40af',
        button: '#3b82f6',
        buttonHover: '#2563eb',
        slider: '#3b82f6'
    },
    neon: {
        name: 'Neon Cyan',
        bg: 'linear-gradient(135deg, #13547a43 0%, #80d0c743 100%)',
        bars: ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'],
        peak: '#0e7490',
        button: '#06b6d4',
        buttonHover: '#0891b2',
        slider: '#06b6d4'
    },
    purple: {
        name: 'Royal Purple',
        bg: 'linear-gradient(135deg, #2f1c5622 0%, #764ba243 100%)',
        bars: ['#8b5cf6', '#a78bfa', '#baabf9ff', '#ddd6fe'],
        peak: '#6d28d9',
        button: '#8b5cf6',
        buttonHover: '#7c3aed',
        slider: '#8b5cf6'
    },
    amber: {
        name: 'Amber Gold',
        bg: 'linear-gradient(135deg, #f59e0b43 0%, #d9770643 100%)',
        bars: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'],
        peak: '#b45309',
        button: '#f59e0b',
        buttonHover: '#d97706',
        slider: '#f59e0b'
    },
    rose: {
        name: 'Rose Pink',
        bg: 'linear-gradient(135deg, #ec489943 0%, #be185d43 100%)',
        bars: ['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8'],
        peak: '#9f1239',
        button: '#ec4899',
        buttonHover: '#db2777',
        slider: '#ec4899'
    }
}

// Audio

function ThemeSelector({ theme, setTheme, close }: ThemeSelectorProps) {
    const themeOptions = (Object.keys(themes) as ThemeKey[]).map(key => ({
        key,
        name: themes[key].name,
        colors: themes[key].bars
    }))
    return (
        <div className="container-glass rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Choose Color Palette</h2>
                <button
                    onClick={() => close()}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                    Close
                </button>
            </div>
            <div className="theme-selector grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {themeOptions.map(t => (
                    <div
                        key={t.key}
                        className={`theme-card bg-white p-4 rounded-lg cursor-pointer border-2 transition-all ${theme === t.key ? 'border-current shadow-lg' : 'border-transparent'}`}
                        onClick={() => setTheme(t.key)}
                    >
                        <div className="color-preview h-10 rounded mb-2" style={{ background: `linear-gradient(to right, ${t.colors.join(', ')})` }}></div>
                        <div className="text-sm font-medium text-gray-700">{t.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function VisualizePlayer({
    audio,
    name = 'No track loaded',
    author,
    theme = 'rainbow',
    volume: vol = 100,
    thumbnail = null,
    controls = {
        play: true,
        pause: true,
        stop: true,
        seekbar: true,
        volume: true,
        loop: true,
        trackName: true,
        equalizer: true,
        speed: true
    },
    mode = 'light' as 'light' | 'dark',
    bands: _bands = null,
    transparent = false,
    autoPlay = false,
    equalizer = {
        bass: 0,
        mid: 0,
        treble: 0
    }
}: VisualizePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(vol || 100);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [error, setError] = useState<string[][]>([]);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [eqBands, setEqBands] = useState({
        bass: equalizer.bass || 0,
        mid: equalizer.mid || 0,
        treble: equalizer.treble || 0
    })
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [containerWidth, setContainerWidth] = useState(0)

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const bassFilterRef = useRef<BiquadFilterNode | null>(null);
    const midFilterRef = useRef<BiquadFilterNode | null>(null);
    const trebleFilterRef = useRef<BiquadFilterNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const vuContainerRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    // Comprehensive prop type checks
    useEffect(() => {
        const errors = [];

        // 1. audio: must be a string or undefined/null
        if (audio && typeof audio !== 'string') {
            errors.push(['TypeError', 'audio must be a string (URL or path)']);
        }

        // 2. name: must be string
        if (name && typeof name !== 'string') {
            errors.push(['TypeError', 'name must be a string']);
        }

        // 3. theme: must be string key or valid object
        if (theme && typeof theme !== 'string' && typeof theme !== 'object') {
            errors.push(['TypeError', 'theme must be a string or a valid theme object']);
        } else if (typeof theme === 'object') {
            const keys = ['name', 'bg', 'bars', 'peak', 'button', 'buttonHover', 'slider'];
            for (const k of keys) {
                if (!(k in theme)) {
                    errors.push(['ThemeError', `theme object missing key: ${k}`]);
                }
            }
        }

        // 4. volume: must be number 0-100
        if (typeof vol !== 'number' || vol < 0 || vol > 100) {
            errors.push(['TypeError', 'volume must be a number between 0 and 100']);
        }

        // 5. controls: must be object with boolean keys
        if (typeof controls !== 'object' || Array.isArray(controls)) {
            errors.push(['TypeError', 'controls must be an object']);
        } else {
            const controlKeys = ['play', 'pause', 'stop', 'seekbar', 'volume', 'loop', 'trackName', 'equalizer'] as const;
            controlKeys.forEach(key => {
                if (controls && key in controls && typeof (controls as any)[key] !== 'boolean') {
                    errors.push(['TypeError', `controls.${key} must be a boolean`]);
                }
            });
        }

        // 6. mode: must be 'dark' or 'light'
        // mode is always 'light' | 'dark' by type

        // 7. bands: must be array of { freq: number }
        if (_bands) {
            if (!Array.isArray(_bands)) {
                errors.push(['TypeError', 'bands must be an array']);
            } else if (_bands.length === 0) {
                errors.push(['ValueError', 'bands array cannot be empty']);
            } else {
                _bands.forEach((band, i) => {
                    if (typeof band.freq !== 'number') {
                        errors.push(['TypeError', `bands[${i}].freq must be a number`]);
                    }
                });
            }
        }

        // Handle collected errors
        if (errors.length > 0) {
            setError(errors);
            console.group('%cVisualizePlayer: Prop validation failed', 'color:red');
            errors.forEach(e => console.error(`${e[0]}: ${e[1]}`));
            console.groupEnd();
        } else {
            setError([]);
        }
    }, [audio, name, theme, vol, controls, mode, _bands]);

    // Updated bands array
    const bands = _bands || [
        { freq: 0 }, { freq: 10 }, { freq: 20 }, { freq: 25 }, { freq: 31.5 }, { freq: 40 }, { freq: 50 },
        { freq: 63 }, { freq: 80 }, { freq: 100 }, { freq: 125 }, { freq: 160 },
        { freq: 200 }, { freq: 250 }, { freq: 315 }, { freq: 400 }, { freq: 500 },
        { freq: 630 }, { freq: 800 }, { freq: 1000 }, { freq: 1250 }, { freq: 1600 },
        { freq: 2000 }, { freq: 2500 }, { freq: 3150 }, { freq: 4000 }, { freq: 5000 },
        { freq: 6300 }, { freq: 8000 }, { freq: 10000 }, { freq: 12500 }
    ];

    const bandPeaksRef = useRef<number[]>(bands.map(() => 0));
    const peakHoldsRef = useRef<number[]>(bands.map(() => 0));
    const peakHoldTimesRef = useRef<number[]>(bands.map(() => 0));
    const isPlayingRef = useRef<boolean>(false);
    const themeRef = useRef<ThemeKey>(typeof theme === 'string' ? theme : 'purple');

    let currentTheme: Theme = (typeof theme === 'string') ? (themes[theme] || themes.purple) : (typeof theme === 'object') ? theme : themes.purple;
    const isDark = mode === 'dark';
    const noControls = (typeof controls === 'object' && Object.keys(controls).length === 0);

    // Update theme ref when theme changes
    useEffect(() => {
        if (typeof theme === 'string') {
            themeRef.current = theme;
        } else {
            themeRef.current = 'purple';
        }
        updateVU();
    }, [theme]);

    // Initialize audio element
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const audioElement = audioRef.current;

        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setCurrentTime(audioElement.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        const handleEnded = () => {
            if (!isLoop) {
                setIsPlaying(false);
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.addEventListener('ended', handleEnded);
        audioElement.addEventListener('play', handlePlay);
        audioElement.addEventListener('pause', handlePause);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.removeEventListener('ended', handleEnded);
            audioElement.removeEventListener('play', handlePlay);
            audioElement.removeEventListener('pause', handlePause);
        };
    }, [isSeeking, isLoop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current.load();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(e => console.warn("AudioContext cleanup error:", e));
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Update audio source when it changes
    useEffect(() => {
        if (audio) {
            const wasPlaying = isPlaying;
            const currentVolume = volume;
            const currentLoop = isLoop;

            // Stop animation
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }

            // Properly disconnect and close audio context
            if (sourceRef.current) {
                try {
                    sourceRef.current.disconnect();
                } catch (e) {
                    console.warn("Source disconnect error:", e);
                }
                sourceRef.current = null;
            }

            if (analyserRef.current) {
                try {
                    analyserRef.current.disconnect();
                } catch (e) {
                    console.warn("Analyser disconnect error:", e);
                }
                analyserRef.current = null;
            }

            if (bassFilterRef.current) {
                try {
                    bassFilterRef.current.disconnect();
                } catch (e) {
                    console.warn("Bass filter disconnect error:", e);
                }
                bassFilterRef.current = null;
            }

            if (midFilterRef.current) {
                try {
                    midFilterRef.current.disconnect();
                } catch (e) {
                    console.warn("Mid filter disconnect error:", e);
                }
                midFilterRef.current = null;
            }

            if (trebleFilterRef.current) {
                try {
                    trebleFilterRef.current.disconnect();
                } catch (e) {
                    console.warn("Treble filter disconnect error:", e);
                }
                trebleFilterRef.current = null;
            }

            if (audioContextRef.current) {
                audioContextRef.current.close().catch(e => console.warn("AudioContext close error:", e));
                audioContextRef.current = null;
            }

            // Remove old event listeners
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current.load();
            }

            // Create a completely new audio element
            audioRef.current = new Audio();
            // allow analysis for cross-origin sources when CORS headers present
            try {
                audioRef.current.crossOrigin = 'anonymous';
            } catch (e) {
                console.debug('Could not set crossOrigin on audio element', e);
            }
            audioRef.current.src = audio;
            audioRef.current.preload = 'auto';
            audioRef.current.muted = false;
            audioRef.current.volume = isMuted ? 0 : currentVolume / 100;
            audioRef.current.loop = currentLoop;
            audioRef.current.load();

            // Re-attach event listeners
            const audioElement = audioRef.current;

            const handleTimeUpdate = () => {
                if (!isSeeking) {
                    setCurrentTime(audioElement.currentTime);
                }
            };

            const handleLoadedMetadata = () => {
                setDuration(audioElement.duration);
            };

            const handleEnded = () => {
                if (!isLoop) {
                    setIsPlaying(false);
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                }
            };

            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);

            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.addEventListener('ended', handleEnded);
            audioElement.addEventListener('play', handlePlay);
            audioElement.addEventListener('pause', handlePause);

            setCurrentTime(0);
            setIsPlaying(false);

            console.debug('Audio element created', { src: audioRef.current.src, volume: audioRef.current.volume, loop: audioRef.current.loop });

            // Reset visualization
            bandPeaksRef.current = bands.map(() => 0);
            peakHoldsRef.current = bands.map(() => 0);
            peakHoldTimesRef.current = bands.map(() => 0);
            updateVU();

            if (wasPlaying) {
                audioRef.current.play().catch(e => console.error("Play failed:", e));
            }
        }
    }, [audio]);

    // Update volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // Update loop
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = isLoop;
        }
    }, [isLoop]);

    // Update equalizer bands
    useEffect(() => {
        if (audioContextRef.current) {
            if (bassFilterRef.current) {
                bassFilterRef.current.gain.value = eqBands.bass;
            }
            if (midFilterRef.current) {
                midFilterRef.current.gain.value = eqBands.mid;
            }
            if (trebleFilterRef.current) {
                trebleFilterRef.current.gain.value = eqBands.treble;
            }
        }
    }, [eqBands]);

    // Start/stop visualization
    useEffect(() => {
        isPlayingRef.current = isPlaying;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        if (isPlaying) {
            if (!audioContextRef.current) {
                setupAudioContext();
            }
            analyze();
        } else {
            fadeOutVisualization();
        }
    }, [isPlaying]);

    const setupAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
            try {
                const AudioContextClass: any = (window as any).AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    const ctx = new AudioContextClass();
                    audioContextRef.current = ctx;

                    // Create filters
                    const bassFilter = ctx.createBiquadFilter();
                    bassFilter.type = 'lowshelf';
                    bassFilter.frequency.value = 320;
                    bassFilter.gain.value = eqBands.bass;

                    const midFilter = ctx.createBiquadFilter();
                    midFilter.type = 'peaking';
                    midFilter.frequency.value = 1000;
                    midFilter.Q.value = 0.5;
                    midFilter.gain.value = eqBands.mid;

                    const trebleFilter = ctx.createBiquadFilter();
                    trebleFilter.type = 'highshelf';
                    trebleFilter.frequency.value = 3200;
                    trebleFilter.gain.value = eqBands.treble;

                    // Create analyser
                    const analyser = ctx.createAnalyser();
                    analyser.fftSize = 8192;
                    analyser.smoothingTimeConstant = 0.7;

                    // Create source
                    const source = ctx.createMediaElementSource(audioRef.current);

                    // Connect nodes: source -> filters -> analyser -> destination
                    source.connect(bassFilter);
                    bassFilter.connect(midFilter);
                    midFilter.connect(trebleFilter);
                    trebleFilter.connect(analyser);
                    analyser.connect(ctx.destination);

                    // Assign to refs
                    bassFilterRef.current = bassFilter;
                    midFilterRef.current = midFilter;
                    trebleFilterRef.current = trebleFilter;
                    analyserRef.current = analyser;
                    sourceRef.current = source;
                }
            } catch (error) {
                console.error("Failed to setup audio context:", error);
            }
        }
    };

    const getFrequencyIndex = (frequency: number) => {
        const ctx = audioContextRef.current;
        const analyser = analyserRef.current;
        if (!ctx || !analyser) return 0;
        const nyquist = ctx.sampleRate / 2;
        const index = Math.round(frequency / nyquist * analyser.frequencyBinCount);
        return Math.min(index, analyser.frequencyBinCount - 1);
    };

    const fadeOutVisualization = () => {
        if (isPlayingRef.current) return;

        // Gradually reduce the wave heights
        bandPeaksRef.current = bandPeaksRef.current.map(peak => peak * 0.7);

        // Handle peak decay
        const now = Date.now();
        peakHoldsRef.current = peakHoldsRef.current.map((peak, index) => {
            if (now - peakHoldTimesRef.current[index] > 1500) {
                return peak * 0.95;
            }
            return peak;
        });

        updateVU();

        // Check if all peaks are near zero
        const maxPeak = Math.max(...bandPeaksRef.current);
        const maxHold = Math.max(...peakHoldsRef.current);
        if (maxPeak > 0.01 || maxHold > 0.01) {
            animationRef.current = requestAnimationFrame(fadeOutVisualization);
        } else {
            if (!isPlayingRef.current) {
                bandPeaksRef.current = bands.map(() => 0);
                peakHoldsRef.current = bands.map(() => 0);
                peakHoldTimesRef.current = bands.map(() => 0);
                updateVU();
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            animationRef.current = null;
        }
    };

    const analyze = () => {
        if (!analyserRef.current || !isPlayingRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        bands.forEach((band, index) => {
            const freqIndex = getFrequencyIndex(band.freq);
            const nextFreqIndex = index < bands.length - 1
                ? getFrequencyIndex(bands[index + 1].freq)
                : dataArray.length;

            let sum = 0;
            let count = 0;
            for (let i = freqIndex; i < nextFreqIndex; i++) {
                sum += dataArray[i];
                count++;
            }

            let avg = count > 0 ? sum / count / 255 : 0;
            avg = Math.pow(avg, 0.6);

            bandPeaksRef.current[index] = bandPeaksRef.current[index] * 0.8 + avg * 0.2;

            const now = Date.now();
            if (bandPeaksRef.current[index] > peakHoldsRef.current[index]) {
                peakHoldsRef.current[index] = bandPeaksRef.current[index];
                peakHoldTimesRef.current[index] = now;
            } else if (now - peakHoldTimesRef.current[index] > 1500) {
                peakHoldsRef.current[index] *= 0.95;
            }
        });

        updateVU();
        animationRef.current = requestAnimationFrame(analyze);
    };

    const updateVU = () => {
        if (!vuContainerRef.current) return;

        const currentTheme = themes[themeRef.current] || themes.rainbow;

        let html = '';
        bands.forEach((_, index) => {
            const height = bandPeaksRef.current[index] * 100;
            const peakPos = 100 - (peakHoldsRef.current[index] * 100);
            const colorIndex = Math.floor((index / bands.length) * currentTheme.bars.length);
            const barColor = currentTheme.bars[Math.min(colorIndex, currentTheme.bars.length - 1)];

            html += `
                <div class="flex-1 h-full relative flex flex-col justify-end">
                    <div class="rounded-t transition-all duration-75" style="height: ${height}%; background: ${barColor};">
                        ${peakHoldsRef.current[index] > 0.1 ? `<div class="absolute w-full h-0.5 transition-all duration-100" style="top: ${peakPos}%; background: ${currentTheme.peak};"></div>` : ''}
                    </div>
                </div>
            `;
        });

        vuContainerRef.current.innerHTML = html;
    };

    const togglePlay = () => {
        if (!audioRef.current || !audio) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            audioRef.current.play().catch(e => console.error("Play failed:", e));
        }
    };

    const stop = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);

        bandPeaksRef.current = bands.map(() => 0);
        peakHoldsRef.current = bands.map(() => 0);
        peakHoldTimesRef.current = bands.map(() => 0);
        updateVU();
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        const seekTime = (value / 100) * duration;
        setCurrentTime(seekTime);

        if (audioRef.current && !isSeeking) {
            audioRef.current.currentTime = seekTime;
        }
    };

    const handleSeekMouseDown = () => {
        setIsSeeking(true);
    };

    const handleSeekMouseUp = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
        }
        setIsSeeking(false);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlaybackRate(parseFloat(e.target.value));
    };

    const toggleLoop = () => {
        setIsLoop(!isLoop);
    };

    const handleEqChange = (band: 'bass' | 'mid' | 'treble', value: number) => {
        setEqBands(prev => ({
            ...prev,
            [band]: value
        }));
    };

    const resetEqualizer = () => {
        setEqBands({ bass: 0, mid: 0, treble: 0 });
    };

    useEffect(() => {
        if ((((typeof controls === 'object' && Object.keys(controls).length === 0) || !controls) && !isPlaying) || autoPlay) {
            togglePlay();
        }
    }, [controls]);

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (error && error.length > 0) {
        return (
            error.map((e, i) => (
                <div key={i} className="text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300">
                    <strong>{e[0]}:</strong> {e[1]}
                </div>
            ))
        );
    }

    return (
        <div ref={containerRef} className='w-full rounded-xl overflow-hidden' style={{ backgroundColor: !(noControls || transparent) ? (isDark ? '#6060606a' : '#ffffffab') : undefined }}>
            <div style={{ background: !(noControls || transparent) ? currentTheme.bg : undefined }} className={!(noControls || transparent) ? 'p-4' : ''}>
                {/* VU Meter */}
                <div className='relative'>
                    <div className={`${(transparent && showEqualizer) ? 'opacity-30' : ''} ${!(noControls || transparent) ? (isDark ? 'bg-black/40' : 'bg-white/70') : ''} rounded-lg ${!noControls ? "mb-6" : ""} ${!(noControls || transparent) ? "p-4" : ""} shadow-sm`}>
                        <div className="flex justify-center items-end gap-1 h-64" ref={vuContainerRef}></div>
                    </div>
                    {showEqualizer && (
                        <div className={`absolute inset-0 flex flex-col w-full justify-center z-10 ${!(noControls || transparent) && (isDark ? 'bg-black/50' : 'bg-white/80')} rounded-lg p-4 shadow-sm transition-all duration-300`}>
                            <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Equalizer</h3>

                            <div className="space-y-4">
                                {/* Bass Control */}
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Bass</span>
                                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.bass} dB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                        <input
                                            type="range"
                                            min="-20"
                                            max="20"
                                            value={eqBands.bass}
                                            onChange={(e) => handleEqChange('bass', parseInt(e.target.value))}
                                            className="flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                            style={{
                                                background: `linear-gradient(to right, ${currentTheme.slider} ${(eqBands.bass + 20) / 40 * 100}%, ${currentTheme.slider + '30'} ${(eqBands.bass + 20) / 40 * 100}%)`
                                            }}
                                        />
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                    </div>
                                </div>

                                {/* Mid Control */}
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Mid</span>
                                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.mid} dB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                        <input
                                            type="range"
                                            min="-20"
                                            max="20"
                                            value={eqBands.mid}
                                            onChange={(e) => handleEqChange('mid', parseInt(e.target.value))}
                                            className="flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                            style={{
                                                background: `linear-gradient(to right, ${currentTheme.slider} ${(eqBands.mid + 20) / 40 * 100}%, ${currentTheme.slider + '30'} ${(eqBands.mid + 20) / 40 * 100}%)`
                                            }}
                                        />
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                    </div>
                                </div>

                                {/* Treble Control */}
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Treble</span>
                                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.treble} dB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                        <input
                                            type="range"
                                            min="-20"
                                            max="20"
                                            value={eqBands.treble}
                                            onChange={(e) => handleEqChange('treble', parseInt(e.target.value))}
                                            className="flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                            style={{
                                                background: `linear-gradient(to right, ${currentTheme.slider} ${(eqBands.treble + 20) / 40 * 100}%, ${currentTheme.slider + '30'} ${(eqBands.treble + 20) / 40 * 100}%)`
                                            }}
                                        />
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={resetEqualizer}
                                    className={`px-3 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Track Name */}
                {controls.trackName && (
                    <div className="mb-6 flex items-center">
                        {thumbnail && (
                            <div className="mr-2">
                                <img src={thumbnail} alt="" className={`${isPlaying ? 'animation-spin' : ''} h-12 w-12 rounded-full`} />
                            </div>
                        )}
                        <div>
                            <div className={`${isDark ? 'text-gray-100' : 'text-gray-700'} font-medium truncate`}>{name}</div>
                            {author && typeof author === 'string' && (
                                <div className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs`}>{author}</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Seekbar */}
                {controls.seekbar && (
                    <div className="mb-6">
                        <div className="flex items-center md:gap-1">
                            <span className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-600'} font-mono w-12`}>{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                                onChange={handleSeekChange}
                                onMouseDown={handleSeekMouseDown}
                                onMouseUp={handleSeekMouseUp}
                                onTouchStart={handleSeekMouseDown}
                                onTouchEnd={handleSeekMouseUp}
                                disabled={!audio}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: audio && duration > 0
                                        ? `linear-gradient(to right, ${currentTheme.slider} ${(currentTime / duration) * 100}%, ${currentTheme.slider + '30'} ${(currentTime / duration) * 100}%)`
                                        : currentTheme.slider + '30'
                                }}
                            />
                            <span className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-600'} font-mono w-12 text-right`}>{formatTime(duration)}</span>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div className={`flex flex-wrap items-center ${containerWidth < 330 ? 'gap-2' : 'gap-3'}`}>
                    {controls.play && (
                        <button
                            onClick={togglePlay}
                            disabled={!audio}
                            className={`${containerWidth < 350 ? 'px-3 py-5' : 'px-4 py-2 md:w-24'} rounded-full text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:opacity-90`}
                            style={{ backgroundColor: currentTheme.button }}
                        >
                            <div className="relative w-4 flex items-center">
                                <Pause size={16} className={`${!isPlaying ? 'scale-0 translate-y-10' : ''} transition-all absolute`} />
                                <Play size={16} className={`${isPlaying ? 'scale-0 -translate-y-10' : ''} transition-all absolute`} />
                            </div>
                            <span style={{ display: containerWidth < 350 ? 'none' : 'block' }}>{isPlaying ? 'Pause' : 'Play'}</span>

                        </button>
                    )}

                    {controls.stop && (
                        <button
                            onClick={stop}
                            disabled={!audio}
                            className={`${isDark ? 'bg-gray-100 text-black' : 'bg-gray-700 text-white'} ${containerWidth < 600 ? 'px-3 py-3' : 'px-4 py-2'} rounded-full text-sm font-medium ${isDark ? 'hover:bg-gray-300' : 'hover:bg-gray-800'} disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`}
                        >
                            <Square size={16} />
                            <span style={{ display: containerWidth < 600 ? 'none' : 'block' }}>Stop</span>
                        </button>
                    )}

                    {controls.equalizer && (
                        <button
                            onClick={() => setShowEqualizer(!showEqualizer)}
                            disabled={!audio}
                            className={`${containerWidth < 600 ? 'px-3 py-3' : 'px-4 py-2'} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${showEqualizer
                                ? 'text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                            style={showEqualizer ? { backgroundColor: currentTheme.button } : {}}
                        >
                            <Sliders size={16} />
                            <span style={{ display: containerWidth < 600 ? 'none' : 'block' }}>EQ</span>
                        </button>
                    )}

                    {controls.loop && (
                        <button
                            onClick={toggleLoop}
                            disabled={!audio}
                            className={`${containerWidth < 700 ? 'px-3 py-3' : 'px-4 py-2'} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${isLoop
                                ? 'text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                            style={isLoop ? { backgroundColor: currentTheme.button } : {}}
                        >
                            <Repeat size={16} className={`${isLoop ? 'rotate-180' : ''} transition-all`} />
                            <span style={{ display: containerWidth < 700 ? 'none' : 'block' }}>Loop</span>
                        </button>
                    )}

                    {controls.speed && (
                        <div className="flex items-center">
                            <select
                                value={playbackRate}
                                onChange={handleSpeedChange}
                                className={`${containerWidth < 600 ? 'px-2 py-1' : 'px-3 py-2'} rounded-full text-sm font-medium border-none outline-none cursor-pointer transition-all ${isDark ? 'bg-gray-100 text-black hover:bg-gray-300' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                            >
                                <option value="0.5" className={isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}>0.5x</option>
                                <option value="0.75" className={isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}>0.75x</option>
                                <option value="1" className={isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}>1x</option>
                                <option value="1.25" className={isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}>1.25x</option>
                                <option value="1.5" className={isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}>1.5x</option>
                                <option value="2" className={isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}>2x</option>
                            </select>
                        </div>
                    )}

                    {controls.volume && (
                        <div className="flex items-center gap-1 md:gap-3 ml-auto">
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-full hover:bg-gray-100/50 transition-all"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX size={20} className={isDark ? 'text-gray-100' : 'text-gray-600'} />
                                ) : (
                                    <Volume2 size={20} className={isDark ? 'text-gray-100' : 'text-gray-600'} />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, ${currentTheme.slider} ${volume}%, ${currentTheme.slider + '30'} ${volume}%)`,
                                    display: containerWidth < 460 ? 'none' : 'block'
                                }}
                            />
                            <span style={{ display: containerWidth < 800 ? 'none' : 'block' }} className={`hidden sm:block text-xs ${isDark ? 'text-gray-100' : 'text-gray-700'} font-mono w-10 text-right`}>{volume}%</span>
                        </div>
                    )}
                </div>

                <style>{`
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${currentTheme.slider};
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                
                input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${currentTheme.slider};
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                input[type="range"].eq-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
                input[type="range"].eq-slider::-moz-range-thumb {
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
                .hide-for-xs {
                    display: flex;
                }
                @media (max-width: 480px) {
                    .hide-for-xs {
                        display: none;
                    }
                }
                .animation-spin {
                    animation: spin 15s infinite linear;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg)
                    }
                }
            `}</style>
            </div>
        </div>
    );
}

function WaveAudioPlayer({
    audio: audioUrl,
    gradient = ['#cd7eff', '#ff00f2'],
    background = '#f4e4ffff',
    autoPlay = false,
    thumbnail = null,
    width,
    equalizer = {
        bass: 0,
        mid: 0,
        treble: 0
    },
    mode = 'light' as 'light' | 'dark',
}: WaveAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(80);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [waveformData, setWaveformData] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [eqBands, setEqBands] = useState({
        bass: equalizer.bass || 0,
        mid: equalizer.mid || 0,
        treble: equalizer.treble || 0
    })
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const bassFilterRef = useRef<BiquadFilterNode | null>(null);
    const midFilterRef = useRef<BiquadFilterNode | null>(null);
    const trebleFilterRef = useRef<BiquadFilterNode | null>(null);
    // mode comes from props and is typed

    // Generate random waveform data for visualization
    const generateWaveformData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            // Create more realistic waveform with some randomness
            const height = 20 + Math.random() * 60;
            data.push(height);
        }
        return data;
    };

    useEffect(() => {
        // Validate props
        if (!audioUrl) {
            //setError("No audio URL provided");
            return;
        }

        if (!Array.isArray(gradient) || gradient.length < 2) {
            setError("Gradient must be an array with at least 2 colors");
            return;
        }

        // mode is always 'light' | 'dark' by type

        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            // Generate waveform when audio is loaded
            setWaveformData(generateWaveformData());
        };
        const handleEnded = () => setIsPlaying(false);
        const handleError = (e: any) => {
            setError(`Audio error: ${e.target?.error?.message || 'Failed to load audio'}`);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [audioUrl, gradient, mode]);

    useEffect(() => {
        if (audioUrl && audioRef.current && autoPlay) {
            audioRef.current.play().catch((e: any) => {
                console.error("Play failed:", e);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    }, [audioUrl]);

    useEffect(() => {
        if (!audioRef.current) return;

        // Only create AudioContext if not already created
        if (!audioCtxRef.current && audioRef.current) {
            const AudioCtxClass: any = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioCtxClass) {
                const ctx = new AudioCtxClass();
                audioCtxRef.current = ctx;

                const source = ctx.createMediaElementSource(audioRef.current);
                sourceRef.current = source;

                // Filters
                const bassFilter = ctx.createBiquadFilter();
                bassFilter.type = "lowshelf";
                bassFilter.frequency.value = 200;
                bassFilterRef.current = bassFilter;

                const midFilter = ctx.createBiquadFilter();
                midFilter.type = "peaking";
                midFilter.frequency.value = 1000;
                midFilter.Q.value = 1;
                midFilterRef.current = midFilter;

                const trebleFilter = ctx.createBiquadFilter();
                trebleFilter.type = "highshelf";
                trebleFilter.frequency.value = 3000;
                trebleFilterRef.current = trebleFilter;

                // Connect
                source
                    .connect(bassFilter)
                    .connect(midFilter)
                    .connect(trebleFilter)
                    .connect(ctx.destination);
            }
        }
    }, [audioUrl]);

    // Update volume when changed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // Update playback rate when changed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => {
                    setError(`Playback failed: ${e instanceof Error ? e.message : String(e)}`);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value));
        if (isMuted && parseInt(e.target.value) > 0) {
            setIsMuted(false);
        }
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlaybackRate(parseFloat(e.target.value));
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * duration;

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleEqChange = (band: 'bass' | 'mid' | 'treble', value: number) => {
        setEqBands(prev => ({ ...prev, [band]: value }));

        if (band === "bass" && bassFilterRef.current)
            bassFilterRef.current.gain.value = value;

        if (band === "mid" && midFilterRef.current)
            midFilterRef.current.gain.value = value;

        if (band === "treble" && trebleFilterRef.current)
            trebleFilterRef.current.gain.value = value;
    };

    const resetEqualizer = () => {
        handleEqChange("bass", 0)
        handleEqChange("mid", 0)
        handleEqChange("treble", 0)
    }

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (error) {
        return (
            <div className="w-lg p-6 rounded-xl" style={{ background }}>
                <div className={`text-center ${mode === 'dark' ? 'text-red-300' : 'text-red-600'}`}>
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (!audioUrl) return null;

    // Determine text color based on mode
    const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const secondaryTextColor = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className="w-full max-w-lg relative" style={{ width: width + 'px' }}>
            <audio ref={audioRef} src={audioUrl} />

            <div className="rounded-2xl shadow-2xl">
                <div className="rounded-2xl p-6 backdrop-blur-xl" style={{ background }}>

                    {thumbnail && (
                        <div className="w-full p-4">
                            <img src={thumbnail} alt="" className={`w-full aspect-square rounded-xl`} />
                        </div>
                    )}

                    {/* Waveform Seek Bar */}
                    <div
                        className="relative h-20 mb-6 cursor-pointer"
                        onClick={handleSeek}
                    >
                        {/* Waveform container */}
                        <div className="absolute inset-0 flex items-end justify-center h-full w-full gap-px">
                            {waveformData.map((height, index) => {
                                // Calculate if this bar should be filled based on progress
                                const barProgress = (index / waveformData.length) * 100;
                                const isFilled = barProgress <= progress;

                                return (
                                    <div
                                        key={index}
                                        className="w-1 rounded-t transition-all duration-150"
                                        style={{
                                            height: `${height}%`,
                                            background: isFilled ? gradient[0] : gradient[1],
                                            opacity: isFilled ? 1 : 0.4
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Progress indicator */}
                        <div
                            className="absolute top-0 h-full w-1 bg-white border-r border-black rounded-full transition-all duration-150"
                            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                        />
                    </div>

                    {/* Time Display */}
                    <div className={`flex justify-between text-sm ${secondaryTextColor} mb-6`}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-3 items-center justify-between mb-4">
                        {/* Volume Control */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-full transition-all"
                                style={{
                                    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
                                }}
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="w-4 h-4 text-white" />
                                ) : (
                                    <Volume2 className="w-4 h-4 text-white" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className={`${!width ? 'hidden sm:block' : ''} w-20 h-1.5 rounded-lg appearance-none cursor-pointer`}
                                style={{
                                    background: `linear-gradient(to right, ${gradient[0]} ${volume}%, ${mode === 'dark' ? '#374151' : '#d1d5db'} ${volume}%)`,
                                    display: (width && width < 400) ? 'none' : undefined
                                }}
                            />

                            {/* Equalizer Button */}
                            {(width && width < 400) && (
                                <div className="flex items-center justify-end">
                                    <button
                                        onClick={() => setShowEqualizer(!showEqualizer)}
                                        className="p-2 rounded-full transition-all"
                                        style={{
                                            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
                                        }}
                                    >
                                        <Sliders className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Play/Pause Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={togglePlay}
                                className="p-4 rounded-full transition-all hover:scale-105 shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
                                }}
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 text-white fill-white" />
                                ) : (
                                    <Play className="w-6 h-6 text-white fill-white" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Speed Control */}
                            <div className="flex items-center justify-end">
                                <select
                                    value={playbackRate}
                                    style={{ background, color: gradient[0] }}
                                    onChange={handleSpeedChange}
                                    className={`py-1 px-2 rounded-lg text-sm ${textColor} ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                                >
                                    <option value="0.5">0.5x</option>
                                    <option value="0.75">0.75x</option>
                                    <option value="1">1x</option>
                                    <option value="1.25">1.25x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2x</option>
                                </select>
                            </div>

                            {/* Equalizer Button */}
                            {!(width && width < 400) && (
                                <div className="flex items-center justify-end">
                                    <button
                                        onClick={() => setShowEqualizer(!showEqualizer)}
                                        className="p-2 rounded-full transition-all"
                                        style={{
                                            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
                                        }}
                                    >
                                        <Sliders className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Equalizer Overlay */}
            {showEqualizer && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10 rounded-2xl p-4">
                    <div className={`max-w-xs w-full p-4 pt-2 rounded-xl ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-2 ${mode === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Equalizer</h3>

                        <div className="space-y-4">
                            {/* Bass Control */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Bass</span>
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.bass} dB</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                    <input
                                        type="range"
                                        min="-20"
                                        max="20"
                                        value={eqBands.bass}
                                        onChange={(e) => handleEqChange('bass', parseInt(e.target.value))}
                                        className="flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                        style={{
                                            background: `linear-gradient(to right, ${gradient[0]} ${(eqBands.bass + 20) / 40 * 100}%, ${gradient[1] + '30'} ${(eqBands.bass + 20) / 40 * 100}%)`
                                        }}
                                    />
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                </div>
                            </div>

                            {/* Mid Control */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Mid</span>
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.mid} dB</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                    <input
                                        type="range"
                                        min="-20"
                                        max="20"
                                        value={eqBands.mid}
                                        onChange={(e) => handleEqChange('mid', parseInt(e.target.value))}
                                        className="flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                        style={{
                                            background: `linear-gradient(to right, ${gradient[0]} ${(eqBands.mid + 20) / 40 * 100}%, ${gradient[1] + '30'} ${(eqBands.mid + 20) / 40 * 100}%)`
                                        }}
                                    />
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                </div>
                            </div>

                            {/* Treble Control */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Treble</span>
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.treble} dB</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                    <input
                                        type="range"
                                        min="-20"
                                        max="20"
                                        value={eqBands.treble}
                                        onChange={(e) => handleEqChange('treble', parseInt(e.target.value))}
                                        className="flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                        style={{
                                            background: `linear-gradient(to right, ${gradient[0]} ${(eqBands.treble + 20) / 40 * 100}%, ${gradient[1] + '30'} ${(eqBands.treble + 20) / 40 * 100}%)`
                                        }}
                                    />
                                    <span className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={resetEqualizer}
                                className={`px-3 py-1 rounded text-xs ${mode === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowEqualizer(false)}
                                className={`px-3 py-1 rounded text-xs ${mode === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                input[type="range"].eq-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
                input[type="range"].eq-slider::-moz-range-thumb {
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
            `}</style>
        </div>
    );
}

function NanoAudioPlayer({ audio: audioUrl, thumbnail, gradient: colors = ['#cd7eff', '#fe59f6'], background = '#1f273a', autoPlay = false }: NanoAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [animationTime, setAnimationTime] = useState<number>(0);
    const [audioDuration, setAudioDuration] = useState<number>(0); // total duration of audio
    const [playedDuration, setPlayedDuration] = useState<number>(0); // duration of audio that has been played

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    useEffect(() => {
        const loop = setInterval(() => {
            if (isPlaying) setAnimationTime(prev => prev + 0.1);
        }, 100);
        return () => clearInterval(loop);
    }, [isPlaying]);

    useEffect(() => {
        const loop = setInterval(() => {
            if (isPlaying) setPlayedDuration(prev => prev + 0.1);
        }, 100);
        return () => clearInterval(loop);
    }, [isPlaying]);

    useEffect(() => {
        if (audioUrl && audioRef.current && autoPlay) {
            audioRef.current.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
        }
    }, [audioUrl]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setAudioDuration(audio.duration);
            console.log("Audio duration:", audio.duration);
        };

        setPlayedDuration(0);

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [audioUrl]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e: any) => console.error("NanoPlayer play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (!audioUrl) return null;

    // gradient CSS for button
    const buttonGradient = {
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
    }

    return (
        <div
            style={{ backgroundColor: background }}
            className={`
                relative overflow-hidden inline-flex flex-col 
                ${thumbnail ? 'rounded-2xl' : 'rounded-full'} 
                px-3 py-2 shadow-lg
                ${thumbnail ? 'w-[120px] h-[150px]' : 'w-[110px] h-[40px]'}
            `}
        >
            <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => {
                    setIsPlaying(false)
                    setPlayedDuration(0)
                }}
            />

            <div
                style={{
                    width: `${(audioDuration > 0 ? playedDuration / audioDuration : 0) * 100}%`,
                    backgroundImage: buttonGradient.background
                }}
                className="absolute top-0 left-0 h-full opacity-20"
            />

            <div className="absolute flex flex-col">
                {thumbnail && (
                    <div className="w-24 pb-2">
                        <img src={thumbnail} alt="" className={`w-24 aspect-square rounded-xl`} />
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        style={buttonGradient}
                        className="p-1.5 rounded-full hover:scale-110 transition-transform flex-shrink-0"
                    >
                        {isPlaying ? (
                            <Pause fill={background} className="w-3 h-3 text-transparent" />
                        ) : (
                            <Play fill={background} className="w-3 h-3 text-transparent" />
                        )}
                    </button>

                    {/* Mini Waveform */}
                    <div className="flex w-full min-w-12 items-center gap-0.5 h-6">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-200`}
                                style={{
                                    width: '100%',
                                    background: `linear-gradient(to top, ${colors[0]}, ${colors[1]})`,
                                    height: isPlaying
                                        ? `${8 + Math.sin((animationTime * 8 + i) * 0.6) * 10}px`
                                        : "8px",
                                    opacity: isPlaying ? 0.8 : 0.4
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Video

function VideoPlayer({
    video,
    name = 'No video loaded',
    audioVisual = null,
    volume: vol = 100,
    thumbnail = null,
    controls = {
        play: true,
        pause: true,
        stop: true,
        seekbar: true,
        volume: true,
        fullscreen: true,
        videoName: true,
        equalizer: true,
        speed: true
    },
    mode = 'light' as 'light' | 'dark',
    transparent = false,
    autoPlay = false,
    color = '#3b82f6',
    equalizer = {
        bass: 0,
        mid: 0,
        treble: 0
    }
}: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(vol || 100);
    const [isMuted, setIsMuted] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [error, setError] = useState<string[][]>([]);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [eqBands, setEqBands] = useState({
        bass: equalizer.bass || 0,
        mid: equalizer.mid || 0,
        treble: equalizer.treble || 0
    });
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [containerWidth, setContainerWidth] = useState(0);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const bassFilterRef = useRef<BiquadFilterNode | null>(null);
    const midFilterRef = useRef<BiquadFilterNode | null>(null);
    const trebleFilterRef = useRef<BiquadFilterNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const vuContainerRef = useRef<HTMLDivElement | null>(null);

    // Audio visualization data for L and R channels
    const leftPeakRef = useRef<number>(0);
    const rightPeakRef = useRef<number>(0);
    const leftHoldRef = useRef<number>(0);
    const rightHoldRef = useRef<number>(0);
    const leftHoldTimeRef = useRef<number>(0);
    const rightHoldTimeRef = useRef<number>(0);
    const isPlayingRef = useRef<boolean>(false);
    const isDark = mode === 'dark' || isFullscreen;
    const noControls = (typeof controls === 'object' && Object.keys(controls).length === 0);

    // Track container width for responsive UI
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    // Prop validation
    useEffect(() => {
        const errors = [];

        if (video && typeof video !== 'string') {
            errors.push(['TypeError', 'video must be a string (URL or path)']);
        }

        if (name && typeof name !== 'string') {
            errors.push(['TypeError', 'name must be a string']);
        }

        if (typeof vol !== 'number' || vol < 0 || vol > 100) {
            errors.push(['TypeError', 'volume must be a number between 0 and 100']);
        }

        if (audioVisual && typeof audioVisual !== 'object') {
            errors.push(['TypeError', 'audioVisual must be an object']);
        } else if (audioVisual) {
            if (!['left', 'right', 'top', 'bottom'].includes(audioVisual.side)) {
                errors.push(['ValueError', "audioVisual.side must be 'left', 'right', 'top', or 'bottom'"]);
            }
        }

        if (errors.length > 0) {
            setError(errors);
            console.group('%cVideoPlayer: Prop validation failed', 'color:red');
            errors.forEach(e => console.error(`${e[0]}: ${e[1]}`));
            console.groupEnd();
        } else {
            setError([]);
        }
    }, [video, name, vol, audioVisual, controls, mode]);

    // Initialize video element
    useEffect(() => {
        if (!videoRef.current) return;

        const videoElement = videoRef.current;

        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setCurrentTime(videoElement.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(videoElement.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.addEventListener('ended', handleEnded);
        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            videoElement.removeEventListener('ended', handleEnded);
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
        };
    }, [isSeeking]);

    // Update video source when it changes
    useEffect(() => {
        if (video) {
            const wasPlaying = isPlaying;
            const currentVolume = volume;

            // Pause video
            if (videoRef.current) {
                videoRef.current.pause();
            }

            // Update video source
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = video;
                videoRef.current.volume = isMuted ? 0 : currentVolume / 100;

                // Add event listener for when video is ready to play
                const handleCanPlay = () => {
                    if (wasPlaying && videoRef.current) {
                        videoRef.current.play().catch((e: any) => console.error("Play failed:", e));
                    }
                    if (videoRef.current) {
                        videoRef.current.removeEventListener('canplay', handleCanPlay);
                    }
                };

                videoRef.current.addEventListener('canplay', handleCanPlay);
                videoRef.current.load(); // Load after adding event listener
            }

            setCurrentTime(0);
            setIsPlaying(false);

            // Reset visualization
            leftPeakRef.current = 0;
            rightPeakRef.current = 0;
            leftHoldRef.current = 0;
            rightHoldRef.current = 0;
            leftHoldTimeRef.current = 0;
            rightHoldTimeRef.current = 0;
            updateVU();
        }
    }, [video]);

    // Update volume
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // Update playback rate
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    // Update equalizer bands
    useEffect(() => {
        if (audioContextRef.current) {
            if (bassFilterRef.current) {
                bassFilterRef.current.gain.value = eqBands.bass;
            }
            if (midFilterRef.current) {
                midFilterRef.current.gain.value = eqBands.mid;
            }
            if (trebleFilterRef.current) {
                trebleFilterRef.current.gain.value = eqBands.treble;
            }
        }
    }, [eqBands]);

    // Start/stop visualization
    useEffect(() => {
        isPlayingRef.current = isPlaying;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        if (isPlaying && audioVisual) {
            if (!audioContextRef.current) {
                setupAudioContext();
            }
            analyze();
        } else if (!isPlaying && audioVisual) {
            fadeOutVisualization();
        }
    }, [isPlaying, audioVisual]);

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Cleanup AudioContext on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(e => console.warn("AudioContext cleanup error:", e));
            }
        };
    }, []);

    const setupAudioContext = () => {
        if (!audioContextRef.current && videoRef.current) {
            try {
                const AudioContextClass: any = (window as any).AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    const ctx = new AudioContextClass();
                    audioContextRef.current = ctx;

                    // Create filters
                    const bassFilter = ctx.createBiquadFilter();
                    bassFilter.type = 'lowshelf';
                    bassFilter.frequency.value = 320;
                    bassFilter.gain.value = eqBands.bass;

                    const midFilter = ctx.createBiquadFilter();
                    midFilter.type = 'peaking';
                    midFilter.frequency.value = 1000;
                    midFilter.Q.value = 0.5;
                    midFilter.gain.value = eqBands.mid;

                    const trebleFilter = ctx.createBiquadFilter();
                    trebleFilter.type = 'highshelf';
                    trebleFilter.frequency.value = 3200;
                    trebleFilter.gain.value = eqBands.treble;

                    // Create analyser for visualization
                    const analyser = ctx.createAnalyser();
                    analyser.fftSize = 2048;
                    analyser.smoothingTimeConstant = 0.8;

                    // Create source
                    const source = ctx.createMediaElementSource(videoRef.current);

                    // Connect the filters in series and then to the destination
                    source.connect(bassFilter);
                    bassFilter.connect(midFilter);
                    midFilter.connect(trebleFilter);

                    // Connect the last filter to both the analyser (for visualization) and the destination
                    trebleFilter.connect(analyser);
                    trebleFilter.connect(ctx.destination);

                    // Assign to refs
                    bassFilterRef.current = bassFilter;
                    midFilterRef.current = midFilter;
                    trebleFilterRef.current = trebleFilter;
                    analyserRef.current = analyser;
                    sourceRef.current = source;
                }
            } catch (error) {
                console.error("Failed to setup audio context:", error);
            }
        }
    };
    const fadeOutVisualization = () => {
        if (isPlayingRef.current) return;

        leftPeakRef.current *= 0.7;
        rightPeakRef.current *= 0.7;

        const now = Date.now();
        if (now - leftHoldTimeRef.current > 1500) {
            leftHoldRef.current *= 0.95;
        }
        if (now - rightHoldTimeRef.current > 1500) {
            rightHoldRef.current *= 0.95;
        }

        updateVU();

        const maxPeak = Math.max(leftPeakRef.current, rightPeakRef.current);
        const maxHold = Math.max(leftHoldRef.current, rightHoldRef.current);
        if (maxPeak > 0.01 || maxHold > 0.01) {
            animationRef.current = requestAnimationFrame(fadeOutVisualization);
        } else {
            if (!isPlayingRef.current) {
                leftPeakRef.current = 0;
                rightPeakRef.current = 0;
                leftHoldRef.current = 0;
                rightHoldRef.current = 0;
                updateVU();
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            animationRef.current = null;
        }
    };

    const analyze = () => {
        if (!analyserRef.current || !isPlayingRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average levels for the entire frequency range
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }

        let avg = sum / bufferLength / 255;
        avg = Math.pow(avg, 0.5);

        // Update both left and right peaks with the same value (mono)
        leftPeakRef.current = leftPeakRef.current * 0.7 + avg * 0.3;
        rightPeakRef.current = rightPeakRef.current * 0.7 + avg * 0.3;

        const now = Date.now();
        if (leftPeakRef.current > leftHoldRef.current) {
            leftHoldRef.current = leftPeakRef.current;
            leftHoldTimeRef.current = now;
        } else if (now - leftHoldTimeRef.current > 1500) {
            leftHoldRef.current *= 0.95;
        }

        if (rightPeakRef.current > rightHoldRef.current) {
            rightHoldRef.current = rightPeakRef.current;
            rightHoldTimeRef.current = now;
        } else if (now - rightHoldTimeRef.current > 1500) {
            rightHoldRef.current *= 0.95;
        }

        updateVU();
        animationRef.current = requestAnimationFrame(analyze);
    };

    const updateVU = () => {
        if (!vuContainerRef.current || !audioVisual) return;

        const color = audioVisual.color || '#00ff00';
        const peakColor = audioVisual.peak || '#ff0000';

        const leftHeight = leftPeakRef.current * 100;
        const rightHeight = rightPeakRef.current * 100;
        const leftPeakPos = 100 - (leftHoldRef.current * 100);
        const rightPeakPos = 100 - (rightHoldRef.current * 100);

        const isHorizontal = audioVisual.side === 'top' || audioVisual.side === 'bottom';

        if (isHorizontal) {
            vuContainerRef.current.innerHTML = `
                <div class="flex flex-col gap-1 h-full justify-center">
                    <div class="flex items-center justify-center gap-2">
                        <div class="text-xs ${isDark ? 'text-gray-100' : 'text-gray-900'} opacity-80 w-4 text-center">L</div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-end">
                            <div class="h-full rounded-l-full transition-all duration-75" style="width: ${leftHeight}%; background: ${color};"></div>
                            ${leftHoldRef.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="right: ${leftHoldRef.current * 100}%; background: ${peakColor};"></div>` : ''}
                        </div>
                        <div class="w-px h-4 bg-white/20"></div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-start">
                            <div class="h-full rounded-r-full transition-all duration-75" style="width: ${rightHeight}%; background: ${color};"></div>
                            ${rightHoldRef.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="left: ${rightHoldRef.current * 100}%; background: ${peakColor};"></div>` : ''}
                        </div>
                        <div class="text-xs ${isDark ? 'text-gray-100' : 'text-gray-900'} opacity-80 w-4 text-center">R</div>
                    </div>
                </div>
            `;
        } else {
            vuContainerRef.current.innerHTML = `
                <div class="flex gap-2 h-full">
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">L</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${leftHeight}%; background: ${color};">
                                ${leftHoldRef.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${leftPeakPos}%; background: ${peakColor};"></div>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">R</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${rightHeight}%; background: ${color};">
                                ${rightHoldRef.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${rightPeakPos}%; background: ${peakColor};"></div>` : ''
                }
                        </div>
                    </div>
                </div>
            `;
        }
    };

    const togglePlay = () => {
        if (!videoRef.current || !video) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            videoRef.current.play().catch((e: any) => console.error("Play failed:", e));
        }
    };

    const stop = () => {
        if (!videoRef.current) return;

        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);

        leftPeakRef.current = 0;
        rightPeakRef.current = 0;
        leftHoldRef.current = 0;
        rightHoldRef.current = 0;
        updateVU();
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        const seekTime = (value / 100) * duration;
        setCurrentTime(seekTime);

        if (videoRef.current && !isSeeking) {
            videoRef.current.currentTime = seekTime;
        }
    };

    const handleSeekMouseDown = () => setIsSeeking(true);
    const handleSeekMouseUp = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
        }
        setIsSeeking(false);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlaybackRate(parseFloat(e.target.value));
    };

    const toggleMute = () => setIsMuted(!isMuted);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(e => console.error("Fullscreen failed:", e));
        } else {
            document.exitFullscreen();
        }
    };

    const handleEqChange = (band: 'bass' | 'mid' | 'treble', value: number) => {
        setEqBands(prev => ({
            ...prev,
            [band]: value
        }));

        // Apply the change immediately if the audio context is already set up
        if (audioContextRef.current) {
            if (band === "bass" && bassFilterRef.current) {
                bassFilterRef.current.gain.value = value;
            }
            if (band === "mid" && midFilterRef.current) {
                midFilterRef.current.gain.value = value;
            }
            if (band === "treble" && trebleFilterRef.current) {
                trebleFilterRef.current.gain.value = value;
            }
        }
    };

    const resetEqualizer = () => {
        setEqBands({ bass: 0, mid: 0, treble: 0 });
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (noControls && !isPlaying || autoPlay) {
            togglePlay();
        }
    }, [controls]);

    if (error && error.length > 0) {
        return error.map((e, i) => (
            <div key={i} className="text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300">
                <strong>{e[0]}:</strong> {e[1]}
            </div>
        ));
    }

    const vuPosition = audioVisual ? audioVisual.side : null;
    const isHorizontalVU = vuPosition === 'top' || vuPosition === 'bottom';

    return (
        <div
            ref={containerRef}
            className={`rounded-xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[9999] flex flex-col h-screen w-screen bg-black' : 'relative'}`}
            style={{ backgroundColor: !(noControls || transparent) ? (isDark ? '#49494937' : 'white') : undefined }}
        >
            <div style={{ background: !(noControls || transparent) ? (isDark ? '#1a1a1ab0' : '#f5f5f5') : undefined, height: isFullscreen ? '100%' : 'auto' }} className={`${!(noControls || transparent) ? 'p-4' : ''} ${isFullscreen ? 'flex flex-col flex-1' : ''}`}>
                {/* Video Name */}
                {controls.videoName && !isFullscreen && (
                    <div className="mb-4">
                        <div className={`${isDark ? 'text-gray-100' : 'text-gray-700'} font-medium`}>{name}</div>
                    </div>
                )}

                {/* Video Container with VU Meters */}
                <div className={`relative ${isHorizontalVU ? 'flex flex-col gap-3' : 'flex gap-3'} ${isFullscreen ? 'flex-1 min-h-0' : 'mb-4'}`}>
                    {/* VU Meter - Top */}
                    {audioVisual && vuPosition === 'top' && (
                        <div className="w-full h-12" ref={vuContainerRef}></div>
                    )}

                    <div className={`flex ${!isHorizontalVU && 'flex-1'} gap-3`}>
                        {/* VU Meter - Left */}
                        {audioVisual && vuPosition === 'left' && (
                            <div className="w-12 bg-black/50 rounded-lg p-1" ref={vuContainerRef}></div>
                        )}

                        {/* Video Element */}
                        <div className={`flex-1 ${isDark ? 'bg-black/70' : 'bg-white/70'} rounded-lg overflow-hidden relative`}>
                            <video
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                poster={thumbnail || undefined}
                            >
                                {video && <source src={video} />}
                                Your browser does not support the video tag.
                            </video>

                            {/* Equalizer Overlay */}
                            {showEqualizer && (
                                <div className={`absolute inset-0 flex flex-col w-full justify-center z-10 rounded-lg p-4 shadow-sm transition-all duration-300`}>
                                    <div className={`max-w-[600px] w-full mx-auto flex flex-col justify-center z-10 ${isDark ? 'bg-black/70' : 'bg-white/80'} rounded-lg p-4 shadow-sm transition-all duration-300`}>
                                        <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Equalizer</h3>

                                        <div className="space-y-4">
                                            {/* Bass Control */}
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Bass</span>
                                                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.bass} dB</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                                    <input
                                                        type="range"
                                                        min="-20"
                                                        max="20"
                                                        value={eqBands.bass}
                                                        onChange={(e) => handleEqChange('bass', parseInt(e.target.value))}
                                                        className="flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                                        style={{
                                                            background: `linear-gradient(to right, ${color} ${(eqBands.bass + 20) / 40 * 100}%, #e5e7eb ${(eqBands.bass + 20) / 40 * 100}%)`
                                                        }}
                                                    />
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                                </div>
                                            </div>

                                            {/* Mid Control */}
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Mid</span>
                                                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.mid} dB</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                                    <input
                                                        type="range"
                                                        min="-20"
                                                        max="20"
                                                        value={eqBands.mid}
                                                        onChange={(e) => handleEqChange('mid', parseInt(e.target.value))}
                                                        className="flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                                        style={{
                                                            background: `linear-gradient(to right, ${color} ${(eqBands.mid + 20) / 40 * 100}%, #e5e7eb ${(eqBands.mid + 20) / 40 * 100}%)`
                                                        }}
                                                    />
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                                </div>
                                            </div>

                                            {/* Treble Control */}
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Treble</span>
                                                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eqBands.treble} dB</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-20</span>
                                                    <input
                                                        type="range"
                                                        min="-20"
                                                        max="20"
                                                        value={eqBands.treble}
                                                        onChange={(e) => handleEqChange('treble', parseInt(e.target.value))}
                                                        className="flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider"
                                                        style={{
                                                            background: `linear-gradient(to right, ${color} ${(eqBands.treble + 20) / 40 * 100}%, #e5e7eb ${(eqBands.treble + 20) / 40 * 100}%)`
                                                        }}
                                                    />
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+20</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button
                                                onClick={resetEqualizer}
                                                className={`px-3 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={() => setShowEqualizer(false)}
                                                className={`ml-2 px-3 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* VU Meter - Right */}
                        {audioVisual && vuPosition === 'right' && (
                            <div className="w-12 bg-black/50 rounded-lg p-1" ref={vuContainerRef}></div>
                        )}
                    </div>

                    {/* VU Meter - Bottom */}
                    {audioVisual && vuPosition === 'bottom' && (
                        <div className="w-full h-12" ref={vuContainerRef}></div>
                    )}
                </div>

                {/* Seekbar */}
                {controls.seekbar && (
                    <div className={`mb-4 ${isFullscreen ? 'mt-3' : ''}`}>
                        <div className="flex items-center gap-3">
                            <span className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-600'} font-mono w-12`}>{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                                onChange={handleSeekChange}
                                onMouseDown={handleSeekMouseDown}
                                onMouseUp={handleSeekMouseUp}
                                onTouchStart={handleSeekMouseDown}
                                onTouchEnd={handleSeekMouseUp}
                                disabled={!video}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: video && duration > 0
                                        ? `linear-gradient(to right, ${color} ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`
                                        : '#e5e7eb'
                                }}
                            />
                            <span className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-600'} font-mono w-12 text-right`}>{formatTime(duration)}</span>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    {controls.play && (
                        <button
                            onClick={togglePlay}
                            disabled={!video}
                            style={{ backgroundColor: color }}
                            className={`${!(containerWidth > 400) ? 'px-3 py-5' : ' px-4 py-2'} rounded-full text-sm font-medium text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`}
                        >
                            <div className="relative w-4 flex items-center">
                                <Pause size={16} className={`${!isPlaying ? 'scale-0 translate-y-10' : ''} transition-all absolute`} />
                                <Play size={16} className={`${isPlaying ? 'scale-0 -translate-y-10' : ''} transition-all absolute`} />
                            </div>
                            {containerWidth > 400 && (isPlaying ? 'Pause' : 'Play')}
                        </button>
                    )}

                    {controls.stop && (
                        <button
                            onClick={stop}
                            disabled={!video}
                            className={`${isDark ? 'bg-gray-100 text-black hover:bg-gray-300' : 'bg-gray-700 text-white hover:bg-gray-800'} px-3 py-3 rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`}
                        >
                            <Square size={16} />
                        </button>
                    )}

                    {controls.fullscreen && (
                        <button
                            onClick={toggleFullscreen}
                            className={`${containerWidth < 800 ? 'px-3 py-3' : 'px-4 py-2'} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${isDark ? 'bg-gray-100 text-black hover:bg-gray-300' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                        >
                            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                            <span style={{ display: containerWidth < 800 ? 'none' : 'block' }}>{isFullscreen ? 'Exit' : 'Full'}</span>
                        </button>
                    )}

                    {controls.equalizer && (
                        <button
                            onClick={() => setShowEqualizer(!showEqualizer)}
                            disabled={!video}
                            className={`${containerWidth < 700 ? 'px-3 py-3' : 'px-4 py-2'} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${showEqualizer
                                ? 'text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                            style={showEqualizer ? { backgroundColor: color } : {}}
                        >
                            <Sliders size={16} />
                            <span style={{ display: containerWidth < 700 ? 'none' : 'block' }}>EQ</span>
                        </button>
                    )}

                    {controls.speed && (
                        <div className="flex items-center">
                            <select
                                value={playbackRate}
                                onChange={handleSpeedChange}
                                className={`${containerWidth < 600 ? 'px-2 py-1' : 'px-3 py-2'} rounded-full text-sm font-medium border-none outline-none cursor-pointer transition-all bg-transparent ${!isDark ? 'text-black' : 'text-white'}`}
                            >
                                <option value="0.5" className={isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>0.5x</option>
                                <option value="0.75" className={isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>0.75x</option>
                                <option value="1" className={isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>1x</option>
                                <option value="1.25" className={isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>1.25x</option>
                                <option value="1.5" className={isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>1.5x</option>
                                <option value="2" className={isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>2x</option>
                            </select>
                        </div>
                    )}

                    {controls.volume && (
                        <div className="flex items-center gap-1 md:gap-3 ml-auto">
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX size={20} className={isDark ? 'text-gray-100' : 'text-gray-600'} />
                                ) : (
                                    <Volume2 size={20} className={isDark ? 'text-gray-100' : 'text-gray-600'} />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, ${color} ${volume}%, #e5e7eb ${volume}%)`,
                                    display: containerWidth < 460 ? 'none' : 'block'
                                }}
                            />
                            <span style={{ display: containerWidth < 800 ? 'none' : 'block' }} className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-700'} font-mono w-10 text-right`}>{volume}%</span>
                        </div>
                    )}
                </div>

                <style>{`
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: ${color};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    }
                    
                    input[type="range"]::-moz-range-thumb {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: ${color};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    }
                    input[type="range"].eq-slider::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 0;
                        height: 0;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                    }
                    input[type="range"].eq-slider::-moz-range-thumb {
                        width: 0;
                        height: 0;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                    }
                    .hide-for-xs {
                        display: flex;
                    }
                    @media (max-width: 480px) {
                        .hide-for-xs {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}

function DemoVisualizePlayer() {
    const [audioFile, setAudioFile] = useState<string | null>(null);
    const [audioName, setAudioName] = useState<string>('No track loaded');
    const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('purple');
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [transparent, setTransparent] = useState(false)
    const [mode, setMode] = useState<'light' | 'dark'>('light')
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioFile(url);
            setAudioName(file.name);
        }
    };

    const handleLoadAudio = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: mode === 'dark' ? '#222' : 'white' }}>
            <div className="w-full h-full md:h-auto md:max-w-4xl">
                {/* Theme Selector - Initially Hidden */}
                {showThemeSelector && (
                    <ThemeSelector theme={selectedTheme as ThemeKey} setTheme={setSelectedTheme} close={() => setShowThemeSelector(false)} />
                )}

                <div className="container-glass rounded-xl p-8">
                    {/* Header */}
                    <div className="mb-6 flex justify-between items-start">
                        <div>
                            <h1 className={`text-2xl font-semibold ${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-1`}>Audio Visualizer</h1>
                            <p className="text-sm text-gray-500">Professional frequency analyzer</p>
                        </div>
                        <button
                            onClick={() => setShowThemeSelector(!showThemeSelector)}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            <span>🎨</span> Themes
                        </button>
                    </div>

                    {/* Player Component */}
                    <VisualizePlayer
                        audio={audioFile || undefined}
                        name={audioName || undefined}
                        author={'K.Prabhasha'}
                        theme={selectedTheme}
                        autoPlay={false}
                        thumbnail={'https://cdn-icons-png.flaticon.com/512/3845/3845874.png'}
                        mode={mode}
                        transparent={transparent}
                        volume={70}
                        controls={{
                            play: true,
                            pause: true,
                            stop: true,
                            seekbar: true,
                            volume: true,
                            loop: true,
                            trackName: true
                        }}
                    />
                    <WaveAudioPlayer audio={audioFile || ''} width={400} thumbnail={'https://cdn-icons-png.flaticon.com/512/8316/8316619.png'} autoPlay={false} gradient={['#26ce3aff', '#39eed9ff']} background={'#c0ffefff'} />
                    <NanoAudioPlayer audio={audioFile || ''} thumbnail={'https://cdn-icons-png.flaticon.com/512/17524/17524837.png'} autoPlay={false} gradient={['#26ce3aff', '#39eed9ff']} background={'#c0ffefff'} />

                    {/* Load Audio Button */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="audio/*"
                            className="hidden"
                        />
                        <button
                            onClick={handleLoadAudio}
                            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Upload size={16} />
                            Load Audio
                        </button>
                        <button
                            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            {mode === 'dark' ? 'Light' : 'Dark'}
                        </button>
                        <button
                            onClick={() => setTransparent(!transparent)}
                            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            Transparent: {String(transparent)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, VideoPlayer, DemoVisualizePlayer };