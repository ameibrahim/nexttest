"use client"

import React, { useState, useEffect } from "react";
import styles from "./ChatInterface.module.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState(""); // Message being typed
//   const [isTyping, setIsTyping] = useState(false);

  const receiveMessage = (message: string) => {
    // setIsTyping(true);
    setCurrentMessage(""); // Reset before typing starts

    let index = 0;
    const typingInterval = setInterval(() => {
      setCurrentMessage((prev) => prev + message[index]); // Ensure previous state is kept
      index++;

      if (index >= message.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
        //   setIsTyping(false);
          setMessages((prev) => [...prev, message]); // Store full message
          setCurrentMessage(""); // Reset current message
        }, 500);
      }
    }, 50); // Adjust typing speed (milliseconds per character)
  };

  useEffect(() => {
    setTimeout(() => {
      receiveMessage("Hello! hello ello ell lloe");
    }, 1000);
  }, []);

  return (
    <div className={styles.chatContainer}>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
        {currentMessage && <li>{currentMessage}</li>}
      </ul>
    </div>
  );
};

export default ChatInterface;