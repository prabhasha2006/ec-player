import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat } from 'lucide-react';

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
        peak: '#000000ff',
        button: '#ff9100ff',
        buttonHover: '#7c3aed',
        slider: '#d75cf6ff'
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
    theme = 'rainbow',
    volume: vol = 100,
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
    bands: _bands = null
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(vol || 100);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [error, setError] = useState('')

    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);
    const vuContainerRef = useRef(null);

    //check types
    if (_bands && (typeof _bands !== 'array')) {}

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

    let currentTheme
    if (typeof theme === 'string') { currentTheme = themes[theme] || themes.rainbow }
    if (typeof theme === 'object') { currentTheme = theme }
    const isDark = mode === 'dark'

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
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='rounded-xl overflow-hidden' style={{ backgroundColor: isDark ? '#606060ff' : 'white' }}>
            <div style={{ background: currentTheme.bg }} className='p-4'>
                {/* VU Meter */}
                <div className={`${isDark ? 'bg-black/30' : 'bg-white/70'} rounded-lg p-4 mb-6 shadow-sm border border-gray-100/30`}>
                    <div className="flex justify-center items-end gap-1 h-64" ref={vuContainerRef}></div>
                </div>

                {/* Track Name */}
                {controls.trackName && (
                    <div className="mb-6">
                        <div className={`${isDark ? 'text-gray-100' : 'text-gray-700'} font-medium truncate`}>{name}</div>
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
            `}</style>
            </div>
        </div>
    );
}

export { VisualizePlayer, ThemeSelector, themes };