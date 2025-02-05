export {};

declare global {
    interface Window {
        responsiveVoice: {
            speak: (text: string, voice: string, options?: any) => void;
        };
    }
}
