import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat, Upload, Maximize, Minimize, Sliders } from 'lucide-react';
import './index.css';

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
};

// --- ThemeSelector ---
function ThemeSelector({ theme, setTheme, close }: ThemeSelectorProps) {
    const themeOptions = (Object.keys(themes) as ThemeKey[]).map(key => ({
        key,
        name: themes[key].name,
        colors: themes[key].bars
    }));

    return (
        <div className="ecp-theme-selector-panel">
            <div className="ecp-theme-selector-header">
                <h2 className="ecp-theme-selector-title">Choose Color Palette</h2>
                <button onClick={() => close()} className="ecp-theme-selector-close">Close</button>
            </div>
            <div className="ecp-theme-grid">
                {themeOptions.map(t => (
                    <div
                        key={t.key}
                        className={`ecp-theme-card${theme === t.key ? ' ecp-theme-card--active' : ''}`}
                        onClick={() => setTheme(t.key)}
                    >
                        <div
                            className="ecp-theme-color-preview"
                            style={{ background: `linear-gradient(to right, ${t.colors.join(', ')})` }}
                        />
                        <div className="ecp-theme-name">{t.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- VisualizePlayer ---
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
    equalizer = { bass: 0, mid: 0, treble: 0 }
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
    });
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [containerWidth, setContainerWidth] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const bassFilterRef = useRef<BiquadFilterNode | null>(null);
    const midFilterRef = useRef<BiquadFilterNode | null>(null);
    const trebleFilterRef = useRef<BiquadFilterNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const vuContainerRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) setContainerWidth(entry.contentRect.width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const errors: string[][] = [];
        if (audio && typeof audio !== 'string') errors.push(['TypeError', 'audio must be a string (URL or path)']);
        if (name && typeof name !== 'string') errors.push(['TypeError', 'name must be a string']);
        if (theme && typeof theme !== 'string' && typeof theme !== 'object') errors.push(['TypeError', 'theme must be a string or a valid theme object']);
        else if (typeof theme === 'object') {
            const keys = ['name', 'bg', 'bars', 'peak', 'button', 'buttonHover', 'slider'];
            for (const k of keys) {
                if (!(k in theme)) errors.push(['ThemeError', `theme object missing key: ${k}`]);
            }
        }
        if (typeof vol !== 'number' || vol < 0 || vol > 100) errors.push(['TypeError', 'volume must be a number between 0 and 100']);
        if (typeof controls !== 'object' || Array.isArray(controls)) errors.push(['TypeError', 'controls must be an object']);
        else {
            const controlKeys = ['play', 'pause', 'stop', 'seekbar', 'volume', 'loop', 'trackName', 'equalizer'] as const;
            controlKeys.forEach(key => {
                if (controls && key in controls && typeof (controls as any)[key] !== 'boolean')
                    errors.push(['TypeError', `controls.${key} must be a boolean`]);
            });
        }
        if (_bands) {
            if (!Array.isArray(_bands)) errors.push(['TypeError', 'bands must be an array']);
            else if (_bands.length === 0) errors.push(['ValueError', 'bands array cannot be empty']);
            else _bands.forEach((band, i) => {
                if (typeof band.freq !== 'number') errors.push(['TypeError', `bands[${i}].freq must be a number`]);
            });
        }
        if (errors.length > 0) {
            setError(errors);
            console.group('%cVisualizePlayer: Prop validation failed', 'color:red');
            errors.forEach(e => console.error(`${e[0]}: ${e[1]}`));
            console.groupEnd();
        } else { setError([]); }
    }, [audio, name, theme, vol, controls, mode, _bands]);

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

    const currentTheme: Theme = (typeof theme === 'string') ? (themes[theme] || themes.purple) : (typeof theme === 'object') ? theme : themes.purple;
    const isDark = mode === 'dark';
    const noControls = (typeof controls === 'object' && Object.keys(controls).length === 0);

    useEffect(() => {
        if (typeof theme === 'string') themeRef.current = theme;
        else themeRef.current = 'purple';
        updateVU();
    }, [theme]);

    useEffect(() => {
        if (!audioRef.current) audioRef.current = new Audio();
        const audioElement = audioRef.current;
        const handleTimeUpdate = () => { if (!isSeeking) setCurrentTime(audioElement.currentTime); };
        const handleLoadedMetadata = () => setDuration(audioElement.duration);
        const handleEnded = () => {
            if (!isLoop) { setIsPlaying(false); if (animationRef.current) cancelAnimationFrame(animationRef.current); }
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

    useEffect(() => {
        return () => {
            if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; audioRef.current.load(); }
            if (audioContextRef.current) audioContextRef.current.close().catch(e => console.warn("AudioContext cleanup error:", e));
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    useEffect(() => {
        if (audio) {
            const wasPlaying = isPlaying;
            const currentVolume = volume;
            const currentLoop = isLoop;
            if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
            if (sourceRef.current) { try { sourceRef.current.disconnect(); } catch (e) { } sourceRef.current = null; }
            if (analyserRef.current) { try { analyserRef.current.disconnect(); } catch (e) { } analyserRef.current = null; }
            if (bassFilterRef.current) { try { bassFilterRef.current.disconnect(); } catch (e) { } bassFilterRef.current = null; }
            if (midFilterRef.current) { try { midFilterRef.current.disconnect(); } catch (e) { } midFilterRef.current = null; }
            if (trebleFilterRef.current) { try { trebleFilterRef.current.disconnect(); } catch (e) { } trebleFilterRef.current = null; }
            if (audioContextRef.current) { audioContextRef.current.close().catch(e => console.warn("AudioContext close error:", e)); audioContextRef.current = null; }
            if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; audioRef.current.load(); }
            audioRef.current = new Audio();
            try { audioRef.current.crossOrigin = 'anonymous'; } catch (e) { }
            audioRef.current.src = audio;
            audioRef.current.preload = 'auto';
            audioRef.current.muted = false;
            audioRef.current.volume = isMuted ? 0 : currentVolume / 100;
            audioRef.current.loop = currentLoop;
            audioRef.current.load();
            const audioElement = audioRef.current;
            const handleTimeUpdate = () => { if (!isSeeking) setCurrentTime(audioElement.currentTime); };
            const handleLoadedMetadata = () => setDuration(audioElement.duration);
            const handleEnded = () => { if (!isLoop) { setIsPlaying(false); if (animationRef.current) cancelAnimationFrame(animationRef.current); } };
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.addEventListener('ended', handleEnded);
            audioElement.addEventListener('play', handlePlay);
            audioElement.addEventListener('pause', handlePause);
            setCurrentTime(0);
            setIsPlaying(false);
            bandPeaksRef.current = bands.map(() => 0);
            peakHoldsRef.current = bands.map(() => 0);
            peakHoldTimesRef.current = bands.map(() => 0);
            updateVU();
            if (wasPlaying) audioRef.current.play().catch(e => console.error("Play failed:", e));
        }
    }, [audio]);

    useEffect(() => { if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume / 100; }, [volume, isMuted]);
    useEffect(() => { if (audioRef.current) audioRef.current.loop = isLoop; }, [isLoop]);
    useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = playbackRate; }, [playbackRate]);
    useEffect(() => {
        if (audioContextRef.current) {
            if (bassFilterRef.current) bassFilterRef.current.gain.value = eqBands.bass;
            if (midFilterRef.current) midFilterRef.current.gain.value = eqBands.mid;
            if (trebleFilterRef.current) trebleFilterRef.current.gain.value = eqBands.treble;
        }
    }, [eqBands]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
        if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
        if (isPlaying) { if (!audioContextRef.current) setupAudioContext(); analyze(); }
        else fadeOutVisualization();
    }, [isPlaying]);

    const setupAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
            try {
                const AudioContextClass: any = (window as any).AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    const ctx = new AudioContextClass();
                    audioContextRef.current = ctx;
                    const bassFilter = ctx.createBiquadFilter(); bassFilter.type = 'lowshelf'; bassFilter.frequency.value = 320; bassFilter.gain.value = eqBands.bass;
                    const midFilter = ctx.createBiquadFilter(); midFilter.type = 'peaking'; midFilter.frequency.value = 1000; midFilter.Q.value = 0.5; midFilter.gain.value = eqBands.mid;
                    const trebleFilter = ctx.createBiquadFilter(); trebleFilter.type = 'highshelf'; trebleFilter.frequency.value = 3200; trebleFilter.gain.value = eqBands.treble;
                    const analyser = ctx.createAnalyser(); analyser.fftSize = 8192; analyser.smoothingTimeConstant = 0.7;
                    const source = ctx.createMediaElementSource(audioRef.current);
                    source.connect(bassFilter); bassFilter.connect(midFilter); midFilter.connect(trebleFilter); trebleFilter.connect(analyser); analyser.connect(ctx.destination);
                    bassFilterRef.current = bassFilter; midFilterRef.current = midFilter; trebleFilterRef.current = trebleFilter; analyserRef.current = analyser; sourceRef.current = source;
                }
            } catch (error) { console.error("Failed to setup audio context:", error); }
        }
    };

    const getFrequencyIndex = (frequency: number) => {
        const ctx = audioContextRef.current; const analyser = analyserRef.current;
        if (!ctx || !analyser) return 0;
        const nyquist = ctx.sampleRate / 2;
        const index = Math.round(frequency / nyquist * analyser.frequencyBinCount);
        return Math.min(index, analyser.frequencyBinCount - 1);
    };

    const fadeOutVisualization = () => {
        if (isPlayingRef.current) return;
        bandPeaksRef.current = bandPeaksRef.current.map(peak => peak * 0.7);
        const now = Date.now();
        peakHoldsRef.current = peakHoldsRef.current.map((peak, index) => {
            if (now - peakHoldTimesRef.current[index] > 1500) return peak * 0.95;
            return peak;
        });
        updateVU();
        const maxPeak = Math.max(...bandPeaksRef.current);
        const maxHold = Math.max(...peakHoldsRef.current);
        if (maxPeak > 0.01 || maxHold > 0.01) {
            animationRef.current = requestAnimationFrame(fadeOutVisualization);
        } else {
            if (!isPlayingRef.current) { bandPeaksRef.current = bands.map(() => 0); peakHoldsRef.current = bands.map(() => 0); peakHoldTimesRef.current = bands.map(() => 0); updateVU(); }
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
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
            const nextFreqIndex = index < bands.length - 1 ? getFrequencyIndex(bands[index + 1].freq) : dataArray.length;
            let sum = 0; let count = 0;
            for (let i = freqIndex; i < nextFreqIndex; i++) { sum += dataArray[i]; count++; }
            let avg = count > 0 ? sum / count / 255 : 0;
            avg = Math.pow(avg, 0.6);
            bandPeaksRef.current[index] = bandPeaksRef.current[index] * 0.8 + avg * 0.2;
            const now = Date.now();
            if (bandPeaksRef.current[index] > peakHoldsRef.current[index]) { peakHoldsRef.current[index] = bandPeaksRef.current[index]; peakHoldTimesRef.current[index] = now; }
            else if (now - peakHoldTimesRef.current[index] > 1500) peakHoldsRef.current[index] *= 0.95;
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
                <div class="ecp-vu-bar-wrap">
                    <div class="ecp-vu-bar-fill" style="height: ${height}%; background: ${barColor};">
                        ${peakHoldsRef.current[index] > 0.1 ? `<div class="ecp-vu-peak-line" style="top: ${peakPos}%; background: ${currentTheme.peak};"></div>` : ''}
                    </div>
                </div>
            `;
        });
        vuContainerRef.current.innerHTML = html;
    };

    const togglePlay = () => {
        if (!audioRef.current || !audio) return;
        if (isPlaying) { audioRef.current.pause(); }
        else {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
            audioRef.current.play().catch(e => console.error("Play failed:", e));
        }
    };

    const stop = () => {
        if (!audioRef.current) return;
        audioRef.current.pause(); audioRef.current.currentTime = 0;
        setIsPlaying(false); setCurrentTime(0);
        bandPeaksRef.current = bands.map(() => 0); peakHoldsRef.current = bands.map(() => 0); peakHoldTimesRef.current = bands.map(() => 0);
        updateVU();
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        const seekTime = (value / 100) * duration;
        setCurrentTime(seekTime);
        if (audioRef.current && !isSeeking) audioRef.current.currentTime = seekTime;
    };
    const handleSeekMouseDown = () => setIsSeeking(true);
    const handleSeekMouseUp = () => { if (audioRef.current) audioRef.current.currentTime = currentTime; setIsSeeking(false); };
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => { const v = parseInt(e.target.value); setVolume(v); setIsMuted(v === 0); };
    const toggleMute = () => setIsMuted(!isMuted);
    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPlaybackRate(parseFloat(e.target.value));
    const toggleLoop = () => setIsLoop(!isLoop);
    const handleEqChange = (band: 'bass' | 'mid' | 'treble', value: number) => setEqBands(prev => ({ ...prev, [band]: value }));
    const resetEqualizer = () => setEqBands({ bass: 0, mid: 0, treble: 0 });

    useEffect(() => {
        if ((((typeof controls === 'object' && Object.keys(controls).length === 0) || !controls) && !isPlaying) || autoPlay) togglePlay();
    }, [controls]);

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (error && error.length > 0) {
        return (
            <>
                {error.map((e, i) => (
                    <div key={i} className="ecp-vp-error"><strong>{e[0]}:</strong> {e[1]}</div>
                ))}
            </>
        );
    }

    const wrapperBg = !(noControls || transparent) ? (isDark ? '#6060606a' : '#ffffffab') : undefined;
    const innerBg = !(noControls || transparent) ? currentTheme.bg : undefined;
    const vuBgClass = `ecp-vp-vu-bg${isDark ? ' ecp-vp-vu-bg--dark' : ' ecp-vp-vu-bg--light'}${showEqualizer && transparent ? ' ecp-vp-vu-bg--dimmed' : ''}${noControls ? ' ecp-vp-vu-bg--no-margin' : ''}`;

    return (
        <div ref={containerRef} className="ecp-vp-wrapper" style={{ backgroundColor: wrapperBg }}>
            <div className="ecp-vp-bg" style={{ background: innerBg }}>
                {/* VU Meter */}
                <div className="ecp-vp-vu-outer">
                    <div className={vuBgClass}>
                        <div className="ecp-vp-vu-bars" ref={vuContainerRef} />
                    </div>

                    {showEqualizer && (
                        <div className={`ecp-vp-eq-overlay${isDark ? ' ecp-vp-eq-overlay--dark' : ' ecp-vp-eq-overlay--light'}`}>
                            <h3 className={`ecp-vp-eq-title${isDark ? ' ecp-vp-eq-title--dark' : ' ecp-vp-eq-title--light'}`}>Equalizer</h3>
                            <div className="ecp-vp-eq-bands">
                                {(['bass', 'mid', 'treble'] as const).map(band => (
                                    <div key={band} className="ecp-vp-eq-band">
                                        <div className="ecp-vp-eq-band-header">
                                            <span className={`ecp-vp-eq-band-label${isDark ? ' ecp-vp-eq-band-label--dark' : ' ecp-vp-eq-band-label--light'}`}>{band.charAt(0).toUpperCase() + band.slice(1)}</span>
                                            <span className={`ecp-vp-eq-band-label${isDark ? ' ecp-vp-eq-band-label--dark' : ' ecp-vp-eq-band-label--light'}`}>{eqBands[band]} dB</span>
                                        </div>
                                        <div className="ecp-vp-eq-band-range">
                                            <span className={`ecp-vp-eq-range-bound${isDark ? ' ecp-vp-eq-range-bound--dark' : ' ecp-vp-eq-range-bound--light'}`}>-20</span>
                                            <input
                                                type="range" min="-20" max="20" value={eqBands[band]}
                                                onChange={(e) => handleEqChange(band, parseInt(e.target.value))}
                                                className="ecp-vp-eq-slider"
                                                style={{
                                                    background: `linear-gradient(to right, ${currentTheme.slider} ${(eqBands[band] + 20) / 40 * 100}%, ${currentTheme.slider + '30'} ${(eqBands[band] + 20) / 40 * 100}%)`,
                                                    '--thumb-color': currentTheme.slider
                                                } as React.CSSProperties}
                                            />
                                            <span className={`ecp-vp-eq-range-bound${isDark ? ' ecp-vp-eq-range-bound--dark' : ' ecp-vp-eq-range-bound--light'}`}>+20</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="ecp-vp-eq-footer">
                                <button onClick={resetEqualizer} className={`ecp-vp-eq-reset${isDark ? ' ecp-vp-eq-reset--dark' : ' ecp-vp-eq-reset--light'}`}>Reset</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Track Name */}
                {controls.trackName && (
                    <div className="ecp-vp-track">
                        {thumbnail && (
                            <div className="ecp-vp-thumbnail-wrap">
                                <img src={thumbnail} alt="" className={`ecp-vp-thumbnail${isPlaying ? ' ecp-animation-spin' : ''}`} />
                            </div>
                        )}
                        <div className="ecp-vp-track-info">
                            <div className={`ecp-vp-track-name${isDark ? ' ecp-vp-track-name--dark' : ' ecp-vp-track-name--light'}`}>{name}</div>
                            {author && typeof author === 'string' && (
                                <div className={`ecp-vp-track-author${isDark ? ' ecp-vp-track-author--dark' : ' ecp-vp-track-author--light'}`}>{author}</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Seekbar */}
                {controls.seekbar && (
                    <div className="ecp-vp-seekbar">
                        <div className="ecp-vp-seekbar-row">
                            <span className={`ecp-vp-time${isDark ? ' ecp-vp-time--dark' : ' ecp-vp-time--light'}`}>{formatTime(currentTime)}</span>
                            <input
                                type="range" min="0" max="100"
                                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                                onChange={handleSeekChange}
                                onMouseDown={handleSeekMouseDown} onMouseUp={handleSeekMouseUp}
                                onTouchStart={handleSeekMouseDown} onTouchEnd={handleSeekMouseUp}
                                disabled={!audio}
                                className="ecp-vp-seek-input"
                                style={{
                                    background: audio && duration > 0
                                        ? `linear-gradient(to right, ${currentTheme.slider} ${(currentTime / duration) * 100}%, ${currentTheme.slider + '30'} ${(currentTime / duration) * 100}%)`
                                        : currentTheme.slider + '30',
                                    '--thumb-color': currentTheme.slider
                                } as React.CSSProperties}
                            />
                            <span className={`ecp-vp-time ecp-vp-time--right${isDark ? ' ecp-vp-time--dark' : ' ecp-vp-time--light'}`}>{formatTime(duration)}</span>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div className={`ecp-vp-controls${containerWidth < 330 ? ' ecp-vp-controls--sm' : ''}`}>
                    {controls.play && (
                        <button
                            onClick={togglePlay} disabled={!audio}
                            className={`ecp-vp-play-btn${containerWidth < 350 ? ' ecp-vp-play-btn--compact' : ''}`}
                            style={{ backgroundColor: currentTheme.button }}
                        >
                            <div className="ecp-vp-play-icon-wrap">
                                <Pause size={16} style={{ position: 'absolute', transform: !isPlaying ? 'scale(0) translateY(2.5rem)' : undefined, transition: 'all 150ms' }} />
                                <Play size={16} style={{ position: 'absolute', transform: isPlaying ? 'scale(0) translateY(-2.5rem)' : undefined, transition: 'all 150ms' }} />
                            </div>
                            <span style={{ display: containerWidth < 350 ? 'none' : 'block' }}>{isPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                    )}

                    {controls.stop && (
                        <button
                            onClick={stop} disabled={!audio}
                            className={`ecp-vp-stop-btn${isDark ? ' ecp-vp-stop-btn--dark' : ' ecp-vp-stop-btn--light'}${containerWidth >= 600 ? ' ecp-vp-stop-btn--wide' : ''}`}
                        >
                            <Square size={16} />
                            <span style={{ display: containerWidth < 600 ? 'none' : 'block' }}>Stop</span>
                        </button>
                    )}

                    {controls.equalizer && (
                        <button
                            onClick={() => setShowEqualizer(!showEqualizer)} disabled={!audio}
                            className={`ecp-vp-eq-btn${showEqualizer ? ' ecp-vp-eq-btn--on' : ' ecp-vp-eq-btn--off'}${containerWidth >= 600 ? ' ecp-vp-eq-btn--wide' : ''}`}
                            style={showEqualizer ? { backgroundColor: currentTheme.button } : {}}
                        >
                            <Sliders size={16} />
                            <span style={{ display: containerWidth < 600 ? 'none' : 'block' }}>EQ</span>
                        </button>
                    )}

                    {controls.loop && (
                        <button
                            onClick={toggleLoop} disabled={!audio}
                            className={`ecp-vp-loop-btn${isLoop ? ' ecp-vp-loop-btn--on' : ' ecp-vp-loop-btn--off'}${containerWidth >= 700 ? ' ecp-vp-loop-btn--wide' : ''}`}
                            style={isLoop ? { backgroundColor: currentTheme.button } : {}}
                        >
                            <Repeat size={16} className={isLoop ? 'ecp-vp-loop-icon--active' : ''} />
                            <span style={{ display: containerWidth < 700 ? 'none' : 'block' }}>Loop</span>
                        </button>
                    )}

                    {controls.speed && (
                        <div className="ecp-vp-speed-wrap">
                            <select value={playbackRate} onChange={handleSpeedChange} className={`ecp-vp-speed-select${isDark ? ' ecp-vp-speed-select--dark' : ' ecp-vp-speed-select--light'}`}>
                                {['0.5', '0.75', '1', '1.25', '1.5', '2'].map(v => (
                                    <option key={v} value={v} className={isDark ? 'ecp-vp-speed-option--dark' : 'ecp-vp-speed-option--light'}>{v}x</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {controls.volume && (
                        <div className="ecp-vp-volume">
                            <button onClick={toggleMute} className="ecp-vp-mute-btn">
                                {isMuted || volume === 0
                                    ? <VolumeX size={20} className={isDark ? 'ecp-vp-mute-icon--dark' : 'ecp-vp-mute-icon--light'} />
                                    : <Volume2 size={20} className={isDark ? 'ecp-vp-mute-icon--dark' : 'ecp-vp-mute-icon--light'} />
                                }
                            </button>
                            <input
                                type="range" min="0" max="100" value={volume}
                                onChange={handleVolumeChange}
                                className="ecp-vp-volume-slider"
                                style={{
                                    background: `linear-gradient(to right, ${currentTheme.slider} ${volume}%, ${currentTheme.slider + '30'} ${volume}%)`,
                                    '--thumb-color': currentTheme.slider,
                                    display: containerWidth < 460 ? 'none' : 'block'
                                } as React.CSSProperties}
                            />
                            <span
                                className={`ecp-vp-volume-pct${isDark ? ' ecp-vp-volume-pct--dark' : ' ecp-vp-volume-pct--light'}`}
                                style={{ display: containerWidth < 800 ? 'none' : 'block' }}
                            >{volume}%</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- WaveAudioPlayer ---
function WaveAudioPlayer({
    audio: audioUrl,
    gradient = ['#cd7eff', '#ff00f2'],
    background = '#f4e4ffff',
    autoPlay = false,
    thumbnail = null,
    width,
    equalizer = { bass: 0, mid: 0, treble: 0 },
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
    const [eqBands, setEqBands] = useState({ bass: equalizer.bass || 0, mid: equalizer.mid || 0, treble: equalizer.treble || 0 });
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const bassFilterRef = useRef<BiquadFilterNode | null>(null);
    const midFilterRef = useRef<BiquadFilterNode | null>(null);
    const trebleFilterRef = useRef<BiquadFilterNode | null>(null);

    const generateWaveformData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) data.push(20 + Math.random() * 60);
        return data;
    };

    useEffect(() => {
        if (!audioUrl) return;
        if (!Array.isArray(gradient) || gradient.length < 2) { setError("Gradient must be an array with at least 2 colors"); return; }
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => { setDuration(audio.duration); setWaveformData(generateWaveformData()); };
        const handleEnded = () => setIsPlaying(false);
        const handleError = (e: any) => setError(`Audio error: ${e.target?.error?.message || 'Failed to load audio'}`);
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
            audioRef.current.play().catch((e: any) => { console.error("Play failed:", e); setIsPlaying(false); });
            setIsPlaying(true);
        }
    }, [audioUrl]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (!audioCtxRef.current && audioRef.current) {
            const AudioCtxClass: any = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioCtxClass) {
                const ctx = new AudioCtxClass(); audioCtxRef.current = ctx;
                const source = ctx.createMediaElementSource(audioRef.current); sourceRef.current = source;
                const bassFilter = ctx.createBiquadFilter(); bassFilter.type = "lowshelf"; bassFilter.frequency.value = 200; bassFilterRef.current = bassFilter;
                const midFilter = ctx.createBiquadFilter(); midFilter.type = "peaking"; midFilter.frequency.value = 1000; midFilter.Q.value = 1; midFilterRef.current = midFilter;
                const trebleFilter = ctx.createBiquadFilter(); trebleFilter.type = "highshelf"; trebleFilter.frequency.value = 3000; trebleFilterRef.current = trebleFilter;
                source.connect(bassFilter).connect(midFilter).connect(trebleFilter).connect(ctx.destination);
            }
        }
    }, [audioUrl]);

    useEffect(() => { if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume / 100; }, [volume, isMuted]);
    useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = playbackRate; }, [playbackRate]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play().catch(e => setError(`Playback failed: ${e instanceof Error ? e.message : String(e)}`));
            setIsPlaying(!isPlaying);
        }
    };
    const toggleMute = () => setIsMuted(!isMuted);
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => { setVolume(parseInt(e.target.value)); if (isMuted && parseInt(e.target.value) > 0) setIsMuted(false); };
    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPlaybackRate(parseFloat(e.target.value));
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        const newTime = percentage * duration;
        if (audioRef.current) { audioRef.current.currentTime = newTime; setCurrentTime(newTime); }
    };
    const handleEqChange = (band: 'bass' | 'mid' | 'treble', value: number) => {
        setEqBands(prev => ({ ...prev, [band]: value }));
        if (band === "bass" && bassFilterRef.current) bassFilterRef.current.gain.value = value;
        if (band === "mid" && midFilterRef.current) midFilterRef.current.gain.value = value;
        if (band === "treble" && trebleFilterRef.current) trebleFilterRef.current.gain.value = value;
    };
    const resetEqualizer = () => { handleEqChange("bass", 0); handleEqChange("mid", 0); handleEqChange("treble", 0); };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const isDark = mode === 'dark';

    if (error) {
        return (
            <div className="ecp-wave-error" style={{ background }}>
                <p className={`ecp-wave-error-title${isDark ? ' ecp-wave-error--dark' : ' ecp-wave-error--light'}`}>Error</p>
                <p className={`ecp-wave-error-msg${isDark ? ' ecp-wave-error--dark' : ' ecp-wave-error--light'}`}>{error}</p>
            </div>
        );
    }

    if (!audioUrl) return null;

    const timeColor = isDark ? '#9ca3af' : '#6b7280';

    return (
        <div className="ecp-wave-outer" style={{ width: width ? `${width}px` : undefined }}>
            <audio ref={audioRef} src={audioUrl} className="ecp-wave-audio-el" />

            <div className="ecp-wave-card">
                <div className="ecp-wave-card-inner" style={{ background }}>
                    {thumbnail && (
                        <div className="ecp-wave-thumbnail-wrap">
                            <img src={thumbnail} alt="" className="ecp-wave-thumbnail" />
                        </div>
                    )}

                    {/* Waveform seek */}
                    <div className="ecp-wave-seek" onClick={handleSeek}>
                        <div className="ecp-wave-bars">
                            {waveformData.map((height, index) => {
                                const isFilled = (index / waveformData.length) * 100 <= progress;
                                return (
                                    <div
                                        key={index}
                                        className="ecp-wave-bar"
                                        style={{
                                            height: `${height}%`,
                                            background: isFilled ? gradient[0] : gradient[1],
                                            opacity: isFilled ? 1 : 0.4
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <div className="ecp-wave-progress-line" style={{ left: `${progress}%` }} />
                    </div>

                    {/* Times */}
                    <div className="ecp-wave-times" style={{ color: timeColor }}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="ecp-wave-controls">
                        <div className="ecp-wave-left-controls">
                            <button
                                onClick={toggleMute}
                                className="ecp-wave-vol-btn"
                                style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
                            >
                                {isMuted || volume === 0
                                    ? <VolumeX style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                    : <Volume2 style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                }
                            </button>
                            <input
                                type="range" min="0" max="100" value={volume}
                                onChange={handleVolumeChange}
                                className="ecp-wave-vol-slider"
                                style={{
                                    background: `linear-gradient(to right, ${gradient[0]} ${volume}%, ${isDark ? '#374151' : '#d1d5db'} ${volume}%)`,
                                    '--thumb-color': gradient[0],
                                    display: (width && width < 400) ? 'none' : undefined
                                } as React.CSSProperties}
                            />
                            {(width && width < 400) && (
                                <button
                                    onClick={() => setShowEqualizer(!showEqualizer)}
                                    className="ecp-wave-eq-btn"
                                    style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
                                >
                                    <Sliders style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                </button>
                            )}
                        </div>

                        <div className="ecp-wave-center-controls">
                            <button
                                onClick={togglePlay}
                                className="ecp-wave-play-btn"
                                style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
                            >
                                {isPlaying
                                    ? <Pause style={{ width: '1.5rem', height: '1.5rem', color: 'white', fill: 'white' }} />
                                    : <Play style={{ width: '1.5rem', height: '1.5rem', color: 'white', fill: 'white' }} />
                                }
                            </button>
                        </div>

                        <div className="ecp-wave-right-controls">
                            <select
                                value={playbackRate} onChange={handleSpeedChange}
                                className={`ecp-wave-speed-select${isDark ? ' ecp-wave-speed-select--dark' : ' ecp-wave-speed-select--light'}`}
                                style={{ background, color: gradient[0] }}
                            >
                                {['0.5', '0.75', '1', '1.25', '1.5', '2'].map(v => (
                                    <option key={v} value={v}>{v}x</option>
                                ))}
                            </select>
                            {!(width && width < 400) && (
                                <button
                                    onClick={() => setShowEqualizer(!showEqualizer)}
                                    className="ecp-wave-eq-btn"
                                    style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
                                >
                                    <Sliders style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* EQ Overlay */}
            {showEqualizer && (
                <div className="ecp-wave-eq-overlay">
                    <div className={`ecp-wave-eq-panel${isDark ? ' ecp-wave-eq-panel--dark' : ' ecp-wave-eq-panel--light'}`}>
                        <h3 className={`ecp-wave-eq-title${isDark ? ' ecp-wave-eq-title--dark' : ' ecp-wave-eq-title--light'}`}>Equalizer</h3>
                        <div className="ecp-wave-eq-bands">
                            {(['bass', 'mid', 'treble'] as const).map(band => (
                                <div key={band}>
                                    <div className="ecp-wave-eq-band-header">
                                        <span className={isDark ? 'ecp-wave-eq-label--dark' : 'ecp-wave-eq-label--light'}>{band.charAt(0).toUpperCase() + band.slice(1)}</span>
                                        <span className={isDark ? 'ecp-wave-eq-label--dark' : 'ecp-wave-eq-label--light'}>{eqBands[band]} dB</span>
                                    </div>
                                    <div className="ecp-wave-eq-range-row">
                                        <span className={isDark ? 'ecp-wave-eq-bound--dark' : 'ecp-wave-eq-bound--light'}>-20</span>
                                        <input
                                            type="range" min="-20" max="20" value={eqBands[band]}
                                            onChange={(e) => handleEqChange(band, parseInt(e.target.value))}
                                            className="ecp-wave-eq-slider"
                                            style={{
                                                background: `linear-gradient(to right, ${gradient[0]} ${(eqBands[band] + 20) / 40 * 100}%, ${gradient[1] + '30'} ${(eqBands[band] + 20) / 40 * 100}%)`,
                                                '--thumb-color': gradient[0]
                                            } as React.CSSProperties}
                                        />
                                        <span className={isDark ? 'ecp-wave-eq-bound--dark' : 'ecp-wave-eq-bound--light'}>+20</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="ecp-wave-eq-footer">
                            <button onClick={resetEqualizer} className={`ecp-wave-eq-footer-btn${isDark ? ' ecp-wave-eq-footer-btn--dark' : ' ecp-wave-eq-footer-btn--light'}`}>Reset</button>
                            <button onClick={() => setShowEqualizer(false)} className={`ecp-wave-eq-footer-btn${isDark ? ' ecp-wave-eq-footer-btn--dark' : ' ecp-wave-eq-footer-btn--light'}`}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- NanoAudioPlayer ---
function NanoAudioPlayer({ audio: audioUrl, thumbnail, gradient: colors = ['#cd7eff', '#fe59f6'], background = '#1f273a', autoPlay = false }: NanoAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [animationTime, setAnimationTime] = useState<number>(0);
    const [audioDuration, setAudioDuration] = useState<number>(0);
    const [playedDuration, setPlayedDuration] = useState<number>(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    useEffect(() => {
        const loop = setInterval(() => { if (isPlaying) setAnimationTime(prev => prev + 0.1); }, 100);
        return () => clearInterval(loop);
    }, [isPlaying]);

    useEffect(() => {
        const loop = setInterval(() => { if (isPlaying) setPlayedDuration(prev => prev + 0.1); }, 100);
        return () => clearInterval(loop);
    }, [isPlaying]);

    useEffect(() => {
        if (audioUrl && audioRef.current && autoPlay) { audioRef.current.play().catch(() => setIsPlaying(false)); setIsPlaying(true); }
    }, [audioUrl]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleLoadedMetadata = () => setAudioDuration(audio.duration);
        setPlayedDuration(0);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, [audioUrl]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play().catch((e: any) => console.error("NanoPlayer play failed:", e));
            setIsPlaying(!isPlaying);
        }
    };

    if (!audioUrl) return null;

    const buttonGradient = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    const progressWidth = `${(audioDuration > 0 ? playedDuration / audioDuration : 0) * 100}%`;

    return (
        <div
            className={`ecp-nano-wrapper${thumbnail ? ' ecp-nano-wrapper--card' : ' ecp-nano-wrapper--pill'}`}
            style={{ backgroundColor: background }}
        >
            <audio
                ref={audioRef} src={audioUrl}
                onEnded={() => { setIsPlaying(false); setPlayedDuration(0); }}
            />

            <div className="ecp-nano-progress-bg" style={{ width: progressWidth, backgroundImage: buttonGradient }} />

            <div className="ecp-nano-content">
                {thumbnail && (
                    <div className="ecp-nano-thumbnail-wrap">
                        <img src={thumbnail} alt="" className="ecp-nano-thumbnail" />
                    </div>
                )}
                <div className="ecp-nano-row">
                    <button onClick={togglePlay} className="ecp-nano-play-btn" style={{ background: buttonGradient }}>
                        {isPlaying
                            ? <Pause fill={background} style={{ width: '0.75rem', height: '0.75rem', color: 'transparent' }} />
                            : <Play fill={background} style={{ width: '0.75rem', height: '0.75rem', color: 'transparent' }} />
                        }
                    </button>
                    <div className="ecp-nano-waveform">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="ecp-nano-wave-bar"
                                style={{
                                    background: `linear-gradient(to top, ${colors[0]}, ${colors[1]})`,
                                    height: isPlaying ? `${8 + Math.sin((animationTime * 8 + i) * 0.6) * 10}px` : '8px',
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

// --- VideoPlayer ---
function VideoPlayer({
    video,
    name = 'No video loaded',
    audioVisual = null,
    volume: vol = 100,
    thumbnail = null,
    controls = {
        play: true, pause: true, stop: true, seekbar: true, volume: true,
        fullscreen: true, videoName: true, equalizer: true, speed: true
    },
    mode = 'light' as 'light' | 'dark',
    transparent = false,
    autoPlay = false,
    color = '#3b82f6',
    equalizer = { bass: 0, mid: 0, treble: 0 }
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
    const [eqBands, setEqBands] = useState({ bass: equalizer.bass || 0, mid: equalizer.mid || 0, treble: equalizer.treble || 0 });
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
    const leftPeakRef = useRef<number>(0);
    const rightPeakRef = useRef<number>(0);
    const leftHoldRef = useRef<number>(0);
    const rightHoldRef = useRef<number>(0);
    const leftHoldTimeRef = useRef<number>(0);
    const rightHoldTimeRef = useRef<number>(0);
    const isPlayingRef = useRef<boolean>(false);
    const isDark = mode === 'dark' || isFullscreen;
    const noControls = (typeof controls === 'object' && Object.keys(controls).length === 0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => { for (let entry of entries) setContainerWidth(entry.contentRect.width); });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const errors: string[][] = [];
        if (video && typeof video !== 'string') errors.push(['TypeError', 'video must be a string (URL or path)']);
        if (name && typeof name !== 'string') errors.push(['TypeError', 'name must be a string']);
        if (typeof vol !== 'number' || vol < 0 || vol > 100) errors.push(['TypeError', 'volume must be a number between 0 and 100']);
        if (audioVisual && typeof audioVisual !== 'object') errors.push(['TypeError', 'audioVisual must be an object']);
        else if (audioVisual && !['left', 'right', 'top', 'bottom'].includes(audioVisual.side)) errors.push(['ValueError', "audioVisual.side must be 'left', 'right', 'top', or 'bottom'"]);
        if (errors.length > 0) { setError(errors); } else setError([]);
    }, [video, name, vol, audioVisual, controls, mode]);

    useEffect(() => {
        if (!videoRef.current) return;
        const videoElement = videoRef.current;
        const handleTimeUpdate = () => { if (!isSeeking) setCurrentTime(videoElement.currentTime); };
        const handleLoadedMetadata = () => setDuration(videoElement.duration);
        const handleEnded = () => { setIsPlaying(false); if (animationRef.current) cancelAnimationFrame(animationRef.current); };
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

    useEffect(() => {
        if (video) {
            const wasPlaying = isPlaying;
            const currentVolume = volume;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = video;
                videoRef.current.volume = isMuted ? 0 : currentVolume / 100;
                const handleCanPlay = () => {
                    if (wasPlaying && videoRef.current) videoRef.current.play().catch((e: any) => console.error("Play failed:", e));
                    if (videoRef.current) videoRef.current.removeEventListener('canplay', handleCanPlay);
                };
                videoRef.current.addEventListener('canplay', handleCanPlay);
                videoRef.current.load();
            }
            setCurrentTime(0); setIsPlaying(false);
            leftPeakRef.current = 0; rightPeakRef.current = 0; leftHoldRef.current = 0; rightHoldRef.current = 0;
            leftHoldTimeRef.current = 0; rightHoldTimeRef.current = 0;
            updateVU();
        }
    }, [video]);

    useEffect(() => { if (videoRef.current) videoRef.current.volume = isMuted ? 0 : volume / 100; }, [volume, isMuted]);
    useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = playbackRate; }, [playbackRate]);
    useEffect(() => {
        if (audioContextRef.current) {
            if (bassFilterRef.current) bassFilterRef.current.gain.value = eqBands.bass;
            if (midFilterRef.current) midFilterRef.current.gain.value = eqBands.mid;
            if (trebleFilterRef.current) trebleFilterRef.current.gain.value = eqBands.treble;
        }
    }, [eqBands]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
        if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
        if (isPlaying && audioVisual) { if (!audioContextRef.current) setupAudioContext(); analyze(); }
        else if (!isPlaying && audioVisual) fadeOutVisualization();
    }, [isPlaying, audioVisual]);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (audioContextRef.current) audioContextRef.current.close().catch(e => console.warn("AudioContext cleanup error:", e));
        };
    }, []);

    const setupAudioContext = () => {
        if (!audioContextRef.current && videoRef.current) {
            try {
                const AudioContextClass: any = (window as any).AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    const ctx = new AudioContextClass(); audioContextRef.current = ctx;
                    const bassFilter = ctx.createBiquadFilter(); bassFilter.type = 'lowshelf'; bassFilter.frequency.value = 320; bassFilter.gain.value = eqBands.bass;
                    const midFilter = ctx.createBiquadFilter(); midFilter.type = 'peaking'; midFilter.frequency.value = 1000; midFilter.Q.value = 0.5; midFilter.gain.value = eqBands.mid;
                    const trebleFilter = ctx.createBiquadFilter(); trebleFilter.type = 'highshelf'; trebleFilter.frequency.value = 3200; trebleFilter.gain.value = eqBands.treble;
                    const analyser = ctx.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = 0.8;
                    const source = ctx.createMediaElementSource(videoRef.current);
                    source.connect(bassFilter); bassFilter.connect(midFilter); midFilter.connect(trebleFilter);
                    trebleFilter.connect(analyser); trebleFilter.connect(ctx.destination);
                    bassFilterRef.current = bassFilter; midFilterRef.current = midFilter; trebleFilterRef.current = trebleFilter;
                    analyserRef.current = analyser; sourceRef.current = source;
                }
            } catch (error) { console.error("Failed to setup audio context:", error); }
        }
    };

    const fadeOutVisualization = () => {
        if (isPlayingRef.current) return;
        leftPeakRef.current *= 0.7; rightPeakRef.current *= 0.7;
        const now = Date.now();
        if (now - leftHoldTimeRef.current > 1500) leftHoldRef.current *= 0.95;
        if (now - rightHoldTimeRef.current > 1500) rightHoldRef.current *= 0.95;
        updateVU();
        const maxPeak = Math.max(leftPeakRef.current, rightPeakRef.current);
        const maxHold = Math.max(leftHoldRef.current, rightHoldRef.current);
        if (maxPeak > 0.01 || maxHold > 0.01) {
            animationRef.current = requestAnimationFrame(fadeOutVisualization);
        } else {
            if (!isPlayingRef.current) { leftPeakRef.current = 0; rightPeakRef.current = 0; leftHoldRef.current = 0; rightHoldRef.current = 0; updateVU(); }
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const analyze = () => {
        if (!analyserRef.current || !isPlayingRef.current) return;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
        let avg = Math.pow(sum / bufferLength / 255, 0.5);
        leftPeakRef.current = leftPeakRef.current * 0.7 + avg * 0.3;
        rightPeakRef.current = rightPeakRef.current * 0.7 + avg * 0.3;
        const now = Date.now();
        if (leftPeakRef.current > leftHoldRef.current) { leftHoldRef.current = leftPeakRef.current; leftHoldTimeRef.current = now; }
        else if (now - leftHoldTimeRef.current > 1500) leftHoldRef.current *= 0.95;
        if (rightPeakRef.current > rightHoldRef.current) { rightHoldRef.current = rightPeakRef.current; rightHoldTimeRef.current = now; }
        else if (now - rightHoldTimeRef.current > 1500) rightHoldRef.current *= 0.95;
        updateVU();
        animationRef.current = requestAnimationFrame(analyze);
    };

    const updateVU = () => {
        if (!vuContainerRef.current || !audioVisual) return;
        const vuColor = audioVisual.color || '#00ff00';
        const peakColor = audioVisual.peak || '#ff0000';
        const leftHeight = leftPeakRef.current * 100;
        const rightHeight = rightPeakRef.current * 100;
        const leftPeakPos = 100 - (leftHoldRef.current * 100);
        const rightPeakPos = 100 - (rightHoldRef.current * 100);
        const isHorizontal = audioVisual.side === 'top' || audioVisual.side === 'bottom';
        //const textCls = isDark ? 'ecp-text-gray-100' : 'ecp-text-gray-900';

        if (isHorizontal) {
            vuContainerRef.current.innerHTML = `
                <div style="display:flex;flex-direction:column;gap:0.25rem;height:100%;justify-content:center;">
                    <div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
                        <div style="font-size:0.75rem;opacity:0.8;width:1rem;text-align:center;color:${isDark ? '#f3f4f6' : '#111827'}">L</div>
                        <div style="position:relative;flex:1;height:0.75rem;background:rgba(0,0,0,0.4);border-radius:9999px;overflow:hidden;display:flex;justify-content:flex-end;">
                            <div style="height:100%;border-radius:9999px 0 0 9999px;transition:width 75ms;width:${leftHeight}%;background:${vuColor};"></div>
                            ${leftHoldRef.current > 0.1 ? `<div style="position:absolute;top:0;width:0.25rem;height:100%;transition:right 100ms;right:${leftHoldRef.current * 100}%;background:${peakColor};"></div>` : ''}
                        </div>
                        <div style="width:1px;height:1rem;background:rgba(255,255,255,0.2)"></div>
                        <div style="position:relative;flex:1;height:0.75rem;background:rgba(0,0,0,0.4);border-radius:9999px;overflow:hidden;display:flex;justify-content:flex-start;">
                            <div style="height:100%;border-radius:0 9999px 9999px 0;transition:width 75ms;width:${rightHeight}%;background:${vuColor};"></div>
                            ${rightHoldRef.current > 0.1 ? `<div style="position:absolute;top:0;width:0.25rem;height:100%;transition:left 100ms;left:${rightHoldRef.current * 100}%;background:${peakColor};"></div>` : ''}
                        </div>
                        <div style="font-size:0.75rem;opacity:0.8;width:1rem;text-align:center;color:${isDark ? '#f3f4f6' : '#111827'}">R</div>
                    </div>
                </div>
            `;
        } else {
            vuContainerRef.current.innerHTML = `
                <div style="display:flex;gap:0.5rem;height:100%;">
                    <div style="flex:1;display:flex;flex-direction:column;">
                        <div style="font-size:0.75rem;color:white;opacity:0.7;text-align:center;margin-bottom:0.25rem;">L</div>
                        <div style="flex:1;position:relative;display:flex;flex-direction:column;justify-content:flex-end;background:rgba(0,0,0,0.3);border-radius:0.5rem;overflow:hidden;">
                            <div style="border-radius:0.25rem 0.25rem 0 0;transition:height 75ms;height:${leftHeight}%;background:${vuColor};">
                                ${leftHoldRef.current > 0.1 ? `<div style="position:absolute;width:100%;height:0.25rem;transition:top 100ms;top:${leftPeakPos}%;background:${peakColor};"></div>` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;">
                        <div style="font-size:0.75rem;color:white;opacity:0.7;text-align:center;margin-bottom:0.25rem;">R</div>
                        <div style="flex:1;position:relative;display:flex;flex-direction:column;justify-content:flex-end;background:rgba(0,0,0,0.3);border-radius:0.5rem;overflow:hidden;">
                            <div style="border-radius:0.25rem 0.25rem 0 0;transition:height 75ms;height:${rightHeight}%;background:${vuColor};">
                                ${rightHoldRef.current > 0.1 ? `<div style="position:absolute;width:100%;height:0.25rem;transition:top 100ms;top:${rightPeakPos}%;background:${peakColor};"></div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    const togglePlay = () => {
        if (!videoRef.current || !video) return;
        if (isPlaying) videoRef.current.pause();
        else {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
            videoRef.current.play().catch((e: any) => console.error("Play failed:", e));
        }
    };

    const stop = () => {
        if (!videoRef.current) return;
        videoRef.current.pause(); videoRef.current.currentTime = 0;
        setIsPlaying(false); setCurrentTime(0);
        leftPeakRef.current = 0; rightPeakRef.current = 0; leftHoldRef.current = 0; rightHoldRef.current = 0;
        updateVU();
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        const seekTime = (value / 100) * duration;
        setCurrentTime(seekTime);
        if (videoRef.current && !isSeeking) videoRef.current.currentTime = seekTime;
    };
    const handleSeekMouseDown = () => setIsSeeking(true);
    const handleSeekMouseUp = () => { if (videoRef.current) videoRef.current.currentTime = currentTime; setIsSeeking(false); };
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => { const v = parseInt(e.target.value); setVolume(v); setIsMuted(v === 0); };
    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPlaybackRate(parseFloat(e.target.value));
    const toggleMute = () => setIsMuted(!isMuted);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) containerRef.current.requestFullscreen().catch(e => console.error("Fullscreen failed:", e));
        else document.exitFullscreen();
    };

    const handleEqChange = (band: 'bass' | 'mid' | 'treble', value: number) => {
        setEqBands(prev => ({ ...prev, [band]: value }));
        if (audioContextRef.current) {
            if (band === "bass" && bassFilterRef.current) bassFilterRef.current.gain.value = value;
            if (band === "mid" && midFilterRef.current) midFilterRef.current.gain.value = value;
            if (band === "treble" && trebleFilterRef.current) trebleFilterRef.current.gain.value = value;
        }
    };
    const resetEqualizer = () => setEqBands({ bass: 0, mid: 0, treble: 0 });

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => { if (noControls && !isPlaying || autoPlay) togglePlay(); }, [controls]);

    if (error && error.length > 0) {
        return (
            <>
                {error.map((e, i) => (
                    <div key={i} className="ecp-video-error"><strong>{e[0]}:</strong> {e[1]}</div>
                ))}
            </>
        );
    }

    const vuPosition = audioVisual ? audioVisual.side : null;
    const isHorizontalVU = vuPosition === 'top' || vuPosition === 'bottom';
    const wrapperBg = !(noControls || transparent) ? (isDark ? '#49494937' : 'white') : undefined;
    const innerBg = !(noControls || transparent) ? (isDark ? '#1a1a1ab0' : '#f5f5f5') : undefined;

    return (
        <div
            ref={containerRef}
            className={`ecp-video-wrapper${isFullscreen ? ' ecp-video-wrapper--fullscreen' : ''}`}
            style={{ backgroundColor: wrapperBg }}
        >
            <div
                className={`ecp-video-inner${isFullscreen ? ' ecp-video-inner--fullscreen' : ''}${!(noControls || transparent) ? ' ecp-video-inner--padded' : ''}`}
                style={{ background: innerBg }}
            >
                {/* Video Name */}
                {controls.videoName && !isFullscreen && (
                    <div className={`ecp-video-name${isDark ? ' ecp-video-name--dark' : ' ecp-video-name--light'}`}>{name}</div>
                )}

                {/* Video + VU layout */}
                <div className={`ecp-video-layout${isHorizontalVU ? ' ecp-video-layout--col' : ' ecp-video-layout--row'}${isFullscreen ? ' ecp-video-layout--fullscreen' : ''}`}>
                    {audioVisual && vuPosition === 'top' && <div className="ecp-video-vu-top" ref={vuContainerRef} />}

                    <div style={{ display: 'flex', flex: !isHorizontalVU ? 1 : undefined, gap: '0.75rem' }}>
                        {audioVisual && vuPosition === 'left' && <div className="ecp-video-vu-side" ref={vuContainerRef} />}

                        {/* Video element */}
                        <div className={`ecp-video-el-wrap${isDark ? ' ecp-video-el-wrap--dark' : ' ecp-video-el-wrap--light'}`}>
                            <video ref={videoRef} className="ecp-video-el" poster={thumbnail || undefined}>
                                {video && <source src={video} />}
                                Your browser does not support the video tag.
                            </video>

                            {/* EQ Overlay */}
                            {showEqualizer && (
                                <div className="ecp-video-eq-overlay">
                                    <div className={`ecp-video-eq-panel${isDark ? ' ecp-video-eq-panel--dark' : ' ecp-video-eq-panel--light'}`}>
                                        <h3 className={`ecp-video-eq-title${isDark ? ' ecp-video-eq-title--dark' : ' ecp-video-eq-title--light'}`}>Equalizer</h3>
                                        <div className="ecp-video-eq-bands">
                                            {(['bass', 'mid', 'treble'] as const).map(band => (
                                                <div key={band}>
                                                    <div className="ecp-video-eq-band-header">
                                                        <span className={isDark ? 'ecp-video-eq-label--dark' : 'ecp-video-eq-label--light'}>{band.charAt(0).toUpperCase() + band.slice(1)}</span>
                                                        <span className={isDark ? 'ecp-video-eq-label--dark' : 'ecp-video-eq-label--light'}>{eqBands[band]} dB</span>
                                                    </div>
                                                    <div className="ecp-video-eq-range-row">
                                                        <span className={isDark ? 'ecp-video-eq-bound--dark' : 'ecp-video-eq-bound--light'}>-20</span>
                                                        <input
                                                            type="range" min="-20" max="20" value={eqBands[band]}
                                                            onChange={(e) => handleEqChange(band, parseInt(e.target.value))}
                                                            className="ecp-video-eq-slider"
                                                            style={{
                                                                background: `linear-gradient(to right, ${color} ${(eqBands[band] + 20) / 40 * 100}%, #e5e7eb ${(eqBands[band] + 20) / 40 * 100}%)`,
                                                                '--thumb-color': color
                                                            } as React.CSSProperties}
                                                        />
                                                        <span className={isDark ? 'ecp-video-eq-bound--dark' : 'ecp-video-eq-bound--light'}>+20</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="ecp-video-eq-footer">
                                            <button onClick={resetEqualizer} className={`ecp-video-eq-footer-btn${isDark ? ' ecp-video-eq-footer-btn--dark' : ' ecp-video-eq-footer-btn--light'}`}>Reset</button>
                                            <button onClick={() => setShowEqualizer(false)} className={`ecp-video-eq-footer-btn${isDark ? ' ecp-video-eq-footer-btn--dark' : ' ecp-video-eq-footer-btn--light'}`} style={{ marginLeft: '0.5rem' }}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {audioVisual && vuPosition === 'right' && <div className="ecp-video-vu-side" ref={vuContainerRef} />}
                    </div>

                    {audioVisual && vuPosition === 'bottom' && <div className="ecp-video-vu-bottom" ref={vuContainerRef} />}
                </div>

                {/* Seekbar */}
                {controls.seekbar && (
                    <div className={`ecp-video-seekbar${isFullscreen ? ' ecp-video-seekbar--fullscreen' : ''}`}>
                        <div className="ecp-video-seekbar-row">
                            <span className={`ecp-video-time${isDark ? ' ecp-video-time--dark' : ' ecp-video-time--light'}`}>{formatTime(currentTime)}</span>
                            <input
                                type="range" min="0" max="100"
                                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                                onChange={handleSeekChange}
                                onMouseDown={handleSeekMouseDown} onMouseUp={handleSeekMouseUp}
                                onTouchStart={handleSeekMouseDown} onTouchEnd={handleSeekMouseUp}
                                disabled={!video}
                                className="ecp-video-seek-input"
                                style={{
                                    background: video && duration > 0
                                        ? `linear-gradient(to right, ${color} ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`
                                        : '#e5e7eb',
                                    '--thumb-color': color
                                } as React.CSSProperties}
                            />
                            <span className={`ecp-video-time ecp-video-time--right${isDark ? ' ecp-video-time--dark' : ' ecp-video-time--light'}`}>{formatTime(duration)}</span>
                        </div>
                    </div>
                )}

                {/* Controls bar */}
                <div className="ecp-video-controls">
                    {controls.play && (
                        <button
                            onClick={togglePlay} disabled={!video}
                            className={`ecp-video-play-btn${containerWidth <= 400 ? ' ecp-video-play-btn--compact' : ''}`}
                            style={{ backgroundColor: color }}
                        >
                            <div className="ecp-video-play-icon-wrap">
                                <Pause size={16} style={{ position: 'absolute', transform: !isPlaying ? 'scale(0) translateY(2.5rem)' : undefined, transition: 'all 150ms' }} />
                                <Play size={16} style={{ position: 'absolute', transform: isPlaying ? 'scale(0) translateY(-2.5rem)' : undefined, transition: 'all 150ms' }} />
                            </div>
                            {containerWidth > 400 && (isPlaying ? 'Pause' : 'Play')}
                        </button>
                    )}

                    {controls.stop && (
                        <button onClick={stop} disabled={!video} className={`ecp-video-stop-btn${isDark ? ' ecp-video-stop-btn--dark' : ' ecp-video-stop-btn--light'}`}>
                            <Square size={16} />
                        </button>
                    )}

                    {controls.fullscreen && (
                        <button
                            onClick={toggleFullscreen}
                            className={`ecp-video-fullscreen-btn${isDark ? ' ecp-video-fullscreen-btn--dark' : ' ecp-video-fullscreen-btn--light'}${containerWidth >= 800 ? ' ecp-video-fullscreen-btn--wide' : ''}`}
                        >
                            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                            <span style={{ display: containerWidth < 800 ? 'none' : 'block' }}>{isFullscreen ? 'Exit' : 'Full'}</span>
                        </button>
                    )}

                    {controls.equalizer && (
                        <button
                            onClick={() => setShowEqualizer(!showEqualizer)} disabled={!video}
                            className={`ecp-video-eq-toggle-btn${showEqualizer ? ' ecp-video-eq-toggle-btn--on' : ' ecp-video-eq-toggle-btn--off'}${containerWidth >= 700 ? ' ecp-video-eq-toggle-btn--wide' : ''}`}
                            style={showEqualizer ? { backgroundColor: color } : {}}
                        >
                            <Sliders size={16} />
                            <span style={{ display: containerWidth < 700 ? 'none' : 'block' }}>EQ</span>
                        </button>
                    )}

                    {controls.speed && (
                        <div className="ecp-video-speed-wrap">
                            <select value={playbackRate} onChange={handleSpeedChange} className={`ecp-video-speed-select${isDark ? ' ecp-video-speed-select--dark' : ' ecp-video-speed-select--light'}`}>
                                {['0.5', '0.75', '1', '1.25', '1.5', '2'].map(v => (
                                    <option key={v} value={v} className={isDark ? 'ecp-video-speed-option--dark' : 'ecp-video-speed-option--light'}>{v}x</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {controls.volume && (
                        <div className="ecp-video-volume">
                            <button onClick={toggleMute} className="ecp-video-mute-btn">
                                {isMuted || volume === 0
                                    ? <VolumeX size={20} className={isDark ? 'ecp-video-mute-icon--dark' : 'ecp-video-mute-icon--light'} />
                                    : <Volume2 size={20} className={isDark ? 'ecp-video-mute-icon--dark' : 'ecp-video-mute-icon--light'} />
                                }
                            </button>
                            <input
                                type="range" min="0" max="100" value={volume}
                                onChange={handleVolumeChange}
                                className="ecp-video-vol-slider"
                                style={{
                                    background: `linear-gradient(to right, ${color} ${volume}%, #e5e7eb ${volume}%)`,
                                    '--thumb-color': color,
                                    display: containerWidth < 460 ? 'none' : 'block'
                                } as React.CSSProperties}
                            />
                            <span
                                className={`ecp-video-vol-pct${isDark ? ' ecp-video-vol-pct--dark' : ' ecp-video-vol-pct--light'}`}
                                style={{ display: containerWidth < 800 ? 'none' : 'block' }}
                            >{volume}%</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- DemoVisualizePlayer ---
function DemoVisualizePlayer() {
    const [audioFile, setAudioFile] = useState<string | null>(null);
    const [audioName, setAudioName] = useState<string>('No track loaded');
    const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('purple');
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [transparent, setTransparent] = useState(false);
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { const url = URL.createObjectURL(file); setAudioFile(url); setAudioName(file.name); }
    };

    const handleLoadAudio = () => fileInputRef.current?.click();

    return (
        <div className="ecp-page-wrapper" style={{ backgroundColor: mode === 'dark' ? '#222' : 'white' }}>
            <div className="ecp-demo-container">
                {showThemeSelector && (
                    <ThemeSelector theme={selectedTheme} setTheme={setSelectedTheme} close={() => setShowThemeSelector(false)} />
                )}

                <div className="ecp-container-glass">
                    <div className="ecp-demo-header">
                        <div>
                            <h1 className={`ecp-demo-title${mode === 'dark' ? ' ecp-demo-title--dark' : ''}`}>Audio Visualizer</h1>
                            <p className="ecp-demo-subtitle">Professional frequency analyzer</p>
                        </div>
                        <button onClick={() => setShowThemeSelector(!showThemeSelector)} className="ecp-theme-btn">
                            <span>🎨</span> Themes
                        </button>
                    </div>

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
                            play: true, pause: true, stop: true, seekbar: true,
                            volume: true, loop: true, trackName: true
                        }}
                    />
                    <WaveAudioPlayer
                        audio={audioFile || ''}
                        width={400}
                        thumbnail={'https://cdn-icons-png.flaticon.com/512/8316/8316619.png'}
                        autoPlay={false}
                        gradient={['#26ce3aff', '#39eed9ff']}
                        background={'#c0ffefff'}
                    />
                    <NanoAudioPlayer
                        audio={audioFile || ''}
                        thumbnail={'https://cdn-icons-png.flaticon.com/512/17524/17524837.png'}
                        autoPlay={false}
                        gradient={['#26ce3aff', '#39eed9ff']}
                        background={'#c0ffefff'}
                    />

                    <div className="ecp-demo-actions">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="ecp-file-input-hidden" />
                        <button onClick={handleLoadAudio} className="ecp-action-btn">
                            <Upload size={16} />
                            Load Audio
                        </button>
                        <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} className="ecp-action-btn">
                            {mode === 'dark' ? 'Light' : 'Dark'}
                        </button>
                        <button onClick={() => setTransparent(!transparent)} className="ecp-action-btn">
                            Transparent: {String(transparent)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, VideoPlayer, DemoVisualizePlayer };
