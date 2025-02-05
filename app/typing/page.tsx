"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice: string, options?: object) => void
      getVoices: () => { name: string }[]
      cancel: () => void
      voiceSupport: () => boolean
    }
  }
}

export default function TextToSpeech() {
  const [text, setText] = useState("")
  const [voice, setVoice] = useState("UK English Female")
  const [voices, setVoices] = useState<string[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.responsiveVoice) {
      setIsSupported(window.responsiveVoice.voiceSupport())
      const availableVoices = window.responsiveVoice.getVoices()
      setVoices(availableVoices.map((v) => v.name))
    }
  }, [])

  const handleSpeak = () => {
    if (typeof window !== "undefined" && window.responsiveVoice && isSupported) {
      if (isSpeaking) {
        window.responsiveVoice.cancel()
        setIsSpeaking(false)
      } else {
        window.responsiveVoice.speak(text, voice, {
          onstart: () => setIsSpeaking(true),
          onend: () => setIsSpeaking(false),
        })
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardContent>
            <p className="text-center text-red-500">Text-to-speech is not supported in your browser.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Text to Speech</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter text to convert to speech"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mb-4"
          />
          <Select onValueChange={setVoice} value={voice}>
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleSpeak}
            className={`w-full ${isSpeaking ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={!text}
          >
            {isSpeaking ? "Stop Speaking" : "Speak"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}