import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat, Upload, Maximize, Minimize, Sliders } from 'lucide-react';

const themes = {
    rainbow: {
        name: 'Rainbow',
        bg: 'linear-gradient(135deg, #ff000043 0%, #ff7f0043 15%, #ffff0043 30%, #00ff0043 45%, #00ffff43 60%, #0000ff43 75%, #4b008243 85%, #9400d343 92%, #ff00ff43 100%)',
        bars: [
            '#ff0000', '#ff2000', '#ff4000', '#ff6000',
            '#ff7f00', '#ffaa00', '#ffd000', '#ffff00',
            '#aaff00', '#55ff00', '#00ff00', '#00ffaa',
            '#00ffff', '#00aaff', '#0055ff', '#0000ff',
            '#2b00b8', '#4b0082', '#6a00b8', '#9400d3',
            '#b000d3', '#d000ff', '#ff00ff'
        ],
        peak: '#000000',
        button: '#008cff',
        buttonHover: '#7c3aed',
        slider: '#d75cf6'
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
        bg: 'linear-gradient(135deg, #667eea43 0%, #764ba243 100%)',
        bars: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
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

function ThemeSelector({ theme, setTheme, close }) {
    const themeOptions = Object.keys(themes).map(key => ({
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
        equalizer: true
    },
    mode = 'light',
    bands: _bands = null,
    transparent = false,
    autoPlay = false,
    equalizer = {
        bass: 0,
        mid: 0,
        treble: 0
    }
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(vol || 100);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [error, setError] = useState([]);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [eqBands, setEqBands] = useState({
        bass: equalizer.bass || 0,
        mid: equalizer.mid || 0,
        treble: equalizer.treble || 0
    })
    const [containerWidth, setContainerWidth] = useState(0)

    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const bassFilterRef = useRef(null);
    const midFilterRef = useRef(null);
    const trebleFilterRef = useRef(null);
    const animationRef = useRef(null);
    const vuContainerRef = useRef(null);
    const containerRef = useRef(null)

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
            const controlKeys = ['play', 'pause', 'stop', 'seekbar', 'volume', 'loop', 'trackName', 'equalizer'];
            controlKeys.forEach(key => {
                if (key in controls && typeof controls[key] !== 'boolean') {
                    errors.push(['TypeError', `controls.${key} must be a boolean`]);
                }
            });
        }

        // 6. mode: must be 'dark' or 'light'
        if (mode && mode !== 'dark' && mode !== 'light') {
            errors.push(['ModeError', "mode must be either 'dark' or 'light'"]);
        }

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

    const bandPeaksRef = useRef(bands.map(() => 0));
    const peakHoldsRef = useRef(bands.map(() => 0));
    const peakHoldTimesRef = useRef(bands.map(() => 0));
    const themeRef = useRef(theme);

    let currentTheme = (typeof theme === 'string') ? (themes[theme] || themes.purple) : (typeof theme === 'object') ? theme : themes.purple;
    const isDark = mode === 'dark';
    const noControls = (typeof controls === 'object' && Object.keys(controls).length === 0);

    // Update theme ref when theme changes
    useEffect(() => {
        themeRef.current = theme;
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
            audioRef.current.src = audio;
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
        if (isPlaying && !animationRef.current) {
            if (!audioContextRef.current) {
                setupAudioContext();
            }
            analyze();
        } else if (!isPlaying && animationRef.current) {
            fadeOutVisualization();
        }
    }, [isPlaying]);

    const setupAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();

                // Create filters
                bassFilterRef.current = audioContextRef.current.createBiquadFilter();
                bassFilterRef.current.type = 'lowshelf';
                bassFilterRef.current.frequency.value = 320;
                bassFilterRef.current.gain.value = eqBands.bass;

                midFilterRef.current = audioContextRef.current.createBiquadFilter();
                midFilterRef.current.type = 'peaking';
                midFilterRef.current.frequency.value = 1000;
                midFilterRef.current.Q.value = 0.5;
                midFilterRef.current.gain.value = eqBands.mid;

                trebleFilterRef.current = audioContextRef.current.createBiquadFilter();
                trebleFilterRef.current.type = 'highshelf';
                trebleFilterRef.current.frequency.value = 3200;
                trebleFilterRef.current.gain.value = eqBands.treble;

                // Create analyser
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 8192;
                analyserRef.current.smoothingTimeConstant = 0.7;

                // Create source
                sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);

                // Connect nodes: source -> filters -> analyser -> destination
                sourceRef.current.connect(bassFilterRef.current);
                bassFilterRef.current.connect(midFilterRef.current);
                midFilterRef.current.connect(trebleFilterRef.current);
                trebleFilterRef.current.connect(analyserRef.current);
                analyserRef.current.connect(audioContextRef.current.destination);
            } catch (error) {
                console.error("Failed to setup audio context:", error);
            }
        }
    };

    const getFrequencyIndex = (frequency) => {
        if (!audioContextRef.current || !analyserRef.current) return 0;
        const nyquist = audioContextRef.current.sampleRate / 2;
        const index = Math.round(frequency / nyquist * analyserRef.current.frequencyBinCount);
        return Math.min(index, analyserRef.current.frequencyBinCount - 1);
    };

    const fadeOutVisualization = () => {
        if (!animationRef.current) return;

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
            bandPeaksRef.current = bands.map(() => 0);
            peakHoldsRef.current = bands.map(() => 0);
            peakHoldTimesRef.current = bands.map(() => 0);
            updateVU();
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const analyze = () => {
        if (!analyserRef.current || !isPlaying) return;

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
        bands.forEach((band, index) => {
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

    const handleSeekChange = (e) => {
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

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleLoop = () => {
        setIsLoop(!isLoop);
    };

    const handleEqChange = (band, value) => {
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

    const formatTime = (time) => {
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
        <div ref={containerRef} className='rounded-xl overflow-hidden' style={{ backgroundColor: !(noControls || transparent) && (isDark ? '#606060ff' : 'white') }}>
            <div style={{ background: !(noControls || transparent) && currentTheme.bg }} className={!(noControls || transparent) && 'p-4'}>
                {/* VU Meter */}
                <div className='relative'>
                    <div className={`${transparent && showEqualizer && 'opacity-30'} ${!(noControls || transparent) && (isDark ? 'bg-black/40' : 'bg-white/70')} rounded-lg ${!noControls && "mb-6"} ${!(noControls || transparent) && "p-4"} shadow-sm`}>
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
                                            className="flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
                                            className="flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
                                            className="flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
                                <img src={thumbnail} alt="" className={`${isPlaying && 'animation-spin'} h-12 w-12 rounded-full`} />
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

                <style jsx>{`
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
    gradient = ['#cd7eff', '#fe59f6'],
    background = '#2f1f3aff',
    autoPlay = false,
    thumbnail = null,
    width,
    equalizer = {
        bass: 0,
        mid: 0,
        treble: 0
    }
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(80);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [waveformData, setWaveformData] = useState([]);
    const [error, setError] = useState(null);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [eqBands, setEqBands] = useState({
        bass: equalizer.bass || 0,
        mid: equalizer.mid || 0,
        treble: equalizer.treble || 0
    })
    const audioRef = useRef(null);
    const audioCtxRef = useRef(null);
    const sourceRef = useRef(null);
    const bassFilterRef = useRef(null);
    const midFilterRef = useRef(null);
    const trebleFilterRef = useRef(null);
    const mode = 'light';

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

        if (mode !== 'dark' && mode !== 'light') {
            setError("Mode must be either 'dark' or 'light'");
            return;
        }

        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            // Generate waveform when audio is loaded
            setWaveformData(generateWaveformData());
        };
        const handleEnded = () => setIsPlaying(false);
        const handleError = (e) => {
            setError(`Audio error: ${e.message || 'Failed to load audio'}`);
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
            audioRef.current.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
        }
    }, [audioUrl]);

    useEffect(() => {
        if (!audioRef.current) return;

        // Only create AudioContext if not already created
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);

            // Filters
            bassFilterRef.current = audioCtxRef.current.createBiquadFilter();
            bassFilterRef.current.type = "lowshelf";
            bassFilterRef.current.frequency.value = 200;

            midFilterRef.current = audioCtxRef.current.createBiquadFilter();
            midFilterRef.current.type = "peaking";
            midFilterRef.current.frequency.value = 1000;
            midFilterRef.current.Q.value = 1;

            trebleFilterRef.current = audioCtxRef.current.createBiquadFilter();
            trebleFilterRef.current.type = "highshelf";
            trebleFilterRef.current.frequency.value = 3000;

            // Connect
            sourceRef.current
                .connect(bassFilterRef.current)
                .connect(midFilterRef.current)
                .connect(trebleFilterRef.current)
                .connect(audioCtxRef.current.destination);
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
                    setError(`Playback failed: ${e.message}`);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseInt(e.target.value));
        if (isMuted && parseInt(e.target.value) > 0) {
            setIsMuted(false);
        }
    };

    const handleSpeedChange = (e) => {
        setPlaybackRate(parseFloat(e.target.value));
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * duration;

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleEqChange = (band, value) => {
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

    const formatTime = (time) => {
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
    const secondaryTextColor = mode === 'dark' ? 'text-gray-500' : 'text-gray-400';

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
                                className={`${!width && 'hidden sm:block'} w-20 h-1.5 rounded-lg appearance-none cursor-pointer`}
                                style={{
                                    background: `linear-gradient(to right, ${gradient[0]} ${volume}%, ${mode === 'dark' ? '#374151' : '#d1d5db'} ${volume}%)`,
                                    display: (width && width < 400) && 'none'
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
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 rounded-2xl p-4">
                    <div className={`max-w-xs w-full p-6 rounded-xl ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-4 ${mode === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Equalizer</h3>

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
                                        className="flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
                                        className="flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
                                        className="flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer"
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
        </div>
    );
}

function NanoAudioPlayer({ audio: audioUrl, thumbnail, gradient: colors = ['#cd7eff', '#fe59f6'], background = '#1f273a', autoPlay = false }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    useEffect(() => {
        if (audioUrl && audioRef.current && autoPlay) {
            audioRef.current.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
        }
    }, [audioUrl]);

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

    if (!audioUrl) return null;

    // gradient CSS for button
    const buttonGradient = {
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
    }

    return (
        <div style={{ backgroundColor: background }} className={`inline-flex flex-col ${thumbnail ? 'rounded-2xl' : 'rounded-full'} px-3 py-2 shadow-lg`}>
            <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
            />
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
                            className="rounded-full transition-all duration-200"
                            style={{
                                width: '100%',
                                background: `linear-gradient(to top, ${colors[0]}, ${colors[1]})`,
                                height: isPlaying
                                    ? `${8 + Math.sin((currentTime * 8 + i) * 0.6) * 10}px`
                                    : '8px',
                                opacity: isPlaying ? 0.6 + (Math.abs(i - 6) / 12) * 0.6 : 0.3
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Video

function VideoPlayer({
    video,
    name = 'No video loaded',
    audioVisual = null, // { side: 'left'|'right'|'top'|'bottom', color: '#00ff00', peak: '#ff0000' }
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
        equalizer: true
    },
    mode = 'light',
    transparent = false,
    autoPlay = false,
    equalizer = {
        bass: 0,
        mid: 0,
        treble: 0
    }
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(vol || 100);
    const [isMuted, setIsMuted] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [error, setError] = useState([]);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [eqBands, setEqBands] = useState({
        bass: equalizer.bass || 0,
        mid: equalizer.mid || 0,
        treble: equalizer.treble || 0
    });
    const [containerWidth, setContainerWidth] = useState(0);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const bassFilterRef = useRef(null);
    const midFilterRef = useRef(null);
    const trebleFilterRef = useRef(null);
    const animationRef = useRef(null);
    const vuContainerRef = useRef(null);

    // Audio visualization data for L and R channels
    const leftPeakRef = useRef(0);
    const rightPeakRef = useRef(0);
    const leftHoldRef = useRef(0);
    const rightHoldRef = useRef(0);
    const leftHoldTimeRef = useRef(0);
    const rightHoldTimeRef = useRef(0);

    const isDark = mode === 'dark';
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

            // Update video source
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = video;
                videoRef.current.volume = isMuted ? 0 : currentVolume / 100;

                // Add event listener for when video is ready to play
                const handleCanPlay = () => {
                    if (wasPlaying) {
                        videoRef.current.play().catch(e => console.error("Play failed:", e));
                    }
                    videoRef.current.removeEventListener('canplay', handleCanPlay);
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
        if (isPlaying && audioVisual && !animationRef.current) {
            if (!audioContextRef.current) {
                setupAudioContext();
            }
            analyze();
        } else if (!isPlaying && animationRef.current) {
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

    const setupAudioContext = () => {
        if (!audioContextRef.current && videoRef.current) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
                
                // Create filters
                bassFilterRef.current = audioContextRef.current.createBiquadFilter();
                bassFilterRef.current.type = 'lowshelf';
                bassFilterRef.current.frequency.value = 320;
                bassFilterRef.current.gain.value = eqBands.bass;

                midFilterRef.current = audioContextRef.current.createBiquadFilter();
                midFilterRef.current.type = 'peaking';
                midFilterRef.current.frequency.value = 1000;
                midFilterRef.current.Q.value = 0.5;
                midFilterRef.current.gain.value = eqBands.mid;

                trebleFilterRef.current = audioContextRef.current.createBiquadFilter();
                trebleFilterRef.current.type = 'highshelf';
                trebleFilterRef.current.frequency.value = 3200;
                trebleFilterRef.current.gain.value = eqBands.treble;

                // Create analyser for visualization
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;
                analyserRef.current.smoothingTimeConstant = 0.8;

                // Create source
                sourceRef.current = audioContextRef.current.createMediaElementSource(videoRef.current);
                
                // Connect the filters in series and then to the destination
                sourceRef.current.connect(bassFilterRef.current);
                bassFilterRef.current.connect(midFilterRef.current);
                midFilterRef.current.connect(trebleFilterRef.current);
                
                // Connect the last filter to both the analyser (for visualization) and the destination
                trebleFilterRef.current.connect(analyserRef.current);
                trebleFilterRef.current.connect(audioContextRef.current.destination);
            } catch (error) {
                console.error("Failed to setup audio context:", error);
            }
        }
    };

    const fadeOutVisualization = () => {
        if (!animationRef.current) return;

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
            leftPeakRef.current = 0;
            rightPeakRef.current = 0;
            leftHoldRef.current = 0;
            rightHoldRef.current = 0;
            updateVU();
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const analyze = () => {
        if (!analyserRef.current || !isPlaying) return;

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
                <div class="flex gap-2 h-full">
                    <div class="flex-1 flex flex-col gap-1">
                        <div class="text-xs text-white opacity-70 text-center">L</div>
                        <div class="flex-1 flex items-center">
                            <div class="relative w-full h-4 bg-black/30 rounded-full overflow-hidden">
                                <div class="absolute left-0 top-0 h-full rounded-full transition-all duration-75" style="width: ${leftHeight}%; background: ${color};"></div>
                                ${leftHoldRef.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="left: ${leftHoldRef.current * 100}%; background: ${peakColor};"></div>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col gap-1">
                        <div class="text-xs text-white opacity-70 text-center">R</div>
                        <div class="flex-1 flex items-center">
                            <div class="relative w-full h-4 bg-black/30 rounded-full overflow-hidden">
                                <div class="absolute left-0 top-0 h-full rounded-full transition-all duration-75" style="width: ${rightHeight}%; background: ${color};"></div>
                                ${rightHoldRef.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="left: ${rightHoldRef.current * 100}%; background: ${peakColor};"></div>` : ''}
                            </div>
                        </div>
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
            videoRef.current.play().catch(e => console.error("Play failed:", e));
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

    const handleSeekChange = (e) => {
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

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
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

    const handleEqChange = (band, value) => {
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

    const formatTime = (time) => {
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
            className='rounded-xl overflow-hidden'
            style={{ backgroundColor: !(noControls || transparent) && (isDark ? '#606060ff' : 'white') }}
        >
            <div style={{ background: !(noControls || transparent) && (isDark ? '#1a1a1a' : '#f5f5f5') }} className={!(noControls || transparent) && 'p-4'}>
                {/* Video Name */}
                {controls.videoName && (
                    <div className="mb-4">
                        <div className={`${isDark ? 'text-gray-100' : 'text-gray-700'} font-medium`}>{name}</div>
                    </div>
                )}

                {/* Video Container with VU Meters */}
                <div className={`relative ${isHorizontalVU ? 'flex flex-col gap-3' : 'flex gap-3'} mb-4`}>
                    {/* VU Meter - Top */}
                    {audioVisual && vuPosition === 'top' && (
                        <div className="w-full h-16 bg-black/50 rounded-lg p-2" ref={vuContainerRef}></div>
                    )}

                    <div className={`flex ${!isHorizontalVU && 'flex-1'} gap-3`}>
                        {/* VU Meter - Left */}
                        {audioVisual && vuPosition === 'left' && (
                            <div className="w-12 bg-black/50 rounded-lg p-1" ref={vuContainerRef}></div>
                        )}

                        {/* Video Element */}
                        <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                poster={thumbnail}
                            >
                                {video && <source src={video} />}
                                Your browser does not support the video tag.
                            </video>

                            {/* Equalizer Overlay */}
                            {showEqualizer && (
                                <div className={`absolute inset-0 flex flex-col w-full justify-center z-10 ${isDark ? 'bg-black/80' : 'bg-white/80'} rounded-lg p-4 shadow-sm transition-all duration-300`}>
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
                                                    className="flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, #3b82f6 ${(eqBands.bass + 20) / 40 * 100}%, #e5e7eb ${(eqBands.bass + 20) / 40 * 100}%)`
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
                                                    className="flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, #3b82f6 ${(eqBands.mid + 20) / 40 * 100}%, #e5e7eb ${(eqBands.mid + 20) / 40 * 100}%)`
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
                                                    className="flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, #3b82f6 ${(eqBands.treble + 20) / 40 * 100}%, #e5e7eb ${(eqBands.treble + 20) / 40 * 100}%)`
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
                                        <button
                                            onClick={() => setShowEqualizer(false)}
                                            className={`ml-2 px-3 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                                        >
                                            Close
                                        </button>
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
                        <div className="w-full h-16 bg-black/50 rounded-lg p-2" ref={vuContainerRef}></div>
                    )}
                </div>

                {/* Seekbar */}
                {controls.seekbar && (
                    <div className="mb-4">
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
                                        ? `linear-gradient(to right, #3b82f6 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`
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
                            className={`${!(containerWidth > 400) ? 'px-3 py-5' : ' px-4 py-2'} rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`}
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
                            style={showEqualizer ? { backgroundColor: '#3b82f6' } : {}}
                        >
                            <Sliders size={16} />
                            <span style={{ display: containerWidth < 700 ? 'none' : 'block' }}>EQ</span>
                        </button>
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
                                    background: `linear-gradient(to right, #3b82f6 ${volume}%, #e5e7eb ${volume}%)`,
                                    display: containerWidth < 460 ? 'none' : 'block'
                                }}
                            />
                            <span style={{ display: containerWidth < 800 ? 'none' : 'block' }} className={`text-xs ${isDark ? 'text-gray-100' : 'text-gray-700'} font-mono w-10 text-right`}>{volume}%</span>
                        </div>
                    )}
                </div>

                <style jsx>{`
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #3b82f6;
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    }
                    
                    input[type="range"]::-moz-range-thumb {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #3b82f6;
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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
    const [audioFile, setAudioFile] = useState(null);
    const [audioName, setAudioName] = useState('No track loaded');
    const [selectedTheme, setSelectedTheme] = useState('purple');
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [transparent, setTransparent] = useState(false)
    const [mode, setMode] = useState('light')
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioFile(url);
            setAudioName(file.name);
        }
    };

    const handleLoadAudio = () => {
        fileInputRef.current.click();
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: mode === 'dark' ? '#222' : 'white' }}>
            <div className="w-full h-full md:h-auto md:max-w-4xl">
                {/* Theme Selector - Initially Hidden */}
                {showThemeSelector && (
                    <ThemeSelector theme={selectedTheme} setTheme={setSelectedTheme} close={() => setShowThemeSelector(false)} />
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
                        audio={audioFile}
                        name={audioName}
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
                    <WaveAudioPlayer audio={audioFile} width={400} thumbnail={'https://cdn-icons-png.flaticon.com/512/8316/8316619.png'} autoPlay={false} gradient={['#26ce3aff', '#39eed9ff']} background={'#c0ffefff'} />
                    <NanoAudioPlayer audio={audioFile} thumbnail={'https://cdn-icons-png.flaticon.com/512/17524/17524837.png'} autoPlay={false} gradient={['#26ce3aff', '#39eed9ff']} background={'#c0ffefff'} />

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