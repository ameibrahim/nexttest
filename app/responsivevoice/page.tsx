"use client"; // Ensure it's a client component

import { useEffect, useState } from "react";
import Script from "next/script";

export default function TextToSpeech() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        
        // Ensure `responsiveVoice` is available
        if (typeof window !== "undefined" && window.responsiveVoice) {
            setIsReady(true);
        }
    }, []);

    const speakText = () => {
        if (isReady) {
            window.responsiveVoice.speak(
                "Hello, welcome to our website!",
                "UK English Male"
            );
        } else {
            console.error("ResponsiveVoice is not loaded yet.");
        }
    };

    return (
        <>
            <button onClick={() => alert("hello")}>Hello</button>
            <button onClick={speakText}>Click to Speak</button>
        </>
    );
}
