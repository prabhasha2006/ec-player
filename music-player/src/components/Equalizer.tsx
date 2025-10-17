import React, { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';
import { EQUALIZER_FREQUENCIES, EQUALIZER_PRESETS } from '../types/music';

const Equalizer: React.FC = () => {
  const { actions } = useMusicContext();
  const [gains, setGains] = useState<number[]>(new Array(9).fill(0));
  const [selectedPreset, setSelectedPreset] = useState('Custom');
  const [isOpen, setIsOpen] = useState(false);

  const handleGainChange = (bandIndex: number, gain: number) => {
    const newGains = [...gains];
    newGains[bandIndex] = gain;
    setGains(newGains);
    actions.setEqualizerGain(bandIndex, gain);
    setSelectedPreset('Custom');
  };

  const applyPreset = (presetName: string) => {
    const preset = EQUALIZER_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setGains(preset.gains);
      setSelectedPreset(presetName);
      preset.gains.forEach((gain, index) => {
        actions.setEqualizerGain(index, gain);
      });
    }
  };

  const resetEqualizer = () => {
    const resetGains = new Array(9).fill(0);
    setGains(resetGains);
    setSelectedPreset('Custom');
    resetGains.forEach((gain, index) => {
      actions.setEqualizerGain(index, gain);
    });
  };

  return (
    <div className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-emerald-300 hover:text-emerald-100 transition-colors"
        >
          <Sliders className="w-5 h-5" />
          <span className="font-medium">Equalizer</span>
        </button>
        <div className="flex items-center gap-2">
          <select
            value={selectedPreset}
            onChange={(e) => applyPreset(e.target.value)}
            className="bg-emerald-900/50 border border-emerald-600/30 rounded-lg px-3 py-1 text-emerald-200 text-sm focus:outline-none focus:border-emerald-500"
          >
            {EQUALIZER_PRESETS.map((preset) => (
              <option key={preset.name} value={preset.name}>
                {preset.name}
              </option>
            ))}
          </select>
          <button
            onClick={resetEqualizer}
            className="p-1 text-emerald-400 hover:text-emerald-200 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-4">
          <div className="grid grid-cols-9 gap-2">
            {EQUALIZER_FREQUENCIES.map((freq, index) => (
              <div key={freq} className="flex flex-col items-center">
                <div className="text-xs text-emerald-400 mb-1">
                  {freq >= 1000 ? `${freq / 1000}k` : freq}
                </div>
                <div className="relative h-32 w-6 bg-emerald-900/30 rounded-full overflow-hidden">
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    step="0.5"
                    value={gains[index]}
                    onChange={(e) => handleGainChange(index, parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer slider-vertical"
                    style={{
                      writingMode: 'bt-lr',
                      WebkitAppearance: 'slider-vertical',
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-150"
                    style={{
                      height: `${((gains[index] + 20) / 40) * 100}%`,
                    }}
                  />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-300/50" />
                </div>
                <div className="text-xs text-emerald-300 mt-1">
                  {gains[index] > 0 ? '+' : ''}{gains[index].toFixed(1)}dB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Equalizer;