import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Repeat, Upload, Maximize, Minimize, ChevronDown, ChevronUp, Copy, Check, Settings, Info, Download, Code } from 'lucide-react';
import { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, VideoPlayer } from './Player';

// VisualizePlayer Documentation Component
function VisualizePlayerDocs() {
    const [activeExample, setActiveExample] = useState('basic');
    const [audioFile, setAudioFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [vizTheme, setVizTheme] = useState('purple');
    const [vizMode, setVizMode] = useState('light');
    const [vizVolume, setVizVolume] = useState(70);
    const [vizTransparent, setVizTransparent] = useState(false);
    const [vizShowTrackName, setVizShowTrackName] = useState(true);
    const [vizShowEqName, setVizShowEqName] = useState(true);
    const [vizShowSeekbar, setVizShowSeekbar] = useState(true);
    const [vizShowVolume, setVizShowVolume] = useState(true);
    const [vizShowLoop, setVizShowLoop] = useState(true);
    const [vizShowStop, setVizShowStop] = useState(true);
    const [vizAuthor, setVizAuthor] = useState('Artist Name');
    const [vizThumbnail, setVizThumbnail] = useState('https://cdn-icons-png.flaticon.com/512/3845/3845874.png');
    const [vizAutoPlay, setVizAutoPlay] = useState(false);
    const [vizOnlyVisualization, setVizOnlyVisualization] = useState(false);

    // Equalizer states
    const [vizEqBass, setVizEqBass] = useState(6);
    const [vizEqMid, setVizEqMid] = useState(-5);
    const [vizEqTreble, setVizEqTreble] = useState(10);

    // Custom theme state
    const [customTheme, setCustomTheme] = useState({
        name: 'Custom',
        bg: 'linear-gradient(135deg, #667eea43 0%, #764ba243 100%)',
        bars: ['#0ea5e9', '#38bdf8', '#06b6d4', '#22d3ee'],
        peak: '#0369a1',
        button: '#0ea5e9',
        buttonHover: '#0284c7',
        slider: '#0ea5e9'
    });

    const fileInputRef = useRef(null);

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioFile(url);
        }
    };

    const copyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const getExampleCode = () => {
        if (activeExample === 'basic') {
            return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    author="${vizAuthor}"
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
        trackName: ${vizShowTrackName},
        equalizer: ${vizShowEqName}
    }}
/>`;
        } else if (activeExample === 'custom') {
            return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    author="${vizAuthor}"
    theme="${vizTheme}"
    mode="${vizMode}"
    volume={${vizVolume}}
    transparent={${vizTransparent}}
    thumbnail="${vizThumbnail}"
    autoPlay={${vizAutoPlay}}
    equalizer={{
        bass: ${vizEqBass},
        mid: ${vizEqMid},
        treble: ${vizEqTreble}
    }}
/>`;
        } else if (activeExample === 'bands') {
            return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    theme="${vizTheme}"
    bands={[
        { freq: 20 }, { freq: 40 }, { freq: 80 },
        { freq: 160 }, { freq: 320 }, { freq: 640 },
        { freq: 1280 }, { freq: 2560 }, { freq: 5120 },
        { freq: 10240 }, { freq: 20480 }
    ]}
/>`;
        } else if (activeExample === 'customTheme') {
            return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    theme={{
        name: 'Custom',
        bg: 'linear-gradient(135deg, #667eea43 0%, #764ba243 100%)',
        bars: ['#0ea5e9', '#38bdf8', '#06b6d4', '#22d3ee'],
        peak: '#0369a1',
        button: '#0ea5e9',
        buttonHover: '#0284c7',
        slider: '#0ea5e9'
    }}
    mode="${vizMode}"
/>`;
        } else if (activeExample === 'onlyVisualization') {
            return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    theme="${vizTheme}"
    mode="${vizMode}"
    controls={{}}
/>`;
        } else if (activeExample === 'equalizer') {
            return `<VisualizePlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    name="Track Name"
    equalizer={{
        bass: ${vizEqBass},
        mid: ${vizEqMid},
        treble: ${vizEqTreble}
    }}
/>`;
        }
        return '';
    };

    const examples = ['basic', 'themed', 'controls', 'custom', 'bands', 'customTheme', 'onlyVisualization', 'equalizer'];

    const exampleTitles = {
        basic: 'Basic Usage',
        themed: 'Built-in Theme',
        controls: 'Custom Controls',
        custom: 'Advanced Configuration',
        bands: 'Custom Frequency Bands',
        customTheme: 'Custom Theme Object',
        onlyVisualization: 'Only Visualization',
        equalizer: 'Equalizer Settings'
    };

    const exampleDescriptions = {
        basic: 'Simple implementation with minimal configuration',
        themed: 'Apply a built-in color theme to the player',
        controls: 'Customize which controls are visible',
        custom: 'Advanced configuration with all parameters',
        bands: 'Define custom frequency bands for visualization',
        customTheme: 'Create a completely custom theme with your own colors',
        onlyVisualization: 'Display only the frequency visualization without any controls',
        equalizer: 'Configure initial equalizer settings for bass, mid, and treble'
    };

    const propDocs = [
        { prop: 'audio', type: 'string', default: 'null', required: true, description: 'URL or path to audio file' },
        { prop: 'name', type: 'string', default: '"No track loaded"', description: 'Track name to display' },
        { prop: 'author', type: 'string', default: 'undefined', description: 'Artist/author name' },
        { prop: 'theme', type: 'string | object', default: '"rainbow"', description: 'Color theme (rainbow, ocean, sunset, etc.) or custom theme object' },
        { prop: 'volume', type: 'number', default: '100', description: 'Initial volume (0-100)' },
        { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
        { prop: 'mode', type: 'string', default: '"light"', description: '"light" or "dark"' },
        { prop: 'transparent', type: 'boolean', default: 'false', description: 'Remove background' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' },
        { prop: 'controls', type: 'object', default: '{...}', description: 'Configure which controls to show. Empty object removes all controls.' },
        { prop: 'bands', type: 'array', default: 'null', description: 'Custom frequency bands array' },
        { prop: 'equalizer', type: 'object', default: '{ bass: 0, mid: 0, treble: 0 }', required: false, description: 'Initial equalizer settings for bass, mid, and treble (-20 to +20)' }
    ];

    const features = [
        'Multi-band frequency visualization with 30+ bands',
        '9 built-in color themes',
        'Custom theme object support',
        'Customizable control set',
        'Light and dark mode support',
        'Transparent background option',
        'Custom frequency bands support',
        'Thumbnail display with rotation animation',
        'Volume control with mute toggle',
        'Seek bar with time display',
        'Loop playback option',
        'Visualization-only mode',
        '3-band equalizer with bass, mid, and treble controls'
    ];

    return (
        <div className="space-y-8">
            {/* Component Description */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">VisualizePlayer</h2>
                <p className="text-gray-700 mb-4">
                    A feature-rich audio player with multi-band frequency visualization, customizable themes, comprehensive controls, and a 3-band equalizer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 text-purple-500 mt-0.5">✓</div>
                            <span className="ml-2 text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Examples</h3>
                    <div className="text-sm text-gray-500">{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                        <h4 className="font-medium text-blue-800">{exampleTitles[activeExample]}</h4>
                        <p className="text-blue-700 text-sm mt-1">{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{exampleTitles[activeExample]}</h4>
                        <p className="text-gray-600 text-sm">Copy this code to use in your project</p>
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
            <div className="bg-white border-2 border-purple-200 rounded-lg overflow-hidden">
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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800">Settings</h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme Type</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setVizTheme('rainbow')}
                                            className={`flex-1 px-4 py-2 rounded-lg ${vizTheme !== 'custom' ? 'bg-purple-600 text-white' : 'bg-white border'}`}
                                        >
                                            Built-in
                                        </button>
                                        <button
                                            onClick={() => setVizTheme('custom')}
                                            className={`flex-1 px-4 py-2 rounded-lg ${vizTheme === 'custom' ? 'bg-purple-600 text-white' : 'bg-white border'}`}
                                        >
                                            Custom
                                        </button>
                                    </div>
                                </div>

                                {vizTheme !== 'custom' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                        <select
                                            value={vizTheme}
                                            onChange={(e) => setVizTheme(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        >
                                            {Object.keys(themes).map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Background Gradient</label>
                                            <input
                                                type="text"
                                                value={customTheme.bg}
                                                onChange={(e) => setCustomTheme({ ...customTheme, bg: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bar Colors (comma separated)</label>
                                            <input
                                                type="text"
                                                value={customTheme.bars.join(', ')}
                                                onChange={(e) => setCustomTheme({ ...customTheme, bars: e.target.value.split(',').map(c => c.trim()) })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Peak Color</label>
                                            <input
                                                type="color"
                                                value={customTheme.peak}
                                                onChange={(e) => setCustomTheme({ ...customTheme, peak: e.target.value })}
                                                className="w-full h-12 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Color</label>
                                            <input
                                                type="color"
                                                value={customTheme.button}
                                                onChange={(e) => setCustomTheme({ ...customTheme, button: e.target.value })}
                                                className="w-full h-12 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                )}

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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                                    <input
                                        type="text"
                                        value={vizAuthor}
                                        onChange={(e) => setVizAuthor(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={vizThumbnail}
                                        onChange={(e) => setVizThumbnail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                {/* Equalizer Settings */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-800">Default Equalizer Settings</h4>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-700">Bass: {vizEqBass} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={vizEqBass}
                                                onChange={(e) => setVizEqBass(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500">+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-700">Mid: {vizEqMid} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={vizEqMid}
                                                onChange={(e) => setVizEqMid(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500">+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-700">Treble: {vizEqTreble} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={vizEqTreble}
                                                onChange={(e) => setVizEqTreble(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500">+20</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={vizOnlyVisualization}
                                            onChange={(e) => setVizOnlyVisualization(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Only Visualization (no controls)</span>
                                    </label>

                                    {!vizOnlyVisualization && (
                                        <>
                                            {[
                                                ['vizTransparent', vizTransparent, setVizTransparent, 'Transparent'],
                                                ['vizShowTrackName', vizShowTrackName, setVizShowTrackName, 'Show Track Name'],
                                                ['vizShowEqName', vizShowEqName, setVizShowEqName, 'Show Equalizer Name'],
                                                ['vizShowSeekbar', vizShowSeekbar, setVizShowSeekbar, 'Show Seekbar'],
                                                ['vizShowVolume', vizShowVolume, setVizShowVolume, 'Show Volume'],
                                                ['vizShowLoop', vizShowLoop, setVizShowLoop, 'Show Loop'],
                                                ['vizShowStop', vizShowStop, setVizShowStop, 'Show Stop'],
                                                ['vizAutoPlay', vizAutoPlay, setVizAutoPlay, 'Auto Play']
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
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                <VisualizePlayer
                                    audio={audioFile}
                                    name="Sample Track"
                                    author={vizAuthor}
                                    theme={vizTheme === 'custom' ? customTheme : vizTheme}
                                    mode={vizMode}
                                    volume={vizVolume}
                                    transparent={vizTransparent}
                                    thumbnail={vizThumbnail}
                                    autoPlay={vizAutoPlay}
                                    controls={vizOnlyVisualization ? {} : {
                                        play: true,
                                        pause: true,
                                        stop: vizShowStop,
                                        seekbar: vizShowSeekbar,
                                        volume: vizShowVolume,
                                        loop: vizShowLoop,
                                        trackName: vizShowTrackName,
                                        equalizer: vizShowEqName
                                    }}
                                    equalizer={{
                                        bass: vizEqBass,
                                        mid: vizEqMid,
                                        treble: vizEqTreble
                                    }}
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="mt-6 pt-6 border-t">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAudioFileChange}
                                accept="audio/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                <Upload size={20} />
                                Load Audio File to Test
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
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Required</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
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
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-gray-500">No</span>
                                            )}
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
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">1. Import the component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{`import { VisualizePlayer } from './components/MediaPlayers';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">2. Use in your component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{getExampleCode()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

// WaveAudioPlayer Documentation Component
function WaveAudioPlayerDocs() {
    const [activeExample, setActiveExample] = useState('basic');
    const [audioFile, setAudioFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [waveGradient1, setWaveGradient1] = useState('#cd7eff');
    const [waveGradient2, setWaveGradient2] = useState('#fe59f6');
    const [waveBackground, setWaveBackground] = useState('#2f1f3a');
    const [waveWidth, setWaveWidth] = useState(400);
    const [waveThumbnail, setWaveThumbnail] = useState('https://cdn-icons-png.flaticon.com/512/8316/8316619.png');
    const [waveAutoPlay, setWaveAutoPlay] = useState(false);

    // Equalizer states
    const [waveEqBass, setWaveEqBass] = useState(0);
    const [waveEqMid, setWaveEqMid] = useState(0);
    const [waveEqTreble, setWaveEqTreble] = useState(0);

    const fileInputRef = useRef(null);

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioFile(url);
        }
    };

    const copyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const getExampleCode = () => {
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
    thumbnail="${waveThumbnail}"
/>`;
        } else if (activeExample === 'autoplay') {
            return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    autoPlay={${waveAutoPlay}}
    gradient={['${waveGradient1}', '${waveGradient2}']}
    background="${waveBackground}"
/>`;
        } else if (activeExample === 'equalizer') {
            return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    equalizer={{
        bass: ${waveEqBass},
        mid: ${waveEqMid},
        treble: ${waveEqTreble}
    }}
    gradient={['${waveGradient1}', '${waveGradient2}']}
    background="${waveBackground}"
/>`;
        }
        return '';
    };

    const examples = ['basic', 'custom', 'sized', 'autoplay', 'equalizer'];

    const exampleTitles = {
        basic: 'Basic Usage',
        custom: 'Custom Colors',
        sized: 'Custom Size',
        autoplay: 'Auto Play',
        equalizer: 'Equalizer Settings'
    };

    const exampleDescriptions = {
        basic: 'Simple implementation with default styling',
        custom: 'Apply custom gradient colors and background',
        sized: 'Set a custom width for the player',
        autoplay: 'Configure the player to start automatically',
        equalizer: 'Configure initial equalizer settings for bass, mid, and treble'
    };

    const propDocs = [
        { prop: 'audio', type: 'string', default: 'null', required: true, description: 'URL or path to audio file' },
        { prop: 'gradient', type: 'array', default: "['#cd7eff', '#fe59f6']", description: 'Two-color gradient array' },
        { prop: 'background', type: 'string', default: '"#2f1f3a"', description: 'Background color' },
        { prop: 'width', type: 'number', default: 'undefined', description: 'Player width in pixels' },
        { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' },
        { prop: 'equalizer', type: 'object', default: '{ bass: 0, mid: 0, treble: 0 }', description: 'Initial equalizer settings for bass, mid, and treble (-20 to +20)' }
    ];

    const features = [
        'Interactive waveform visualization',
        'Customizable gradient colors',
        'Responsive width control',
        'Thumbnail display option',
        'Volume control with mute toggle',
        'Playback speed control',
        'Auto-play capability',
        'Time display with seek functionality',
        'Sleek, modern design',
        '3-band equalizer with bass, mid, and treble controls'
    ];

    return (
        <div className="space-y-8">
            {/* Component Description */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">WaveAudioPlayer</h2>
                <p className="text-gray-700 mb-4">
                    A sleek audio player with waveform visualization, gradient styling, responsive design, and a 3-band equalizer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">✓</div>
                            <span className="ml-2 text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Examples</h3>
                    <div className="text-sm text-gray-500">{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                        <h4 className="font-medium text-blue-800">{exampleTitles[activeExample]}</h4>
                        <p className="text-blue-700 text-sm mt-1">{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{exampleTitles[activeExample]}</h4>
                        <p className="text-gray-600 text-sm">Copy this code to use in your project</p>
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
            <div className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className="w-full flex justify-between items-center p-4 hover:bg-blue-50 transition-all"
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-blue-600" />
                        <span className="font-semibold text-gray-800">Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className="text-gray-600" />
                    ) : (
                        <ChevronDown className="text-gray-600" />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-t">
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={waveThumbnail}
                                        onChange={(e) => setWaveThumbnail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                {/* Equalizer Settings */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-800">Equalizer Settings</h4>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-700">Bass: {waveEqBass} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={waveEqBass}
                                                onChange={(e) => setWaveEqBass(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500">+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-700">Mid: {waveEqMid} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={waveEqMid}
                                                onChange={(e) => setWaveEqMid(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500">+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-700">Treble: {waveEqTreble} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={waveEqTreble}
                                                onChange={(e) => setWaveEqTreble(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500">+20</span>
                                        </div>
                                    </div>
                                </div>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={waveAutoPlay}
                                        onChange={(e) => setWaveAutoPlay(e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">Auto Play</span>
                                </label>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                <div className="flex justify-center">
                                    <WaveAudioPlayer
                                        audio={audioFile}
                                        gradient={[waveGradient1, waveGradient2]}
                                        background={waveBackground}
                                        width={waveWidth}
                                        thumbnail={waveThumbnail}
                                        autoPlay={waveAutoPlay}
                                        equalizer={{
                                            bass: waveEqBass,
                                            mid: waveEqMid,
                                            treble: waveEqTreble
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="mt-6 pt-6 border-t">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAudioFileChange}
                                accept="audio/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                <Upload size={20} />
                                Load Audio File to Test
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Props Documentation */}
            <div className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className="w-full flex justify-between items-center p-4 hover:bg-blue-50 transition-all"
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
                                <tr className="border-b-2 border-blue-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Prop</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Default</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Required</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-white">
                                        <td className="py-3 px-4">
                                            <code className="text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
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
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-gray-500">No</span>
                                            )}
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
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">1. Import the component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{`import { WaveAudioPlayer } from './components/MediaPlayers';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">2. Use in your component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{getExampleCode()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

// NanoAudioPlayer Documentation Component
function NanoAudioPlayerDocs() {
    const [activeExample, setActiveExample] = useState('basic');
    const [audioFile, setAudioFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [nanoGradient1, setNanoGradient1] = useState('#cd7eff');
    const [nanoGradient2, setNanoGradient2] = useState('#fe59f6');
    const [nanoBackground, setNanoBackground] = useState('#1f273a');
    const [nanoShowThumbnail, setNanoShowThumbnail] = useState(true);
    const [nanoThumbnail, setNanoThumbnail] = useState('https://cdn-icons-png.flaticon.com/512/17524/17524837.png');
    const [nanoAutoPlay, setNanoAutoPlay] = useState(false);

    const fileInputRef = useRef(null);

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioFile(url);
        }
    };

    const copyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const getExampleCode = () => {
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
        } else if (activeExample === 'thumbnail') {
            return `<NanoAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    thumbnail="${nanoThumbnail}"
    gradient={['${nanoGradient1}', '${nanoGradient2}']}
    background="${nanoBackground}"
/>`;
        } else if (activeExample === 'autoplay') {
            return `<NanoAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    autoPlay={${nanoAutoPlay}}
    gradient={['${nanoGradient1}', '${nanoGradient2}']}
    background="${nanoBackground}"
/>`;
        }
        return '';
    };

    const examples = ['basic', 'styled', 'thumbnail', 'autoplay'];

    const exampleTitles = {
        basic: 'Basic Usage',
        styled: 'Custom Style',
        thumbnail: 'With Thumbnail',
        autoplay: 'Auto Play'
    };

    const exampleDescriptions = {
        basic: 'Simple implementation with default styling',
        styled: 'Apply custom gradient colors and background',
        thumbnail: 'Display album art with the player',
        autoplay: 'Configure the player to start automatically'
    };

    const propDocs = [
        { prop: 'audio', type: 'string', default: 'null', required: true, description: 'URL or path to audio file' },
        { prop: 'gradient', type: 'array', default: "['#cd7eff', '#fe59f6']", description: 'Two-color gradient array' },
        { prop: 'background', type: 'string', default: '"#1f273a"', description: 'Background color' },
        { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' }
    ];

    const features = [
        'Ultra-compact design',
        'Animated mini waveform visualization',
        'Customizable gradient colors',
        'Optional thumbnail display',
        'Auto-play capability',
        'Minimal controls for simplicity',
        'Perfect for embedded players'
    ];

    return (
        <div className="space-y-8">
            {/* Component Description */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">NanoAudioPlayer</h2>
                <p className="text-gray-700 mb-4">
                    A compact audio player with minimal footprint, perfect for tight spaces and embedded experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">✓</div>
                            <span className="ml-2 text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Examples</h3>
                    <div className="text-sm text-gray-500">{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-yellow-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                        <h4 className="font-medium text-yellow-800">{exampleTitles[activeExample]}</h4>
                        <p className="text-yellow-700 text-sm mt-1">{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{exampleTitles[activeExample]}</h4>
                        <p className="text-gray-600 text-sm">Copy this code to use in your project</p>
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
            <div className="bg-white border-2 border-yellow-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className="w-full flex justify-between items-center p-4 hover:bg-yellow-50 transition-all"
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-yellow-600" />
                        <span className="font-semibold text-gray-800">Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className="text-gray-600" />
                    ) : (
                        <ChevronDown className="text-gray-600" />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-t">
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={nanoThumbnail}
                                        onChange={(e) => setNanoThumbnail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={nanoShowThumbnail}
                                            onChange={(e) => setNanoShowThumbnail(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Show Thumbnail</span>
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={nanoAutoPlay}
                                            onChange={(e) => setNanoAutoPlay(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Auto Play</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-4">Live Preview</h4>
                                <div className="flex justify-center">
                                    <NanoAudioPlayer
                                        audio={audioFile}
                                        gradient={[nanoGradient1, nanoGradient2]}
                                        background={nanoBackground}
                                        thumbnail={nanoShowThumbnail ? nanoThumbnail : null}
                                        autoPlay={nanoAutoPlay}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="mt-6 pt-6 border-t">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAudioFileChange}
                                accept="audio/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                <Upload size={20} />
                                Load Audio File to Test
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Props Documentation */}
            <div className="bg-white border-2 border-yellow-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className="w-full flex justify-between items-center p-4 hover:bg-yellow-50 transition-all"
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
                                <tr className="border-b-2 border-yellow-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Prop</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Default</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Required</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-white">
                                        <td className="py-3 px-4">
                                            <code className="text-yellow-600 font-mono bg-yellow-50 px-2 py-1 rounded">
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
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-gray-500">No</span>
                                            )}
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
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">1. Import the component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{`import { NanoAudioPlayer } from './components/MediaPlayers';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">2. Use in your component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{getExampleCode()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

// VideoPlayer Documentation Component
function VideoPlayerDocs() {
    const [activeExample, setActiveExample] = useState('basic');
    const [videoFile, setVideoFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [videoMode, setVideoMode] = useState('light');
    const [videoVolume, setVideoVolume] = useState(70);
    const [videoShowAudioVisual, setVideoShowAudioVisual] = useState(true);
    const [videoVuSide, setVideoVuSide] = useState('left');
    const [videoVuColor, setVideoVuColor] = useState('#00ff00');
    const [videoVuPeak, setVideoVuPeak] = useState('#ff0000');
    const [videoName, setVideoName] = useState('Sample Video');
    const [videoThumbnail, setVideoThumbnail] = useState('https://via.placeholder.com/800x450');
    const [videoAutoPlay, setVideoAutoPlay] = useState(false);
    const [videoShowControls, setVideoShowControls] = useState(true);

    const videoInputRef = useRef(null);

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

    const getExampleCode = () => {
        if (activeExample === 'basic') {
            return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="${videoName}"
/>`;
        } else if (activeExample === 'vuMeter') {
            return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="${videoName}"
    audioVisual={{
        side: '${videoVuSide}',
        color: '${videoVuColor}',
        peak: '${videoVuPeak}'
    }}
/>`;
        } else if (activeExample === 'controls') {
            return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="${videoName}"
    mode="${videoMode}"
    volume={${videoVolume}}
    controls={{
        play: true,
        pause: true,
        stop: true,
        seekbar: true,
        volume: true,
        fullscreen: true,
        videoName: true,
        equalizer: true
    }}
/>`;
        } else if (activeExample === 'advanced') {
            return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="${videoName}"
    mode="${videoMode}"
    volume={${videoVolume}}
    thumbnail="${videoThumbnail}"
    autoPlay={${videoAutoPlay}}
    audioVisual={{
        side: '${videoVuSide}',
        color: '${videoVuColor}',
        peak: '${videoVuPeak}'
    }}
/>`;
        }
        return '';
    };

    const examples = ['basic', 'vuMeter', 'controls', 'advanced'];

    const exampleTitles = {
        basic: 'Basic Usage',
        vuMeter: 'With VU Meters',
        controls: 'Custom Controls',
        advanced: 'Full Configuration'
    };

    const exampleDescriptions = {
        basic: 'Simple implementation with default settings',
        vuMeter: 'Add audio visualization to the video player',
        controls: 'Customize which controls are visible',
        advanced: 'Complete configuration with all options'
    };

    const propDocs = [
        { prop: 'video', type: 'string', default: 'null', required: true, description: 'URL or path to video file' },
        { prop: 'name', type: 'string', default: '"No video loaded"', description: 'Video name to display' },
        { prop: 'volume', type: 'number', default: '100', description: 'Initial volume (0-100)' },
        { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to poster image' },
        { prop: 'mode', type: 'string', default: '"light"', description: '"light" or "dark"' },
        { prop: 'transparent', type: 'boolean', default: 'false', description: 'Remove background' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' },
        { prop: 'controls', type: 'object', default: '{...}', description: 'Configure which controls to show' },
        { prop: 'audioVisual', type: 'object', default: 'null', description: 'VU meter configuration {side, color, peak}' }
    ];

    const features = [
        'Full video playback controls',
        'Optional VU meter visualization',
        'Customizable VU meter position and colors',
        'Light and dark mode support',
        'Thumbnail/poster image support',
        'Volume control with mute toggle',
        'Seek bar with time display',
        'Fullscreen capability',
        'Auto-play capability'
    ];

    return (
        <div className="space-y-8">
            {/* Component Description */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">VideoPlayer</h2>
                <p className="text-gray-700 mb-4">
                    A full-featured video player with optional audio visualization, customizable controls, and theme support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5">✓</div>
                            <span className="ml-2 text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Examples</h3>
                    <div className="text-sm text-gray-500">{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                        <h4 className="font-medium text-red-800">{exampleTitles[activeExample]}</h4>
                        <p className="text-red-700 text-sm mt-1">{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{exampleTitles[activeExample]}</h4>
                        <p className="text-gray-600 text-sm">Copy this code to use in your project</p>
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
            <div className="bg-white border-2 border-red-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className="w-full flex justify-between items-center p-4 hover:bg-red-50 transition-all"
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-red-600" />
                        <span className="font-semibold text-gray-800">Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className="text-gray-600" />
                    ) : (
                        <ChevronDown className="text-gray-600" />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-t">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800">Settings</h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Name</label>
                                    <input
                                        type="text"
                                        value={videoName}
                                        onChange={(e) => setVideoName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setVideoMode('light')}
                                            className={`flex-1 px-4 py-2 rounded-lg ${videoMode === 'light' ? 'bg-red-600 text-white' : 'bg-white border'}`}
                                        >
                                            Light
                                        </button>
                                        <button
                                            onClick={() => setVideoMode('dark')}
                                            className={`flex-1 px-4 py-2 rounded-lg ${videoMode === 'dark' ? 'bg-red-600 text-white' : 'bg-white border'}`}
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={videoThumbnail}
                                        onChange={(e) => setVideoThumbnail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={videoShowAudioVisual}
                                            onChange={(e) => setVideoShowAudioVisual(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Show Audio Visualization</span>
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={videoAutoPlay}
                                            onChange={(e) => setVideoAutoPlay(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Auto Play</span>
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={videoShowControls}
                                            onChange={(e) => setVideoShowControls(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Show Controls</span>
                                    </label>
                                </div>

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
                                    name={videoName}
                                    mode={videoMode}
                                    volume={videoVolume}
                                    thumbnail={videoThumbnail}
                                    autoPlay={videoAutoPlay}
                                    controls={videoShowControls ? {
                                        play: true,
                                        pause: true,
                                        stop: true,
                                        seekbar: true,
                                        volume: true,
                                        fullscreen: true,
                                        videoName: true,
                                        equalizer: true
                                    } : {}}
                                    audioVisual={videoShowAudioVisual ? {
                                        side: videoVuSide,
                                        color: videoVuColor,
                                        peak: videoVuPeak
                                    } : null}
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="mt-6 pt-6 border-t">
                            <input
                                type="file"
                                ref={videoInputRef}
                                onChange={handleVideoFileChange}
                                accept="video/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => videoInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                <Upload size={20} />
                                Load Video File to Test
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Props Documentation */}
            <div className="bg-white border-2 border-red-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className="w-full flex justify-between items-center p-4 hover:bg-red-50 transition-all"
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
                                <tr className="border-b-2 border-red-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Prop</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Default</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Required</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-white">
                                        <td className="py-3 px-4">
                                            <code className="text-red-600 font-mono bg-red-50 px-2 py-1 rounded">
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
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-gray-500">No</span>
                                            )}
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
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">1. Import the component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{`import { VideoPlayer } from './components/MediaPlayers';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">2. Use in your component</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{getExampleCode()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main MediaPlayerDocs Component
export default function MediaPlayerDocs() {
    const [activeTab, setActiveTab] = useState('visualize');

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
            <div className="-max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        EC Players React
                    </h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Professional audio and video players with visualization capabilities,
                        customizable themes, and responsive design. Evelocore
                    </p>
                </div>

                {/* Component Tabs */}
                <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
                    <div className="flex flex-wrap border-b">
                        {[
                            { id: 'visualize', label: 'VisualizePlayer', icon: '🎵', color: 'purple' },
                            { id: 'wave', label: 'WaveAudioPlayer', icon: '🌊', color: 'blue' },
                            { id: 'nano', label: 'NanoAudioPlayer', icon: '⚡', color: 'yellow' },
                            { id: 'video', label: 'VideoPlayer', icon: '🎬', color: 'red' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 min-w-fit px-6 py-4 font-medium transition-all ${activeTab === tab.id
                                    ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color === 'purple' ? 'pink' : tab.color === 'blue' ? 'cyan' : tab.color === 'yellow' ? 'amber' : 'pink'}-600 text-white`
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.icon}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-8">
                        {activeTab === 'visualize' && <VisualizePlayerDocs />}
                        {activeTab === 'wave' && <WaveAudioPlayerDocs />}
                        {activeTab === 'nano' && <NanoAudioPlayerDocs />}
                        {activeTab === 'video' && <VideoPlayerDocs />}
                    </div>
                </div>
            </div>
        </div>
    );
}