import React, { useState, useEffect, useRef } from 'react';
import { AudioLines, Upload, CassetteTape, SquareMinus, ChevronDown, ChevronUp, Copy, Check, Settings, Info, TvMinimalPlay, Code, Sun, Moon } from 'lucide-react';
import { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, VideoPlayer } from 'ecplayer';
//import { VisualizePlayer, ThemeSelector, themes, WaveAudioPlayer, NanoAudioPlayer, VideoPlayer } from './Player.js';

const importFrom = 'ecplayer'
const npmVersion = '1.0.1'

const themeConfig = {
    light: {
        bg: 'bg-white',
        text: 'text-gray-800',
        subtext: 'text-gray-600',
        title: 'text-gray-800',
        card: 'bg-gray-50 border-gray-200',
        cardBorder: 'border-gray-200',
        sectionBg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
        tabBg: 'bg-white',
        tabBorder: 'border-gray-200',
        tabText: 'text-gray-600',
        docsBg: 'bg-white',
        docsBorder: 'border-purple-200',
        codeBg: 'bg-gray-900',
        codeText: 'text-green-400',
        btnBg: 'bg-white',
        btnText: 'text-gray-700',
        btnBorder: 'border-gray-200',
        btnHover: 'hover:bg-gray-50',
        tabHover: 'hover:bg-gray-50',
        infoBg: 'bg-blue-50 border-blue-100',
        infoText: 'text-blue-800',
        infoSubtext: 'text-blue-700',
        featureIcon: 'text-purple-500',
        featureBg: 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100',
        label: 'text-gray-700',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputText: 'text-gray-900',
        heading: 'text-gray-800',
        secondaryText: 'text-gray-500',
        previewHeader: 'text-gray-800',
        tabActive: 'bg-purple-600 text-white',
        tabInactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        tableHeader: 'text-gray-700 border-gray-200',
        tableRow: 'border-gray-100 hover:bg-gray-50',
        badgeBg: 'bg-purple-50',
        badgeText: 'text-purple-600',
    },
    dark: {
        bg: 'bg-gray-950',
        text: 'text-gray-200',
        subtext: 'text-gray-400',
        title: 'text-white',
        card: 'bg-gray-900/80 border-gray-800',
        cardBorder: 'border-gray-800',
        sectionBg: 'bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950',
        tabBg: 'bg-gray-950',
        tabBorder: 'border-gray-900',
        tabText: 'text-gray-400',
        docsBg: 'bg-gray-900',
        docsBorder: 'border-purple-900/50',
        codeBg: 'bg-black',
        codeText: 'text-emerald-400',
        btnBg: 'bg-gray-800',
        btnText: 'text-gray-200',
        btnBorder: 'border-gray-700',
        btnHover: 'hover:bg-gray-700',
        tabHover: 'hover:bg-gray-800',
        infoBg: 'bg-blue-950/20 border-blue-900/30',
        infoText: 'text-blue-200',
        infoSubtext: 'text-blue-300',
        featureIcon: 'text-purple-400',
        featureBg: 'bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border-purple-900/40',
        label: 'text-gray-300',
        inputBg: 'bg-gray-800',
        inputBorder: 'border-gray-700',
        inputText: 'text-gray-100',
        heading: 'text-white',
        secondaryText: 'text-gray-400',
        previewHeader: 'text-white',
        tabActive: 'bg-purple-600 text-white',
        tabInactive: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
        tableHeader: 'text-gray-300 border-gray-800',
        tableRow: 'border-gray-800 hover:bg-gray-800/50',
        badgeBg: 'bg-purple-900/30',
        badgeText: 'text-purple-400',
    }
};

const ThemeContext = React.createContext({ isDark: false, theme: themeConfig.dark, toggle: () => { } });

// Installation Documentation Component
function InstallationDocs() {
    const { theme } = React.useContext(ThemeContext);
    const [copiedCode, setCopiedCode] = useState(null);

    const copyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const installCommands = {
        npm: 'npm install ecplayer',
        yarn: 'yarn add ecplayer',
        pnpm: 'pnpm add ecplayer'
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Installation Section */}
            <div className={`${theme.featureBg} rounded-xl p-8 border shadow-lg transition-all duration-500`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl bg-purple-500/10 ${theme.featureIcon}`}>
                        <Settings size={32} />
                    </div>
                    <div>
                        <h2 className={`text-3xl font-bold ${theme.title}`}>Installation</h2>
                        <p className={`${theme.subtext}`}>Get started with ecplayer in your React project</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-4">
                        <h3 className={`text-xl font-semibold ${theme.heading}`}>Package Manager</h3>
                        <div className="flex flex-col gap-4">
                            {Object.entries(installCommands).map(([pkg, cmd]) => (
                                <div key={pkg} className={`${theme.card} p-4 rounded-xl border flex justify-between items-center group transition-all hover:border-purple-500/50`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${pkg === 'npm' ? 'bg-red-500/10 text-red-500' : pkg === 'yarn' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            {pkg}
                                        </div>
                                        <code className={`${theme.text} font-mono`}>{cmd}</code>
                                    </div>
                                    <button
                                        onClick={() => copyCode(cmd, pkg)}
                                        className={`p-2 rounded-lg transition-all ${theme.btnBg} ${theme.btnHover} border ${theme.btnBorder}`}
                                    >
                                        {copiedCode === pkg ? <Check size={18} className="text-green-500" /> : <Copy size={18} className={theme.secondaryText} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Peer Dependencies */}
            <div className={`${theme.card} rounded-xl p-8 border shadow-lg transition-all duration-500`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                        <Info size={32} />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-bold ${theme.heading}`}>Peer Dependencies</h3>
                        <p className={`${theme.secondaryText}`}>Ensure you have these packages installed</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { name: 'react', version: '>= 18.0.0' },
                        { name: 'react-dom', version: '>= 18.0.0' },
                        { name: 'lucide-react', version: 'latest' }
                    ].map(dep => (
                        <div key={dep.name} className={`${theme.bg} p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center`}>
                            <div className={`font-bold ${theme.text}`}>{dep.name}</div>
                            <div className={`text-sm ${theme.secondaryText}`}>{dep.version}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Setup */}
            <div className={`${theme.docsBg} rounded-xl p-8 border shadow-lg transition-all duration-500`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                        <Code size={32} />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-bold ${theme.heading}`}>Quick Setup</h3>
                        <p className={`${theme.secondaryText}`}>Import styles and components</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className={`text-lg font-medium ${theme.label} mb-3`}>1. Import CSS</h4>
                        <p className={`${theme.subtext} mb-3 text-sm`}>Add the styles to your main entry file (index.js, main.tsx, etc.)</p>
                        <div className="relative group">
                            <pre className={`${theme.codeBg} ${theme.codeText} p-5 rounded-xl overflow-x-auto text-sm border`}>
                                <code>{`import 'ecplayer/dist/style.css';`}</code>
                            </pre>
                            <button
                                onClick={() => copyCode("import 'ecplayer/dist/style.css';", 'css')}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                            >
                                {copiedCode === 'css' ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className={`text-lg font-medium ${theme.label} mb-3`}>2. Usage Example</h4>
                        <div className="relative group">
                            <pre className={`${theme.codeBg} ${theme.codeText} p-5 rounded-xl overflow-x-auto text-sm border`}>
                                <code>{`import { VisualizePlayer } from 'ecplayer';

function App() {
  return (
    <VisualizePlayer
      audio="https://example.com/audio.mp3"
      name="Song Name"
      author="Artist"
    />
  );
}`}</code>
                            </pre>
                            <button
                                onClick={() => copyCode(`import { VisualizePlayer } from 'ecplayer';\n\nfunction App() {\n  return (\n    <VisualizePlayer\n      audio="https://example.com/audio.mp3"\n      name="Song Name"\n      author="Artist"\n    />\n  );\n}`, 'usage')}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                            >
                                {copiedCode === 'usage' ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-400" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// VisualizePlayer Documentation Component
function VisualizePlayerDocs() {
    const { theme, isDark } = React.useContext(ThemeContext);
    const [activeExample, setActiveExample] = useState('basic');
    const [audioFile, setAudioFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [vizTheme, setVizTheme] = useState('purple');
    const [vizMode, setVizMode] = useState<'light' | 'dark'>('light');
    const [vizVolume, setVizVolume] = useState(70);
    const [vizTransparent, setVizTransparent] = useState(false);
    const [vizShowTrackName, setVizShowTrackName] = useState(true);
    const [vizShowEqName, setVizShowEqName] = useState(true);
    const [vizShowSeekbar, setVizShowSeekbar] = useState(true);
    const [vizShowVolume, setVizShowVolume] = useState(true);
    const [vizShowLoop, setVizShowLoop] = useState(true);
    const [vizShowStop, setVizShowStop] = useState(true);
    const [vizShowSpeed, setVizShowSpeed] = useState(true);
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
        equalizer: ${vizShowEqName},
        speed: ${vizShowSpeed}
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
            <div className={`${theme.featureBg} rounded-xl p-4 md:p-6 border transition-colors duration-500`}>
                <h2 className={`text-2xl font-bold ${theme.title} mb-3`}>VisualizePlayer</h2>
                <p className={`${theme.subtext} mb-4`}>
                    A feature-rich audio player with multi-band frequency visualization, customizable themes, comprehensive controls, and a 3-band equalizer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${theme.featureIcon} mt-0.5`}>✓</div>
                            <span className={`ml-2 ${theme.subtext}`}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${theme.heading}`}>Examples</h3>
                    <div className={`text-sm ${theme.secondaryText}`}>{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-purple-600 text-white shadow-lg'
                                : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className={`${theme.infoBg} rounded-lg p-4 border transition-colors duration-500`}>
                <div className="flex items-start">
                    <Info className={`h-5 w-5 ${theme.infoText} mt-0.5 flex-shrink-0`} />
                    <div className="ml-3">
                        <h4 className={`font-medium ${theme.infoText}`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.infoSubtext} text-sm mt-1`}>{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className={`${theme.card} rounded-xl p-6 transition-colors duration-500`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className={`text-xl font-bold ${theme.heading} mb-1`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.secondaryText} text-sm`}>Copy this code to use in your project</p>
                    </div>
                    <button
                        onClick={() => copyCode(getExampleCode(), activeExample)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all ${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`}
                    >
                        {copiedCode === activeExample ? (
                            <>
                                <Check size={16} className="text-green-600" />
                                <span className="text-sm font-medium text-green-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} className={isDark ? "text-gray-400" : "text-gray-600"} />
                                <span className={`text-sm font-medium ${theme.btnText}`}>Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg overflow-x-auto text-sm border ${theme.cardBorder}`}>
                    <code>{getExampleCode()}</code>
                </pre>
            </div>

            {/* Live Preview & Customization */}
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-purple-600" />
                        <span className={`font-semibold ${theme.heading}`}>Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className={`p-6 ${theme.sectionBg} border-t ${theme.cardBorder} transition-colors duration-500`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className={`font-semibold ${theme.text}`}>Settings</h4>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Theme Type</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setVizTheme('rainbow')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${vizTheme !== 'custom' ? 'bg-purple-600 text-white shadow-lg' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder}`}`}
                                        >
                                            Built-in
                                        </button>
                                        <button
                                            onClick={() => setVizTheme('custom')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${vizTheme === 'custom' ? 'bg-purple-600 text-white shadow-lg' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder}`}`}
                                        >
                                            Custom
                                        </button>
                                    </div>
                                </div>

                                {vizTheme !== 'custom' ? (
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.label} mb-2`}>Theme</label>
                                        <select
                                            value={vizTheme}
                                            onChange={(e) => setVizTheme(e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.inputText}`}
                                        >
                                            {Object.keys(themes).map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.label} mb-2`}>Background Gradient</label>
                                            <input
                                                type="text"
                                                value={customTheme.bg}
                                                onChange={(e) => setCustomTheme({ ...customTheme, bg: e.target.value })}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.inputText}`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.label} mb-2`}>Bar Colors (comma separated)</label>
                                            <input
                                                type="text"
                                                value={customTheme.bars.join(', ')}
                                                onChange={(e) => setCustomTheme({ ...customTheme, bars: e.target.value.split(',').map(c => c.trim()) })}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.inputText}`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.label} mb-2`}>Peak Color</label>
                                            <input
                                                type="color"
                                                value={customTheme.peak}
                                                onChange={(e) => setCustomTheme({ ...customTheme, peak: e.target.value })}
                                                className={`w-full h-12 rounded-lg cursor-pointer ${theme.inputBg} ${theme.inputBorder}`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.label} mb-2`}>Button Color</label>
                                            <input
                                                type="color"
                                                value={customTheme.button}
                                                onChange={(e) => setCustomTheme({ ...customTheme, button: e.target.value })}
                                                className={`w-full h-12 rounded-lg cursor-pointer ${theme.inputBg} ${theme.inputBorder}`}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Mode</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setVizMode('light')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${vizMode === 'light' ? 'bg-purple-600 text-white shadow-lg' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder}`}`}
                                        >
                                            Light
                                        </button>
                                        <button
                                            onClick={() => setVizMode('dark')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${vizMode === 'dark' ? 'bg-purple-600 text-white shadow-lg' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder}`}`}
                                        >
                                            Dark
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>
                                        Volume: {vizVolume}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={vizVolume}
                                        onChange={(e) => setVizVolume(parseInt(e.target.value))}
                                        className="w-full accent-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Author</label>
                                    <input
                                        type="text"
                                        value={vizAuthor}
                                        onChange={(e) => setVizAuthor(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.inputText}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={vizThumbnail}
                                        onChange={(e) => setVizThumbnail(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.inputText}`}
                                    />
                                </div>

                                {/* Equalizer Settings */}
                                <div className="space-y-3">
                                    <h4 className={`font-medium ${theme.heading}`}>Default Equalizer Settings</h4>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${theme.label}`}>Bass: {vizEqBass} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs ${theme.secondaryText}`}>-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={vizEqBass}
                                                onChange={(e) => setVizEqBass(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className={`text-xs ${theme.secondaryText}`}>+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${theme.label}`}>Mid: {vizEqMid} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs ${theme.secondaryText}`}>-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={vizEqMid}
                                                onChange={(e) => setVizEqMid(parseInt(e.target.value))}
                                                className="flex-1 accent-purple-600"
                                            />
                                            <span className={`text-xs ${theme.secondaryText}`}>+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${theme.label}`}>Treble: {vizEqTreble} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs ${theme.secondaryText}`}>-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={vizEqTreble}
                                                onChange={(e) => setVizEqTreble(parseInt(e.target.value))}
                                                className="flex-1 accent-purple-600"
                                            />
                                            <span className={`text-xs ${theme.secondaryText}`}>+20</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={`flex items-center gap-2 cursor-pointer ${theme.label}`}>
                                        <input
                                            type="checkbox"
                                            checked={vizOnlyVisualization}
                                            onChange={(e) => setVizOnlyVisualization(e.target.checked)}
                                            className="w-4 h-4 accent-purple-600 rounded"
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
                                                ['vizAutoPlay', vizAutoPlay, setVizAutoPlay, 'Auto Play'],
                                                ['vizShowSpeed', vizShowSpeed, setVizShowSpeed, 'Show Speed']
                                            ].map(([key, value, setter, label]: any) => (
                                                <label key={key as string} className={`flex items-center gap-2 cursor-pointer ${theme.label}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={value as boolean}
                                                        onChange={(e) => (setter as React.Dispatch<React.SetStateAction<boolean>>)(e.target.checked)}
                                                        className="w-4 h-4 accent-purple-600 rounded"
                                                    />
                                                    <span className="text-sm">{label}</span>
                                                </label>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className={`font-semibold ${theme.heading} mb-4`}>Live Preview</h4>
                                <VisualizePlayer
                                    audio={audioFile}
                                    name="Sample Track"
                                    author={vizAuthor}
                                    theme={(vizTheme === 'custom' ? customTheme : vizTheme) as any}
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
                                        equalizer: vizShowEqName,
                                        speed: vizShowSpeed
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
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Info size={20} className="text-purple-600" />
                        <span className={`font-semibold ${theme.heading}`}>📋 Props Documentation</span>
                    </div>
                    {expandedSection === 'props' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'props' && (
                    <div className={`p-6 ${theme.card} border-t overflow-x-auto`}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`border-b-2 ${theme.tableHeader}`}>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Prop</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Type</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Default</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Required</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className={`border-b ${theme.tableRow} transition-colors duration-300`}>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.badgeBg} ${theme.badgeText} font-mono px-2 py-1 rounded`}>
                                                {prop.prop}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`text-blue-500 font-mono text-xs opacity-80`}>
                                                {prop.type}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.secondaryText} font-mono text-xs`}>
                                                {prop.default}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-500 font-medium">Yes</span>
                                            ) : (
                                                <span className={theme.secondaryText}>No</span>
                                            )}
                                        </td>
                                        <td className={`py-3 px-4 ${theme.subtext}`}>
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
            <div className={`${theme.featureBg} rounded-xl p-6 transition-all duration-500 border`}>
                <h3 className={`text-lg font-bold ${theme.heading} mb-4`}>🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>1. Import the component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
                            <code>{`import { VisualizePlayer } from '${importFrom}';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>2. Use in your component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
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
    const { theme, isDark } = React.useContext(ThemeContext);
    const [activeExample, setActiveExample] = useState('basic');
    const [audioFile, setAudioFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [waveGradient1, setWaveGradient1] = useState('#cd7eff');
    const [waveGradient2, setWaveGradient2] = useState('#ff00f2');
    const [waveBackground, setWaveBackground] = useState('#f4e4ff');
    const [waveWidth, setWaveWidth] = useState(400);
    const [waveThumbnail, setWaveThumbnail] = useState('https://cdn-icons-png.flaticon.com/512/8316/8316619.png');
    const [waveAutoPlay, setWaveAutoPlay] = useState(false);
    const [waveMode, setWaveMode] = useState<'light' | 'dark'>('light');

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
        const modeStr = waveMode === 'dark' ? '\n    mode="dark"' : '';
        if (activeExample === 'basic') {
            return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"${modeStr}
/>`;
        } else if (activeExample === 'custom') {
            return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    gradient={['${waveGradient1}', '${waveGradient2}']}
    background="${waveBackground}"${modeStr}
/>`;
        } else if (activeExample === 'sized') {
            return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    width={${waveWidth}}
    thumbnail="${waveThumbnail}"${modeStr}
/>`;
        } else if (activeExample === 'autoplay') {
            return `<WaveAudioPlayer
    audio="${audioFile || 'path/to/audio.mp3'}"
    autoPlay={${waveAutoPlay}}
    gradient={['${waveGradient1}', '${waveGradient2}']}
    background="${waveBackground}"${modeStr}
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
    background="${waveBackground}"${modeStr}
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
        { prop: 'gradient', type: 'array', default: "['#cd7eff', '#ff00f2']", description: 'Two-color gradient array' },
        { prop: 'background', type: 'string', default: '"#f4e4ffff"', description: 'Background color' },
        { prop: 'width', type: 'number', default: 'undefined', description: 'Player width in pixels' },
        { prop: 'thumbnail', type: 'string', default: 'null', description: 'URL to thumbnail image' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing automatically' },
        { prop: 'equalizer', type: 'object', default: '{ bass: 0, mid: 0, treble: 0 }', description: 'Initial equalizer settings for bass, mid, and treble (-20 to +20)' },
        { prop: 'mode', type: '"light" | "dark"', default: '"light"', description: 'Color mode for the player UI' }
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
            <div className={`${theme.featureBg} rounded-xl p-6 border transition-all duration-500`}>
                <h2 className={`text-2xl font-bold ${theme.title} mb-3`}>WaveAudioPlayer</h2>
                <p className={`${theme.subtext} mb-4`}>
                    A sleek audio player with waveform visualization, gradient styling, responsive design, and a 3-band equalizer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${theme.featureIcon} mt-0.5`}>✓</div>
                            <span className={`ml-2 ${theme.subtext}`}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${theme.heading}`}>Examples</h3>
                    <div className={`text-sm ${theme.secondaryText}`}>{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-blue-600 text-white shadow-lg'
                                : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className={`${theme.infoBg} rounded-lg p-4 border transition-colors duration-500`}>
                <div className="flex items-start">
                    <Info className={`h-5 w-5 ${theme.infoText} mt-0.5 flex-shrink-0`} />
                    <div className="ml-3">
                        <h4 className={`font-medium ${theme.infoText}`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.infoSubtext} text-sm mt-1`}>{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className={`${theme.card} rounded-xl p-6 transition-colors duration-500`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className={`text-xl font-bold ${theme.heading} mb-1`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.secondaryText} text-sm`}>Copy this code to use in your project</p>
                    </div>
                    <button
                        onClick={() => copyCode(getExampleCode(), activeExample)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all ${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`}
                    >
                        {copiedCode === activeExample ? (
                            <>
                                <Check size={16} className="text-green-600" />
                                <span className="text-sm font-medium text-green-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} className={isDark ? "text-gray-400" : "text-gray-600"} />
                                <span className={`text-sm font-medium ${theme.btnText}`}>Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg overflow-x-auto text-sm border ${theme.cardBorder}`}>
                    <code>{getExampleCode()}</code>
                </pre>
            </div>

            {/* Live Preview & Customization */}
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-blue-600" />
                        <span className={`font-semibold ${theme.heading}`}>Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className={`p-6 ${theme.sectionBg} border-t transition-colors duration-500`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className={`font-semibold ${theme.heading}`}>Settings</h4>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Gradient Color 1</label>
                                    <input
                                        type="color"
                                        value={waveGradient1}
                                        onChange={(e) => setWaveGradient1(e.target.value)}
                                        className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Gradient Color 2</label>
                                    <input
                                        type="color"
                                        value={waveGradient2}
                                        onChange={(e) => setWaveGradient2(e.target.value)}
                                        className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Background Color</label>
                                    <input
                                        type="color"
                                        value={waveBackground}
                                        onChange={(e) => setWaveBackground(e.target.value)}
                                        className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Mode</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setWaveMode('light')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${waveMode === 'light' ? 'bg-blue-600 text-white shadow-lg' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`}`}
                                        >
                                            Light
                                        </button>
                                        <button
                                            onClick={() => setWaveMode('dark')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${waveMode === 'dark' ? 'bg-blue-600 text-white shadow-lg' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`}`}
                                        >
                                            Dark
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>
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
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={waveThumbnail}
                                        onChange={(e) => setWaveThumbnail(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg ${theme.inputBg} ${theme.inputText} ${theme.inputBorder}`}
                                    />
                                </div>

                                {/* Equalizer Settings */}
                                <div className="space-y-3">
                                    <h4 className={`font-medium ${theme.heading}`}>Equalizer Settings</h4>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${theme.label}`}>Bass: {waveEqBass} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs ${theme.secondaryText}`}>-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={waveEqBass}
                                                onChange={(e) => setWaveEqBass(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className={`text-xs ${theme.secondaryText}`}>+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${theme.label}`}>Mid: {waveEqMid} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs ${theme.secondaryText}`}>-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={waveEqMid}
                                                onChange={(e) => setWaveEqMid(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className={`text-xs ${theme.secondaryText}`}>+20</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${theme.label}`}>Treble: {waveEqTreble} dB</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs ${theme.secondaryText}`}>-20</span>
                                            <input
                                                type="range"
                                                min="-20"
                                                max="20"
                                                value={waveEqTreble}
                                                onChange={(e) => setWaveEqTreble(parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className={`text-xs ${theme.secondaryText}`}>+20</span>
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
                                    <span className={`text-sm ${theme.label}`}>Auto Play</span>
                                </label>
                            </div>
                            <div>
                                <h4 className={`font-semibold ${theme.heading} mb-4`}>Live Preview</h4>
                                <div className="flex justify-center">
                                    <WaveAudioPlayer
                                        audio={audioFile}
                                        gradient={[waveGradient1, waveGradient2]}
                                        background={waveBackground}
                                        width={waveWidth}
                                        thumbnail={waveThumbnail}
                                        autoPlay={waveAutoPlay}
                                        mode={waveMode}
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
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Info size={20} className="text-blue-600" />
                        <span className={`font-semibold ${theme.heading}`}>📋 Props Documentation</span>
                    </div>
                    {expandedSection === 'props' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'props' && (
                    <div className={`p-6 ${theme.card} border-t overflow-x-auto`}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`border-b-2 ${theme.tableHeader}`}>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Prop</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Type</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Default</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Required</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className={`border-b ${theme.tableRow} transition-colors duration-300`}>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.badgeBg} ${theme.badgeText} font-mono px-2 py-1 rounded`}>
                                                {prop.prop}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`text-blue-500 font-mono text-xs opacity-80`}>
                                                {prop.type}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.secondaryText} font-mono text-xs`}>
                                                {prop.default}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-500 font-medium">Yes</span>
                                            ) : (
                                                <span className={theme.secondaryText}>No</span>
                                            )}
                                        </td>
                                        <td className={`py-3 px-4 ${theme.subtext}`}>
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
            <div className={`${theme.featureBg} rounded-xl p-6 transition-all duration-500 border`}>
                <h3 className={`text-lg font-bold ${theme.heading} mb-4`}>🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>1. Import the component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
                            <code>{`import { WaveAudioPlayer } from '${importFrom}';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>2. Use in your component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
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
    const { theme, isDark } = React.useContext(ThemeContext);
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
            <div className={`${theme.featureBg} rounded-xl p-6 border transition-all duration-500`}>
                <h2 className={`text-2xl font-bold ${theme.title} mb-3`}>NanoAudioPlayer</h2>
                <p className={`${theme.subtext} mb-4`}>
                    A compact audio player with minimal footprint, perfect for tight spaces and embedded experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${theme.featureIcon} mt-0.5`}>✓</div>
                            <span className={`ml-2 ${theme.subtext}`}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${theme.heading}`}>Examples</h3>
                    <div className={`text-sm ${theme.secondaryText}`}>{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-yellow-600 text-white shadow-lg'
                                : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className={`${theme.infoBg} rounded-lg p-4 border transition-colors duration-500`}>
                <div className="flex items-start">
                    <Info className={`h-5 w-5 ${theme.infoText} mt-0.5 flex-shrink-0`} />
                    <div className="ml-3">
                        <h4 className={`font-medium ${theme.infoText}`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.infoSubtext} text-sm mt-1`}>{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className={`${theme.card} rounded-xl p-6 transition-colors duration-500`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className={`text-xl font-bold ${theme.heading} mb-1`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.secondaryText} text-sm`}>Copy this code to use in your project</p>
                    </div>
                    <button
                        onClick={() => copyCode(getExampleCode(), activeExample)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all ${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`}
                    >
                        {copiedCode === activeExample ? (
                            <>
                                <Check size={16} className="text-green-600" />
                                <span className="text-sm font-medium text-green-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} className={isDark ? "text-gray-400" : "text-gray-600"} />
                                <span className={`text-sm font-medium ${theme.btnText}`}>Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg overflow-x-auto text-sm border ${theme.cardBorder}`}>
                    <code>{getExampleCode()}</code>
                </pre>
            </div>

            {/* Live Preview & Customization */}
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-yellow-600" />
                        <span className={`font-semibold ${theme.heading}`}>Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className={`p-6 ${theme.sectionBg} border-t transition-colors duration-500`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className={`font-semibold ${theme.heading}`}>Settings</h4>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Gradient Color 1</label>
                                    <input
                                        type="color"
                                        value={nanoGradient1}
                                        onChange={(e) => setNanoGradient1(e.target.value)}
                                        className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Gradient Color 2</label>
                                    <input
                                        type="color"
                                        value={nanoGradient2}
                                        onChange={(e) => setNanoGradient2(e.target.value)}
                                        className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Background Color</label>
                                    <input
                                        type="color"
                                        value={nanoBackground}
                                        onChange={(e) => setNanoBackground(e.target.value)}
                                        className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={nanoThumbnail}
                                        onChange={(e) => setNanoThumbnail(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg ${theme.inputBg} ${theme.inputText} ${theme.inputBorder}`}
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
                                        <span className={`text-sm ${theme.label}`}>Show Thumbnail</span>
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={nanoAutoPlay}
                                            onChange={(e) => setNanoAutoPlay(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className={`text-sm ${theme.label}`}>Auto Play</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h4 className={`font-semibold ${theme.heading} mb-4`}>Live Preview</h4>
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
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Info size={20} className="text-yellow-600" />
                        <span className={`font-semibold ${theme.heading}`}>📋 Props Documentation</span>
                    </div>
                    {expandedSection === 'props' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'props' && (
                    <div className={`p-6 ${theme.card} border-t overflow-x-auto`}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`border-b-2 ${theme.tableHeader}`}>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Prop</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Type</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Default</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Required</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className={`border-b ${theme.tableRow} transition-colors duration-300`}>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.badgeBg} ${theme.badgeText} font-mono px-2 py-1 rounded`}>
                                                {prop.prop}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`text-blue-500 font-mono text-xs opacity-80`}>
                                                {prop.type}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.secondaryText} font-mono text-xs`}>
                                                {prop.default}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-500 font-medium">Yes</span>
                                            ) : (
                                                <span className={theme.secondaryText}>No</span>
                                            )}
                                        </td>
                                        <td className={`py-3 px-4 ${theme.subtext}`}>
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
            <div className={`${theme.featureBg} rounded-xl p-6 transition-all duration-500 border`}>
                <h3 className={`text-lg font-bold ${theme.heading} mb-4`}>🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>1. Import the component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
                            <code>{`import { NanoAudioPlayer } from '${importFrom}';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>2. Use in your component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
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
    const { theme, isDark } = React.useContext(ThemeContext);
    const [activeExample, setActiveExample] = useState('basic');
    const [videoFile, setVideoFile] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [expandedSection, setExpandedSection] = useState('customize');

    // Customization states
    const [videoMode, setVideoMode] = useState<'light' | 'dark'>('light');
    const [videoVolume, setVideoVolume] = useState(70);
    const [videoShowAudioVisual, setVideoShowAudioVisual] = useState(true);
    const [videoVuSide, setVideoVuSide] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
    const [videoVuColor, setVideoVuColor] = useState('#00ff00');
    const [videoVuPeak, setVideoVuPeak] = useState('#ff0000');
    const [videoName, setVideoName] = useState('Sample Video');
    const [videoColor, setVideoColor] = useState('#3b82f6');
    const [videoThumbnail, setVideoThumbnail] = useState('./ecplayer-thumb.jpg');
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
    color="${videoColor}"
/>`;
        } else if (activeExample === 'vuMeter') {
            return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="${videoName}"
    color="${videoColor}"
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
    color="${videoColor}"
    volume={${videoVolume}}
    controls={{
        play: true,
        pause: true,
        stop: true,
        seekbar: true,
        volume: true,
        fullscreen: true,
        videoName: true,
        equalizer: true,
        speed: true
    }}
/>`;
        } else if (activeExample === 'advanced') {
            return `<VideoPlayer
    video="${videoFile || 'path/to/video.mp4'}"
    name="${videoName}"
    mode="${videoMode}"
    color="${videoColor}"
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
        { prop: 'color', type: 'string', default: '"#3b82f6"', description: 'Color for controls and buttons' },
        { prop: 'controls', type: 'object', default: '{...}', description: 'Configure which controls to show (play, pause, stop, seekbar, volume, fullscreen, videoName, equalizer, speed)' },
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
        'Auto-play capability',
        '3-band equalizer with bass, mid, and treble controls'
    ];

    return (
        <div className="space-y-8">
            {/* Component Description */}
            <div className={`${theme.featureBg} rounded-xl p-6 border transition-all duration-500`}>
                <h2 className={`text-2xl font-bold ${theme.title} mb-3`}>VideoPlayer</h2>
                <p className={`${theme.subtext} mb-4`}>
                    A full-featured video player with optional audio visualization, customizable controls, and theme support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${theme.featureIcon} mt-0.5`}>✓</div>
                            <span className={`ml-2 ${theme.subtext}`}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example Selector */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${theme.heading}`}>Examples</h3>
                    <div className={`text-sm ${theme.secondaryText}`}>{examples.length} examples available</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {examples.map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveExample(key)}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${activeExample === key
                                ? 'bg-red-600 text-white shadow-lg'
                                : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`
                                }`}
                        >
                            {exampleTitles[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Example Description */}
            <div className={`${theme.infoBg} rounded-lg p-4 border transition-colors duration-500`}>
                <div className="flex items-start">
                    <Info className={`h-5 w-5 ${theme.infoText} mt-0.5 flex-shrink-0`} />
                    <div className="ml-3">
                        <h4 className={`font-medium ${theme.infoText}`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.infoSubtext} text-sm mt-1`}>{exampleDescriptions[activeExample]}</p>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className={`${theme.card} rounded-xl p-6 transition-colors duration-500`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className={`text-xl font-bold ${theme.heading} mb-1`}>{exampleTitles[activeExample]}</h4>
                        <p className={`${theme.secondaryText} text-sm`}>Copy this code to use in your project</p>
                    </div>
                    <button
                        onClick={() => copyCode(getExampleCode(), activeExample)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all ${theme.btnBg} ${theme.btnText} border ${theme.btnBorder} ${theme.btnHover}`}
                    >
                        {copiedCode === activeExample ? (
                            <>
                                <Check size={16} className="text-green-600" />
                                <span className="text-sm font-medium text-green-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} className={isDark ? "text-gray-400" : "text-gray-600"} />
                                <span className={`text-sm font-medium ${theme.btnText}`}>Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg overflow-x-auto text-sm border ${theme.cardBorder}`}>
                    <code>{getExampleCode()}</code>
                </pre>
            </div>

            {/* Live Preview & Customization */}
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Settings size={20} className="text-red-600" />
                        <span className={`font-semibold ${theme.heading}`}>Live Preview & Customize</span>
                    </div>
                    {expandedSection === 'customize' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'customize' && (
                    <div className={`p-6 ${theme.sectionBg} border-t transition-colors duration-500`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className={`font-semibold ${theme.heading}`}>Settings</h4>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Video Name</label>
                                    <input
                                        type="text"
                                        value={videoName}
                                        onChange={(e) => setVideoName(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg ${theme.inputBg} ${theme.inputText} ${theme.inputBorder}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Mode</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setVideoMode('light')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${videoMode === 'light' ? 'bg-red-600 text-white shadow-md' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder}`}`}
                                        >
                                            Light
                                        </button>
                                        <button
                                            onClick={() => setVideoMode('dark')}
                                            className={`flex-1 px-4 py-2 rounded-lg transition-all ${videoMode === 'dark' ? 'bg-red-600 text-white shadow-md' : `${theme.btnBg} ${theme.btnText} border ${theme.btnBorder}`}`}
                                        >
                                            Dark
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>
                                        Volume: {videoVolume}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={videoVolume}
                                        onChange={(e) => setVideoVolume(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium ${theme.label} mb-2`}>Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={videoThumbnail}
                                        onChange={(e) => setVideoThumbnail(e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg ${theme.inputBg} ${theme.inputText} ${theme.inputBorder}`}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.label} mb-2`}>Player Color</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={videoColor}
                                                onChange={(e) => setVideoColor(e.target.value)}
                                                className={`w-10 h-10 rounded border ${theme.btnBorder} cursor-pointer p-0 overflow-hidden`}
                                            />
                                            <input
                                                type="text"
                                                value={videoColor}
                                                onChange={(e) => setVideoColor(e.target.value)}
                                                className={`flex-1 text-sm bg-transparent border-b ${theme.cardBorder} focus:border-red-500 outline-none p-1 ${theme.text}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={videoShowAudioVisual}
                                            onChange={(e) => setVideoShowAudioVisual(e.target.checked)}
                                            className="w-4 h-4 accent-red-600"
                                        />
                                        <span className={`text-sm ${theme.label}`}>Show Audio Visualization</span>
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={videoAutoPlay}
                                            onChange={(e) => setVideoAutoPlay(e.target.checked)}
                                            className="w-4 h-4 accent-red-600"
                                        />
                                        <span className={`text-sm ${theme.label}`}>Auto Play</span>
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={videoShowControls}
                                            onChange={(e) => setVideoShowControls(e.target.checked)}
                                            className="w-4 h-4 accent-red-600"
                                        />
                                        <span className={`text-sm ${theme.label}`}>Show Controls</span>
                                    </label>
                                </div>

                                {videoShowAudioVisual && (
                                    <div className="space-y-4 pt-2">
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.label} mb-2`}>VU Meter Position</label>
                                            <select
                                                value={videoVuSide}
                                                onChange={(e) => setVideoVuSide(e.target.value as 'left' | 'right' | 'top' | 'bottom')}
                                                className={`w-full px-4 py-2 border rounded-lg ${theme.inputBg} ${theme.inputText} ${theme.inputBorder}`}
                                            >
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>
                                                <option value="top">Top</option>
                                                <option value="bottom">Bottom</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={`block text-sm font-medium ${theme.label} mb-2`}>VU Color</label>
                                                <input
                                                    type="color"
                                                    value={videoVuColor}
                                                    onChange={(e) => setVideoVuColor(e.target.value)}
                                                    className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                                />
                                            </div>

                                            <div>
                                                <label className={`block text-sm font-medium ${theme.label} mb-2`}>Peak Color</label>
                                                <input
                                                    type="color"
                                                    value={videoVuPeak}
                                                    onChange={(e) => setVideoVuPeak(e.target.value)}
                                                    className={`w-full h-12 rounded-lg ${theme.inputBg} border ${theme.inputBorder}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className={`font-semibold ${theme.heading} mb-4`}>Live Preview</h4>
                                <div className={`rounded-xl overflow-hidden border ${theme.cardBorder} shadow-2xl`}>
                                    <VideoPlayer
                                        video={videoFile || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                                        name={videoName}
                                        mode={videoMode}
                                        color={videoColor}
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
                                            equalizer: true,
                                            speed: true
                                        } : {}}
                                        audioVisual={videoShowAudioVisual ? {
                                            side: videoVuSide as "left" | "right" | "top" | "bottom",
                                            color: videoVuColor,
                                            peak: videoVuPeak
                                        } : null}
                                    />
                                </div>
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
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                            >
                                <Upload size={20} />
                                Load Video File to Test
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Props Documentation */}
            <div className={`${theme.docsBg} border ${theme.docsBorder} rounded-xl overflow-hidden transition-colors duration-500 shadow-xl`}>
                <button
                    onClick={() => setExpandedSection(expandedSection === 'props' ? null : 'props')}
                    className={`w-full flex justify-between items-center p-4 ${theme.tabHover} transition-all`}
                >
                    <div className="flex items-center gap-2">
                        <Info size={20} className="text-red-600" />
                        <span className={`font-semibold ${theme.heading}`}>📋 Props Documentation</span>
                    </div>
                    {expandedSection === 'props' ? (
                        <ChevronUp className={theme.secondaryText} />
                    ) : (
                        <ChevronDown className={theme.secondaryText} />
                    )}
                </button>

                {expandedSection === 'props' && (
                    <div className={`p-6 ${theme.card} border-t overflow-x-auto`}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`border-b-2 ${theme.tableHeader}`}>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Prop</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Type</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Default</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Required</th>
                                    <th className={`text-left py-3 px-4 font-semibold ${theme.label}`}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propDocs.map((prop, idx) => (
                                    <tr key={idx} className={`border-b ${theme.tableRow} transition-colors duration-300`}>
                                        <td className="py-3 px-4">
                                            <code className="bg-red-50 text-red-600 font-mono px-2 py-1 rounded dark:bg-red-900/30 dark:text-red-400">
                                                {prop.prop}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`text-blue-500 font-mono text-xs opacity-80`}>
                                                {prop.type}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <code className={`${theme.secondaryText} font-mono text-xs`}>
                                                {prop.default}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            {prop.required ? (
                                                <span className="text-red-500 font-medium">Yes</span>
                                            ) : (
                                                <span className={theme.secondaryText}>No</span>
                                            )}
                                        </td>
                                        <td className={`py-3 px-4 ${theme.subtext}`}>
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
            <div className={`${theme.featureBg} rounded-xl p-6 transition-all duration-500 border`}>
                <h3 className={`text-lg font-bold ${theme.heading} mb-4`}>🚀 Getting Started</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>1. Import the component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
                            <code>{`import { VideoPlayer } from '${importFrom}';`}</code>
                        </pre>
                    </div>
                    <div>
                        <h4 className={`font-semibold ${theme.label} mb-2`}>2. Use in your component</h4>
                        <pre className={`${theme.codeBg} ${theme.codeText} p-4 rounded-lg text-sm overflow-x-auto border ${theme.cardBorder}`}>
                            <code>{getExampleCode()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MediaPlayerDocs() {
    const [activeTab, setActiveTab] = useState('visualize');
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('ecplayer-theme');
            return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return true;
    });

    const toggleTheme = () => setIsDark(!isDark);

    useEffect(() => {
        localStorage.setItem('ecplayer-theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const theme = isDark ? themeConfig.dark : themeConfig.light;
    const canvasRef = useRef(null);

    // VU meter animation for hero background
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Initialize bars
        const barCount = 64;
        const barWidth = width / barCount;
        const bars = Array(barCount).fill(0);
        const peakHolds = Array(barCount).fill(0);
        const peakHoldTimes = Array(barCount).fill(0);

        // Animation function
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Generate random values for visualization
            for (let i = 0; i < barCount; i++) {
                // Slower random walk for bars - reduced multiplier from 0.8 to 0.9
                bars[i] = bars[i] * 0.9 + Math.random() * 0.1;

                // Reduced frequency of random peaks - increased threshold from 0.95 to 0.98
                if (Math.random() > 0.98) {
                    bars[i] = Math.random() * 0.8 + 0.2;
                }

                // Update peak holds
                const now = Date.now();
                if (bars[i] > peakHolds[i]) {
                    peakHolds[i] = bars[i];
                    peakHoldTimes[i] = now;
                } else if (now - peakHoldTimes[i] > 1500) {
                    // Slower decay rate - increased multiplier from 0.95 to 0.97
                    peakHolds[i] *= 0.97;
                }

                // Draw bar
                const barHeight = bars[i] * height * 0.8;
                const x = i * barWidth;
                const y = height - barHeight;

                // Create gradient for bars
                const gradient = ctx.createLinearGradient(x, y, x, height);
                gradient.addColorStop(0, '#d8b4fe'); // Light purple
                gradient.addColorStop(1, '#7e22ce'); // Dark purple

                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth - 1, barHeight);

                // Draw peak hold indicator
                if (peakHolds[i] > 0.05) {
                    const peakY = height - (peakHolds[i] * height * 0.8);
                    ctx.fillStyle = '#f0abfc'; // Light pink for peak
                    ctx.fillRect(x, peakY, barWidth - 1, 2);
                }
            }

            // Slow down the animation by reducing the frame rate
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 50); // Add 50ms delay between frames
        };

        animate();

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ isDark, theme, toggle: toggleTheme }}>
            <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme.bg}`}>
                {/* Hero Section */}
                <div className="pt-24 md:pt-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-hidden">
                    {/* VU Meter Background */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full opacity-20"
                        width={800}
                        height={200}
                    />

                    <div className="max-w-7xl mx-auto px-4 min-h-[90vh] p-4 flex items-center justify-center relative">
                        <div className="text-center max-w-5xl">
                            {/* Badge */}
                            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                            </span>
                            <span className="text-sm text-gray-300">Open Source • MIT License</span>
                        </div> */}

                            {/* Main Heading */}
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    EcPlayer.js <span className="text-white">React</span>
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed max-w-3xl mx-auto">
                                Professional audio and video players with advanced visualization,
                                customizable themes, and seamless responsive design
                            </p>

                            {/* ud */}
                            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                                Version: {npmVersion}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                                <a
                                    href="https://evelocore.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 w-full sm:w-auto"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Visit Evelocore
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </a>

                                <a
                                    href="https://github.com/prabhasha2006"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 w-full sm:w-auto"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        GitHub
                                    </span>
                                </a>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="text-purple-400 mb-3">
                                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Audio Players</h3>
                                    <p className="text-gray-400 text-sm">Advanced audio playback with real-time visualization & equalizer</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="text-pink-400 mb-3">
                                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Video Players</h3>
                                    <p className="text-gray-400 text-sm">Professional video playback with custom controls & equalizer</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="text-purple-400 mb-3">
                                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Customizable</h3>
                                    <p className="text-gray-300 text-sm">Fully themeable with responsive design patterns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden"
                    style={{
                        backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        boxShadow: isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div className="relative w-6 h-6">
                        <Sun className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 transform ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0 opacity-0'}`} />
                        <Moon className={`absolute inset-0 w-6 h-6 text-indigo-600 transition-all duration-500 transform ${isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100'}`} />
                    </div>
                    <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4 whitespace-nowrap backdrop-blur-md border ${isDark ? 'bg-gray-800/90 text-white border-gray-700' : 'bg-white/90 text-gray-800 border-gray-200'}`}>
                        {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </div>
                </button>

                {/* Main Content */}
                <div className={`flex-grow transition-colors duration-500 ${theme.sectionBg}`}>
                    <div className="">
                        {/* Component Tabs */}
                        <div className={`${theme.docsBg} shadow-2xl mb-8 overflow-hidden transition-colors duration-500`}>
                            <div className={`flex flex-wrap border-b h-[10vh] ${theme.tabBorder}`}>
                                {[
                                    { id: 'installation', label: 'Installation', icon: <Settings />, color: 'emerald' },
                                    { id: 'visualize', label: 'VisualizePlayer', icon: <AudioLines />, color: 'purple' },
                                    { id: 'wave', label: 'WaveAudioPlayer', icon: <CassetteTape />, color: 'blue' },
                                    { id: 'nano', label: 'NanoAudioPlayer', icon: <SquareMinus />, color: 'yellow' },
                                    { id: 'video', label: 'VideoPlayer', icon: <TvMinimalPlay />, color: 'red' }
                                ].map(tab => {
                                    const activeClasses = {
                                        installation: 'bg-gradient-to-r from-emerald-600 to-teal-600',
                                        visualize: 'bg-gradient-to-r from-purple-600 to-pink-600',
                                        wave: 'bg-gradient-to-r from-blue-600 to-cyan-600',
                                        nano: 'bg-gradient-to-r from-yellow-600 to-amber-600',
                                        video: 'bg-gradient-to-r from-red-600 to-pink-600'
                                    };

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex-1 flex items-center justify-center min-w-fit px-6 h-full font-medium transition-all ${activeTab === tab.id
                                                ? `${activeClasses[tab.id as keyof typeof activeClasses]} text-white shadow-inner`
                                                : `${theme.tabText} ${theme.tabHover}`
                                                }`}
                                        >
                                            <span className="">{tab.icon}</span>
                                            <span className="hidden sm:inline ml-2">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-3 md:p-8">
                                {activeTab === 'installation' && <InstallationDocs />}
                                {activeTab === 'visualize' && <VisualizePlayerDocs />}
                                {activeTab === 'wave' && <WaveAudioPlayerDocs />}
                                {activeTab === 'nano' && <NanoAudioPlayerDocs />}
                                {activeTab === 'video' && <VideoPlayerDocs />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <div className="text-xl font-bold mb-2">EcPlayer.js</div>
                                <div className="text-gray-400 text-sm">
                                    Professional React components for audio and video playback
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                                <div className="text-center md:text-left">
                                    <div className="text-gray-400 text-sm mb-1">Developed by</div>
                                    <div className="font-medium">K.Prabhasha</div>
                                    <a
                                        href="https://kp.evelocore.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                                    >
                                        kp.evelocore.com
                                    </a>
                                </div>

                                <div className="text-center md:text-left">
                                    <div className="text-gray-400 text-sm mb-1">Company</div>
                                    <div className="font-medium">Evelocore</div>
                                    <a
                                        href="https://evelocore.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                                    >
                                        evelocore.com
                                    </a>
                                </div>

                                <div className="text-center md:text-left">
                                    <div className="text-gray-400 text-sm mb-1">License</div>
                                    <div className="font-medium">CC BY-NC-ND 4.0</div>
                                    <a
                                        href="https://github.com/prabhasha2006/ec-player/blob/main/LICENSE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                                    >
                                        View License
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                            <p>© {new Date().getFullYear()} Evelocore. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
}
