import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare function DemoVisualizePlayer(): JSX_2.Element;

export declare function NanoAudioPlayer({ audio: audioUrl, thumbnail, gradient: colors, background, autoPlay }: NanoAudioPlayerProps): JSX_2.Element | null;

export declare interface NanoAudioPlayerProps {
    audio: string;
    thumbnail?: string;
    gradient?: string[];
    background?: string;
    autoPlay?: boolean;
    mode?: 'light' | 'dark';
}

export declare interface Theme {
    name: string;
    bg: string;
    bars: string[];
    peak: string;
    button: string;
    buttonHover: string;
    slider: string;
}

export declare type ThemeKey = 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'neon' | 'purple' | 'amber' | 'rose';

export declare type Themes = Record<ThemeKey, Theme>;

export declare const themes: Themes;

export declare function ThemeSelector({ theme, setTheme, close }: ThemeSelectorProps): JSX_2.Element;

export declare interface ThemeSelectorProps {
    theme: ThemeKey | Theme;
    setTheme: (theme: any) => void;
    close: () => void;
}

export declare function VideoPlayer({ video, name, audioVisual, volume: vol, thumbnail, controls, mode, transparent, autoPlay, color, equalizer }: VideoPlayerProps): JSX_2.Element | JSX_2.Element[];

export declare interface VideoPlayerProps {
    video: string;
    name?: string;
    audioVisual?: {
        side: 'left' | 'right' | 'top' | 'bottom';
        color?: string;
        peak?: string;
    } | null;
    volume?: number;
    thumbnail?: string | null;
    controls?: {
        play?: boolean;
        pause?: boolean;
        stop?: boolean;
        seekbar?: boolean;
        volume?: boolean;
        fullscreen?: boolean;
        videoName?: boolean;
        equalizer?: boolean;
    };
    mode?: 'light' | 'dark';
    transparent?: boolean;
    autoPlay?: boolean;
    color?: string;
    equalizer?: {
        bass?: number;
        mid?: number;
        treble?: number;
    };
}

export declare function VisualizePlayer({ audio, name, author, theme, volume: vol, thumbnail, controls, mode, bands: _bands, transparent, autoPlay, equalizer }: VisualizePlayerProps): JSX_2.Element | JSX_2.Element[];

export declare interface VisualizePlayerProps {
    audio?: string;
    name?: string;
    author?: string;
    theme?: ThemeKey | Theme;
    volume?: number;
    thumbnail?: string | null;
    controls?: {
        play?: boolean;
        pause?: boolean;
        stop?: boolean;
        seekbar?: boolean;
        volume?: boolean;
        loop?: boolean;
        trackName?: boolean;
        equalizer?: boolean;
    };
    mode?: 'light' | 'dark';
    bands?: {
        freq: number;
    }[] | null;
    transparent?: boolean;
    autoPlay?: boolean;
    equalizer?: {
        bass?: number;
        mid?: number;
        treble?: number;
    };
}

export declare function WaveAudioPlayer({ audio: audioUrl, gradient, background, autoPlay, thumbnail, width, equalizer, mode, }: WaveAudioPlayerProps): JSX_2.Element | null;

export declare interface WaveAudioPlayerProps {
    audio: string;
    gradient?: string[];
    background?: string;
    autoPlay?: boolean;
    thumbnail?: string | null;
    width?: number;
    equalizer?: {
        bass?: number;
        mid?: number;
        treble?: number;
    };
    mode?: 'light' | 'dark';
}

export { }
