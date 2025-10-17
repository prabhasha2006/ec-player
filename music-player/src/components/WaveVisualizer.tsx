import React, { useRef, useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';

const WaveVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { analyser, state } = useMusicContext();

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength * 2;
      let barHeight;
      let x = 0;

      // Create rainbow gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#ff0000');    // Red
      gradient.addColorStop(0.16, '#ff8000'); // Orange
      gradient.addColorStop(0.33, '#ffff00'); // Yellow
      gradient.addColorStop(0.5, '#00ff00');  // Green
      gradient.addColorStop(0.66, '#0080ff'); // Blue
      gradient.addColorStop(0.83, '#8000ff'); // Indigo
      gradient.addColorStop(1, '#ff00ff');    // Violet

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        // Create vertical gradient for each bar
        const barGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        const hue = (i / bufferLength) * 360;
        barGradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.8)`);
        barGradient.addColorStop(0.5, `hsla(${hue}, 80%, 60%, 0.9)`);
        barGradient.addColorStop(1, `hsla(${hue}, 90%, 70%, 1)`);

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        // Add glow effect
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        ctx.shadowBlur = 0;

        x += barWidth + 1;
      }

      if (state.isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    if (state.isPlaying) {
      draw();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, state.isPlaying]);

  return (
    <div className="relative w-full h-32 bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 rounded-lg overflow-hidden border border-emerald-500/20">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      {!state.isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-emerald-400/60 text-sm font-medium">
            Play music to see visualization
          </div>
        </div>
      )}
    </div>
  );
};

export default WaveVisualizer;