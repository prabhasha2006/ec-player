import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat, Upload, Maximize, Minimize, ChevronDown, ChevronUp, Copy, Check, Settings } from 'lucide-react';
import { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, VideoPlayer, DemoVisualizePlayer } from './Player';

export default function MediaPlayerDocs() {
    const [activeTab, setActiveTab] = useState('visualize');
    const [activeExample, setActiveExample] = useState('basic');
    const [audioFile, setAudioFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    
    // Customization states for VisualizePlayer
    const [vizTheme, setVizTheme] = useState('rainbow');
    const [vizMode, setVizMode] = useState('light');
    const [vizVolume, setVizVolume] = useState(70);
    const [vizTransparent, setVizTransparent] = useState(false);
    const [vizShowTrackName, setVizShowTrackName] = useState(true);
    const [vizShowSeekbar, setVizShowSeekbar] = useState(true);
    const [vizShowVolume, setVizShowVolume] = useState(true);
    const [vizShowLoop, setVizShowLoop] = useState(true);
    const [vizShowStop, setVizShowStop] = useState(true);
    
    // Customization states for WaveAudioPlayer
    const [waveGradient1, setWaveGradient1] = useState('#cd7eff');
    const [waveGradient2, setWaveGradient2] = useState('#fe59f6');
    const [waveBackground, setWaveBackground] = useState('#2f1f3a');
    const [waveWidth, setWaveWidth] = useState(400);
    
    // Customization states for NanoAudioPlayer
    const [nanoGradient1, setNanoGradient1] = useState('#cd7eff');
    const [nanoGradient2, setNanoGradient2] = useState('#fe59f6');
    const [nanoBackground, setNanoBackground] = useState('#1f273a');
    const [nanoShowThumbnail, setNanoShowThumbnail] = useState(true);
    
    // Customization states for VideoPlayer
    const [videoMode, setVideoMode] = useState('light');
    const [videoVolume, setVideoVolume] = useState(70);
    const [videoShowAudioVisual, setVideoShowAudioVisual] = useState(true);
    const [videoVuSide, setVideoVuSide] = useState('left');
    const [videoVuColor, setVideoVuColor] = useState('#00ff00');
    const [videoVuPeak, setVideoVuPeak] = useState('#ff0000');
    
    const [expandedSection, setExpandedSection] = useState('customize');
    
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioFile(url);
        }
    };

    const handleVideoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoFile(url);
        }
    };

    const copyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const themes = ['rainbow', 'ocean', 'sunset', 'forest', 'midnight', 'neon', 'purple', 'amber', 'rose'];

    const getExampleCode = () => {
        if (activeTab === 'visualize') {
            if (activeExample === 'basic') {
                return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    author="Artist Name"
/>`;
            } else if (activeExample === 'themed') {
                return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    theme="${vizTheme}"
    mode="${vizMode}"
/>`;
            } else if (activeExample === 'controls') {
                return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    controls={{
        play: true,
        pause: true,
        stop: ${vizShowStop},
        seekbar: ${vizShowSeekbar},
        volume: ${vizShowVolume},
        loop: ${vizShowLoop},
        trackName: ${vizShowTrackName}
    }}
/>`;
            } else {
                return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    author="Artist Name"
    theme="${vizTheme}"
    mode="${vizMode}"
    volume={${vizVolume}}
    transparent={${vizTransparent}}
    thumbnail="path/to/image.jpg"
    autoPlay={false}
/>`;
            }
        } else if (activeTab === 'wave') {
            if (activeExample === 'basic') {
                return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
/>`;
            } else if (activeExample === 'custom') {
                return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    gradient={['${waveGradient1}', '${waveGradient2}']}
    background="${waveBackground}"
/>`;
            } else if (activeExample === 'sized') {
                return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    width={${waveWidth}}
    thumbnail="path/to/image.jpg"
/>`;
            } else {
                return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    autoPlay={true}
    gradient={['${waveGradient1}', '${waveGradient2}']}
    background="${waveBackground}"
/>`;
            }
        } else if (activeTab === 'nano') {
            if (activeExample === 'basic') {
                return `<NanoAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
/>`;
            } else if (activeExample === 'styled') {
                return `<NanoAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    gradient={['${nanoGradient1}', '${nanoGradient2}']}
    background="${nanoBackground}"
/>`;
            } else {
                return `<NanoAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    thumbnail="path/to/image.jpg"
    gradient={['${nanoGradient1}', '${nanoGradient2}']}
    background="${nanoBackground}"
/>`;
            }
        } else {
            if (activeExample === 'basic') {
                return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="Video Name"
/>`;
            } else if (activeExample === 'vuMeter') {
                return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="Video Name"
    audioVisual={{
        side: '${videoVuSide}',
        color: '${videoVuColor}',
        peak: '${videoVuPeak}'
    }}
/>`;
            } else if (activeExample === 'controls') {
                return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="Video Name"
    mode="${videoMode}"
    volume={${videoVolume}}
/>`;
            } else {
                return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="Video Name"
    mode="${videoMode}"
    volume={${videoVolume}}
    audioVisual={{
        side: '${videoVuSide}',
        color: '${videoVuColor}',
        peak: '${videoVuPeak}'
    }}
/>`;
            }
        }
    };

    const examples = {
        visualize: ['basic', 'themed', 'controls', 'advanced'],
        wave: ['basic', 'custom', 'sized', 'autoplay'],
        nano: ['basic', 'styled', 'thumbnail'],
        video: ['basic', 'vuMeter', 'controls', 'full']
    };

    const exampleTitles = {
        basic: 'Basic Usage',
        themed: 'Custom Theme',
        controls: 'Custom Controls',
        advanced: 'Advanced',
        custom: 'Custom Colors',
        sized: 'Custom Size',
        autoplay: 'Auto Play',
        styled: 'Custom Style',
        thumbnail: 'With Thumbnail',
        vuMeter: 'With VU Meters',
        full: 'Full Configuration'
    };

    const propDocs = {
        visualize: [
            { prop: 'audio', type: 'string', default: 'null', description: 'URL or path to audio file' },
            { prop: 'name', type: 'string', default: '"No track loaded"', description: 'Track name to display' },
            { prop: 'author', type: 'string', default: 'undefined', description: 'Artist/author name' },
            { prop: 'theme', type: 'string | object', default: '"rainbow"', description: 'Color theme (rainbow, ocean, sunset, etc.)' },
            { prop: 'volume', type: 'number', default: '100', description: 'Initial volume (0-100)' },
            { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
            { prop: 'mode', type: 'string', default: '"light"', description: '"light" or "dark"' },
            { prop: 'transparent', type: 'boolean', default: 'false', description: 'Remove background' },
            { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' },
            { prop: 'controls', type: 'object', default: '{...}', description: 'Configure which controls to show' },
            { prop: 'bands', type: 'array', default: 'null', description: 'Custom frequency bands array' }
        ],
        wave: [
            { prop: 'audio', type: 'string', default: 'null', description: 'URL or path to audio file' },
            { prop: 'gradient', type: 'array', default: "['#cd7eff', '#fe59f6']", description: 'Two-color gradient array' },
            { prop: 'background', type: 'string', default: '"#2f1f3a"', description: 'Background color' },
            { prop: 'width', type: 'number', default: 'undefined', description: 'Player width in pixels' },
            { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
            { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' }
        ],
        nano: [
            { prop: 'audio', type: 'string', default: 'null', description: 'URL or path to audio file' },
            { prop: 'gradient', type: 'array', default: "['#cd7eff', '#fe59f6']", description: 'Two-color gradient array' },
            { prop: 'background', type: 'string', default: '"#1f273a"', description: 'Background color' },
            { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
            { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' }
        ],
        video: [
            { prop: 'video', type: 'string', default: 'null', description: 'URL or path to video file' },
            { prop: 'name', type: 'string', default: '"No video loaded"', description: 'Video name to display' },
            { prop: 'volume', type: 'number', default: '100', description: 'Initial volume (0-100)' },
            { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to poster image' },
            { prop: 'mode', type: 'string', default: '"light"', description: '"light" or "dark"' },
            { prop: 'transparent', type: 'boolean', default: 'false', description: 'Remove background' },
            { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' },
            { prop: 'controls', type: 'object', default: '{...}', description: 'Configure which controls to show' },
            { prop: 'audioVisual', type: 'object', default: 'null', description: 'VU meter configuration {side, color, peak}' }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Media Player Components
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Professional audio and video players with visualization
                    </p>
                </div>

                {/* Component Tabs */}
                <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
                    <div className="flex flex-wrap border-b">
                        {[
                            { id: 'visualize', label: 'VisualizePlayer', icon: '🎵' },
                            { id: 'wave', label: 'WaveAudioPlayer', icon: '🌊' },
                            { id: 'nano', label: 'NanoAudioPlayer', icon: '⚡' },
                            { id: 'video', label: 'VideoPlayer', icon: '🎬' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setActiveExample('basic');
                                }}
                                className={`flex-1 min-w-fit px-6 py-4 font-medium transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.icon}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {/* Example Selector */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Examples</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {examples[activeTab].map(key => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveExample(key)}
                                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                                            activeExample === key
                                                ? 'bg-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {exampleTitles[key]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Code Example */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                                        {exampleTitles[activeExample]}
                                    </h4>
                                </div>
                                <button
                                    onClick={() => copyCode(getExampleCode(), activeExample)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                                >
                                    {copiedCode === activeExample ? (
                                        <>
                                            <Check size={16} className="text-green-600" />
                                            <span className="text-sm font-medium text-green-600">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={16} className="text-gray-600" />
                                            <span className="text-sm font-medium text-gray-600">Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{getExampleCode()}</code>
                            </pre>
                        </div>

                        {/* Live Preview & Customization */}
                        <div className="bg-white border-2 border-purple-200 rounded-lg overflow-hidden mb-8">
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                                className="w-full flex justify-between items-center p-4 hover:bg-purple-50 transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <Settings size={20} className="text-purple-600" />
                                    <span className="font-semibold text-gray-800">Live Preview & Customize</span>
                                </div>
                                {expandedSection === 'customize' ? (
                                    <ChevronUp className="text-gray-600" />
                                ) : (
                                    <ChevronDown className="text-gray-600" />
                                )}
                            </button>
                            
                            {expandedSection === 'customize' && (
                                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-t">
                                    {/* VisualizePlayer */}
                                    {activeTab === 'visualize' && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-gray-800">Settings</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                                    <select
                                                        value={vizTheme}
                                                        onChange={(e) => setVizTheme(e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    >
                                                        {themes.map(t => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setVizMode('light')}
                                                            className={`flex-1 px-4 py-2 rounded-lg ${vizMode === 'light' ? 'bg-purple-600 text-white' : 'bg-white border'}`}
                                                        >
                                                            Light
                                                        </button>
                                                        <button
                                                            onClick={() => setVizMode('dark')}
                                                            className={`flex-1 px-4 py-2 rounded-lg ${vizMode === 'dark' ? 'bg-purple-600 text-white' : 'bg-white border'}`}
                                                        >
                                                            Dark
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Volume: {vizVolume}%
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={vizVolume}
                                                        onChange={(e) => setVizVolume(parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    {[
                                                        ['vizTransparent', vizTransparent, setVizTransparent, 'Transparent'],
                                                        ['vizShowTrackName', vizShowTrackName, setVizShowTrackName, 'Show Track Name'],
                                                        ['vizShowSeekbar', vizShowSeekbar, setVizShowSeekbar, 'Show Seekbar'],
                                                        ['vizShowVolume', vizShowVolume, setVizShowVolume, 'Show Volume'],
                                                        ['vizShowLoop', vizShowLoop, setVizShowLoop, 'Show Loop'],
                                                        ['vizShowStop', vizShowStop, setVizShowStop, 'Show Stop']
                                                    ].map(([key, value, setter, label]) => (
                                                        <label key={key} className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={value}
                                                                onChange={(e) => setter(e.target.checked)}
                                                                className="w-4 h-4"
                                                            />
                                                            <span className="text-sm">{label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                                <VisualizePlayer
                                                    audio={audioFile}
                                                    name="Sample Track"
                                                    author="Artist Name"
                                                    theme={vizTheme}
                                                    mode={vizMode}
                                                    volume={vizVolume}
                                                    transparent={vizTransparent}
                                                    controls={{
                                                        play: true,
                                                        pause: true,
                                                        stop: vizShowStop,
                                                        seekbar: vizShowSeekbar,
                                                        volume: vizShowVolume,
                                                        loop: vizShowLoop,
                                                        trackName: vizShowTrackName
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* WaveAudioPlayer */}
                                    {activeTab === 'wave' && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-gray-800">Settings</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Color 1</label>
                                                    <input
                                                        type="color"
                                                        value={waveGradient1}
                                                        onChange={(e) => setWaveGradient1(e.target.value)}
                                                        className="w-full h-12 rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Color 2</label>
                                                    <input
                                                        type="color"
                                                        value={waveGradient2}
                                                        onChange={(e) => setWaveGradient2(e.target.value)}
                                                        className="w-full h-12 rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                                    <input
                                                        type="color"
                                                        value={waveBackground}
                                                        onChange={(e) => setWaveBackground(e.target.value)}
                                                        className="w-full h-12 rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Width: {waveWidth}px
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="200"
                                                        max="800"
                                                        value={waveWidth}
                                                        onChange={(e) => setWaveWidth(parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                                <WaveAudioPlayer
                                                    audio={audioFile}
                                                    gradient={[waveGradient1, waveGradient2]}
                                                    background={waveBackground}
                                                    width={waveWidth}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* NanoAudioPlayer */}
                                    {activeTab === 'nano' && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-gray-800">Settings</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Color 1</label>
                                                    <input
                                                        type="color"
                                                        value={nanoGradient1}
                                                        onChange={(e) => setNanoGradient1(e.target.value)}
                                                        className="w-full h-12 rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Color 2</label>
                                                    <input
                                                        type="color"
                                                        value={nanoGradient2}
                                                        onChange={(e) => setNanoGradient2(e.target.value)}
                                                        className="w-full h-12 rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                                    <input
                                                        type="color"
                                                        value={nanoBackground}
                                                        onChange={(e) => setNanoBackground(e.target.value)}
                                                        className="w-full h-12 rounded-lg"
                                                    />
                                                </div>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={nanoShowThumbnail}
                                                        onChange={(e) => setNanoShowThumbnail(e.target.checked)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm">Show Thumbnail</span>
                                                </label>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                                <div className="flex justify-center">
                                                    <NanoAudioPlayer
                                                        audio={audioFile}
                                                        gradient={[nanoGradient1, nanoGradient2]}
                                                        background={nanoBackground}
                                                        thumbnail={nanoShowThumbnail ? 'https://via.placeholder.com/100' : null}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* VideoPlayer */}
                                    {activeTab === 'video' && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-gray-800">Settings</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setVideoMode('light')}
                                                            className={`flex-1 px-4 py-2 rounded-lg ${videoMode === 'light' ? 'bg-purple-600 text-white' : 'bg-white border'}`}
                                                        >
                                                            Light
                                                        </button>
                                                        <button
                                                            onClick={() => setVideoMode('dark')}
                                                            className={`flex-1 px-4 py-2 rounded-lg ${videoMode === 'dark' ? 'bg-purple-600 text-white' : 'bg-white border'}`}
                                                        >
                                                            Dark
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Volume: {videoVolume}%
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={videoVolume}
                                                        onChange={(e) => setVideoVolume(parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={videoShowAudioVisual}
                                                        onChange={(e) => setVideoShowAudioVisual(e.target.checked)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm">Show Audio Visualization</span>
                                                </label>
                                                {videoShowAudioVisual && (
                                                    <>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">VU Meter Position</label>
                                                            <select
                                                                value={videoVuSide}
                                                                onChange={(e) => setVideoVuSide(e.target.value)}
                                                                className="w-full px-4 py-2 border rounded-lg"
                                                            >
                                                                <option value="left">Left</option>
                                                                <option value="right">Right</option>
                                                                <option value="top">Top</option>
                                                                <option value="bottom">Bottom</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">VU Meter Color</label>
                                                            <input
                                                                type="color"
                                                                value={videoVuColor}
                                                                onChange={(e) => setVideoVuColor(e.target.value)}
                                                                className="w-full h-12 rounded-lg"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Peak Color</label>
                                                            <input
                                                                type="color"
                                                                value={videoVuPeak}
                                                                onChange={(e) => setVideoVuPeak(e.target.value)}
                                                                className="w-full h-12 rounded-lg"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                                <VideoPlayer
                                                    video={videoFile}
                                                    name="Sample Video"
                                                    mode={videoMode}
                                                    volume={videoVolume}
                                                    audioVisual={videoShowAudioVisual ? {
                                                        side: videoVuSide,
                                                        color: videoVuColor,
                                                        peak: videoVuPeak
                                                    } : null}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* File Upload */}
                                    <div className="mt-6 pt-6 border-t">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleAudioFileChange}
                                            accept="audio/*"
                                            className="hidden"
                                        />
                                        <input
                                            type="file"
                                            ref={videoInputRef}
                                            onChange={handleVideoFileChange}
                                            accept="video/*"
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => {
                                                if (activeTab === 'video') {
                                                    videoInputRef.current?.click();
                                                } else {
                                                    fileInputRef.current?.click();
                                                }
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                                        >
                                            <Upload size={20} />
                                            Load {activeTab === 'video' ? 'Video' : 'Audio'} File to Test
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Props Documentation */}
                        <div className="bg-white border-2 border-purple-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                                className="w-full flex justify-between items-center p-4 hover:bg-purple-50 transition-all"
                            >
                                <span className="font-semibold text-gray-800">📋 Props Documentation</span>
                                {expandedSection === 'props' ? (
                                    <ChevronUp className="text-gray-600" />
                                ) : (
                                    <ChevronDown className="text-gray-600" />
                                )}
                            </button>
                            
                            {expandedSection === 'props' && (
                                <div className="p-6 bg-gray-50 border-t overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b-2 border-purple-200">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Prop</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Default</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {propDocs[activeTab].map((prop, idx) => (
                                                <tr key={idx} className="border-b border-gray-200 hover:bg-white">
                                                    <td className="py-3 px-4">
                                                        <code className="text-purple-600 font-mono bg-purple-50 px-2 py-1 rounded">
                                                            {prop.prop}
                                                        </code>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <code className="text-blue-600 font-mono text-xs">
                                                            {prop.type}
                                                        </code>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <code className="text-gray-600 font-mono text-xs">
                                                            {prop.default}
                                                        </code>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600">
                                                        {prop.description}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Installation & Usage */}
                        <div className="mt-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Getting Started</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">1. Import the component</h4>
                                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                                        <code>{`import { ${activeTab === 'visualize' ? 'VisualizePlayer' : activeTab === 'wave' ? 'WaveAudioPlayer' : activeTab === 'nano' ? 'NanoAudioPlayer' : 'VideoPlayer'} } from './components/MediaPlayers';`}</code>
                                    </pre>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">2. Use in your component</h4>
                                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                                        <code>{getExampleCode()}</code>
                                    </pre>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">💡 Features</h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {activeTab === 'visualize' && (
                                            <>
                                                <li>Multi-band frequency visualization with 30+ bands</li>
                                                <li>9 built-in color themes (rainbow, ocean, sunset, etc.)</li>
                                                <li>Custom frequency bands support</li>
                                                <li>Peak hold indicators with smooth decay</li>
                                                <li>Dark/Light mode with transparent option</li>
                                                <li>Fully customizable controls</li>
                                            </>
                                        )}
                                        {activeTab === 'wave' && (
                                            <>
                                                <li>Animated waveform visualization (100 bars)</li>
                                                <li>Customizable gradient colors</li>
                                                <li>Playback speed control (0.5x to 2x)</li>
                                                <li>Click-to-seek on waveform</li>
                                                <li>Volume control and mute</li>
                                                <li>Optional thumbnail display</li>
                                            </>
                                        )}
                                        {activeTab === 'nano' && (
                                            <>
                                                <li>Ultra-compact inline design</li>
                                                <li>Animated mini waveform (12 bars)</li>
                                                <li>Perfect for embedding in text or sidebars</li>
                                                <li>Optional thumbnail support</li>
                                                <li>Customizable gradient and background</li>
                                                <li>Minimal footprint</li>
                                            </>
                                        )}
                                        {activeTab === 'video' && (
                                            <>
                                                <li>Stereo L/R audio visualization with VU meters</li>
                                                <li>Flexible VU meter positioning (left, right, top, bottom)</li>
                                                <li>Fullscreen support</li>
                                                <li>Custom color themes for VU meters</li>
                                                <li>Peak hold indicators with decay</li>
                                                <li>Standard video controls (play, pause, stop, seek, volume)</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">⚡ Browser Compatibility</h4>
                                    <p className="text-sm text-gray-600">
                                        These components use the Web Audio API and are compatible with all modern browsers:
                                        Chrome, Firefox, Safari, Edge. Some features may require user interaction to start audio playback.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-600 mt-12">
                    <p className="text-sm">
                        Built with React, Web Audio API, and Tailwind CSS
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                        © 2025 Media Player Components • Open Source
                    </p>
                </div>
            </div>
        </div>
    );
}