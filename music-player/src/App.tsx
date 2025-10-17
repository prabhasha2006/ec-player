import React from 'react';
import { MusicProvider } from './context/MusicContext';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <MusicProvider>
      <MusicPlayer />
    </MusicProvider>
  );
}

export default App;