import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat, Upload } from 'lucide-react';

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

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
        trackName: true
    },
    mode = 'light',
    bands: _bands = null,
    transparent = false,
    autoPlay = false
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(vol || 100);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [error, setError] = useState([])

    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);
    const vuContainerRef = useRef(null);

    // ✅ Comprehensive prop type checks
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
            const controlKeys = ['play', 'pause', 'stop', 'seekbar', 'volume', 'loop', 'trackName'];
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

        // ✅ Handle collected errors
        if (errors.length > 0) {
            setError(errors); // store the first error for UI
            console.group('%cVisualizePlayer: Prop validation failed', 'color:red');
            errors.forEach(e => console.error(`${e[0]}: ${e[1]}`));
            console.groupEnd();
        } else {
            setError([]);
        }

    }, [audio, name, theme, vol, controls, mode, _bands]);


    // Updated bands array - removed last two high frequencies and added two bass frequencies
    const bands = _bands || [
        { freq: 0 },   // New bass band
        { freq: 10 },   // New bass band
        { freq: 20 }, { freq: 25 }, { freq: 31.5 }, { freq: 40 }, { freq: 50 },
        { freq: 63 }, { freq: 80 }, { freq: 100 }, { freq: 125 }, { freq: 160 },
        { freq: 200 }, { freq: 250 }, { freq: 315 }, { freq: 400 }, { freq: 500 },
        { freq: 630 }, { freq: 800 }, { freq: 1000 }, { freq: 1250 }, { freq: 1600 },
        { freq: 2000 }, { freq: 2500 }, { freq: 3150 }, { freq: 4000 }, { freq: 5000 },
        { freq: 6300 }, { freq: 8000 }, { freq: 10000 }, { freq: 12500 }
        // Removed: { freq: 16000 }, { freq: 20000 }
    ];

    const bandPeaksRef = useRef(bands.map(() => 0));
    const peakHoldsRef = useRef(bands.map(() => 0));
    const peakHoldTimesRef = useRef(bands.map(() => 0));
    const themeRef = useRef(theme); // Track current theme

    let currentTheme = (typeof theme === 'string') ? (themes[theme] || themes.purple) : (typeof theme === 'object') ? theme : themes.purple
    const isDark = mode === 'dark'
    const noControls = (typeof controls === 'object' && Object.keys(controls).length === 0)

    // Update theme ref when theme changes
    useEffect(() => {
        themeRef.current = theme;
        updateVU(); // Update visualization with new theme
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
        if (audioRef.current && audio) {
            const wasPlaying = isPlaying;

            // Reset audio context when changing tracks
            if (audioContextRef.current) {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
                audioContextRef.current = null;
                analyserRef.current = null;
                sourceRef.current = null;
            }

            audioRef.current.pause();
            audioRef.current.src = audio;
            audioRef.current.load();

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

    // Start/stop visualization
    useEffect(() => {
        if (isPlaying && !animationRef.current) {
            if (!audioContextRef.current) {
                setupAudioContext();
            }
            analyze();
        } else if (!isPlaying && animationRef.current) {
            // Don't cancel animation immediately - let it fade out
            fadeOutVisualization();
        }
    }, [isPlaying]);

    const setupAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 8192;
                analyserRef.current.smoothingTimeConstant = 0.7;

                sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
                sourceRef.current.connect(analyserRef.current);
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

        // Handle peak decay - always decay peaks when paused
        const now = Date.now();
        peakHoldsRef.current = peakHoldsRef.current.map((peak, index) => {
            // If hold time has passed, start gradual decay
            if (now - peakHoldTimesRef.current[index] > 1500) {
                return peak * 0.95; // Gradual decay
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
            // Reset to zero and stop animation
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
                // Gradual decay after hold time
                peakHoldsRef.current[index] *= 0.95;
            }
        });

        updateVU();
        animationRef.current = requestAnimationFrame(analyze);
    };

    const updateVU = () => {
        if (!vuContainerRef.current) return;

        // Use the theme from the ref to ensure we have the latest theme
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

        // Reset visualization
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
    }

    useEffect(() => {
        if ((((typeof controls === 'object' && Object.keys(controls).length === 0) || !controls) && !isPlaying) || autoPlay) {
            togglePlay()
        }
    }, [controls])

    if (error && error.length > 0) {
        return (
            error.map(e => (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300">
                    <strong>{e[0]}:</strong> {e[1]}
                </div>
            ))
        )
    }

    return (
        <div className='rounded-xl overflow-hidden' style={{ backgroundColor: !(noControls || transparent) && (isDark ? '#606060ff' : 'white') }}>
            <div style={{ background: !(noControls || transparent) && currentTheme.bg }} className={!(noControls || transparent) && 'p-4'}>
                {/* VU Meter */}
                <div className={`${!(noControls || transparent) && (isDark ? 'bg-black/30' : 'bg-white/70')} rounded-lg ${!noControls && "mb-6"} ${!(noControls || transparent) && "p-4"} shadow-sm`}>
                    <div className="flex justify-center items-end gap-1 h-64" ref={vuContainerRef}></div>
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
                        <div className="flex items-center md:gap-3">
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
                <div className="flex flex-wrap items-center gap-3">
                    {controls.play && (
                        <button
                            onClick={togglePlay}
                            disabled={!audio}
                            className="px-4 py-2 md:w-24 rounded-full text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105"
                            style={{ backgroundColor: currentTheme.button }}
                        >
                            <div className="relative w-4 flex items-center">
                                <Pause size={16} className={`${!isPlaying ? 'scale-0 translate-y-10' : ''} transition-all absolute`} />
                                <Play size={16} className={`${isPlaying ? 'scale-0 -translate-y-10' : ''} transition-all absolute`} />
                            </div>
                            {isPlaying ? (
                                <>
                                    Pause
                                </>
                            ) : (
                                <>
                                    Play
                                </>
                            )}
                        </button>
                    )}

                    {controls.stop && (
                        <button
                            onClick={stop}
                            disabled={!audio}
                            className={`${isDark ? 'bg-gray-100 text-black' : 'bg-gray-700 text-white'} px-3 md:px-4 py-3 md:py-2 rounded-full text-sm font-medium ${isDark ? 'hover:bg-gray-300' : 'hover:bg-gray-800'} disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`}
                        >
                            <Square size={16} />
                            <span className="hidden md:block">Stop</span>
                        </button>
                    )}

                    {controls.loop && (
                        <button
                            onClick={toggleLoop}
                            disabled={!audio}
                            className={`px-3 md:px-4 py-3 md:py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${isLoop
                                ? 'text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                            style={isLoop ? { backgroundColor: currentTheme.button } : {}}
                        >
                            <Repeat size={16} className={`${isLoop ? 'rotate-180' : ''} transition-all`} />
                            <span className="hidden md:block">Loop</span>
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
                                    background: `linear-gradient(to right, ${currentTheme.slider} ${volume}%, ${currentTheme.slider + '30'} ${volume}%)`
                                }}
                            />
                            <span className={`hidden sm:block text-xs ${isDark ? 'text-gray-100' : 'text-gray-700'} font-mono w-10 text-right`}>{volume}%</span>
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
    width
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(80);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [waveformData, setWaveformData] = useState([]);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    const mode = 'light'

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
            return
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
        }

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        }
    }, [audioUrl, gradient, mode]);

    useEffect(() => {
        if (audioUrl && audioRef.current && autoPlay) {
            audioRef.current.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
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
        <div className="w-full max-w-lg" style={{ width: width+'px' }}>
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
                    </div>
                </div>
            </div>
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
                    <WaveAudioPlayer audio={audioFile} width={300} thumbnail={'https://cdn-icons-png.flaticon.com/512/8316/8316619.png'} autoPlay={false} gradient={['#26ce3aff', '#39eed9ff']} background={'#c0ffefff'} />
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

export { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, DemoVisualizePlayer };