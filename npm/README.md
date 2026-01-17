# ecplayer

A premium, highly customizable, and beautiful music player library for React.

## Features

- **Beautiful Visualizers**: Real-time audio visualization using Web Audio API.
- **Multiple Player Types**: Choose from `VisualizePlayer`, `WaveAudioPlayer`, and `NanoAudioPlayer`.
- **Built-in Themes**: Multiple premium themes (Rainbow, Ocean, Sunset, etc.).
- **Equalizer**: 3-band equalizer (Bass, Mid, Treble).
- **Video Support**: Includes a `VideoPlayer` with visualization capabilities.
- **Responsive**: Works perfectly on all screen sizes.
- **TypeScript Support**: Full type definitions included.
- **Lucide Icons**: Uses modern, sleek icons.

## Installation

```bash
npm install ecplayer
# or
yarn add ecplayer
```

## Peer Dependencies

Ensure you have the following installed in your project:

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `lucide-react`

## Usage

### VisualizePlayer

The flagship player with full visualization and controls.

```tsx
import { VisualizePlayer } from 'ecplayer';
import 'ecplayer/dist/style.css';

function App() {
  return (
    <VisualizePlayer
      audio="path/to/your/audio.mp3"
      name="Track Name"
      author="Artist Name"
      theme="purple"
      autoPlay={false}
    />
  );
}
```

### WaveAudioPlayer

A sleek waveform-based player.

```tsx
import { WaveAudioPlayer } from 'ecplayer';

function App() {
  return (
    <WaveAudioPlayer 
      audio="path/to/audio.mp3" 
      width={400} 
      gradient={['#26ce3a', '#39eed9']} 
    />
  );
}
```

### NanoAudioPlayer

A compact, minimal player for tight spaces.

```tsx
import { NanoAudioPlayer } from 'ecplayer';

function App() {
  return (
    <NanoAudioPlayer 
      audio="path/to/audio.mp3" 
      thumbnail="path/to/thumb.png" 
    />
  );
}
```

### VideoPlayer

A video player with built-in audio visualization.

```tsx
import { VideoPlayer } from 'ecplayer';

function App() {
  return (
    <VideoPlayer 
      video="path/to/video.mp4"
      name="My Video"
      audioVisual={{ side: 'bottom', color: '#3b82f6' }}
    />
  );
}
```

## Props

### VisualizePlayer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `audio` | `string` | - | URL of the audio file |
| `name` | `string` | 'No track loaded' | Name of the track |
| `author` | `string` | - | Author of the track |
| `theme` | `ThemeKey \| Theme` | 'purple' | Built-in theme name or custom theme object |
| `volume` | `number` | 100 | Initial volume (0-100) |
| `autoPlay` | `boolean` | false | Whether to play automatically |
| `mode` | `'light' \| 'dark'` | 'light' | Color mode |
| `transparent` | `boolean` | false | Whether the background is transparent |

## Available Themes

`rainbow`, `ocean`, `sunset`, `forest`, `midnight`, `neon`, `purple`, `amber`, `rose`

## License

MIT
