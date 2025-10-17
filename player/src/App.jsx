import React, { useState, useRef } from 'react';
import { VisualizePlayer, themes, ThemeSelector } from './components/Player';
import { Upload } from 'lucide-react';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioName, setAudioName] = useState('No track loaded');
  const [selectedTheme, setSelectedTheme] = useState('purple');
  const [autoPlay, setAutoPlay] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
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
  };

  // Theme options for the selector
  const themeOptions = Object.keys(themes).map(key => ({
    key,
    name: themes[key].name,
    colors: themes[key].bars
  }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full h-full md:h-auto md:max-w-4xl">
        {/* Theme Selector - Initially Hidden */}
        {showThemeSelector && (
          <ThemeSelector theme={selectedTheme} setTheme={setSelectedTheme} close={() => setShowThemeSelector(false)} />
        )}

        <div className="container-glass rounded-xl p-8">
          {/* Header */}
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">Audio Visualizer</h1>
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
            theme={selectedTheme}
            autoPlay={autoPlay}
            mode={mode}
            volume={70}
            controls={{
              play: true,
              stop: true,
              seekbar: true,
              volume: true,
              loop: true,
              trackName: true
            }}
          />

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
              onClick={() => setMode('dark')}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              Dark
            </button>
            <button
              onClick={() => setMode('light')}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              Light
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;