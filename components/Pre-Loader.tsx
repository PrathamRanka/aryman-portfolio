"use client";
import React, { useState, useEffect } from 'react';
import { Terminal, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

// --- Configuration for the animation ---

// The (harmless, fictional) commands to be typed out
const commands = [
  { text: "Booting security bypass protocol...", time: 1500 },
  { text: "Initializing root access... [OK]", time: 1000 },
  { text: "Scanning network vulnerabilities... 0 found.", time: 1500 },
  { text: "Compiling framework modules... [DONE]", time: 1200 },
  { text: "Injecting new interface... [SUCCESS]", time: 1800 },
  { text: "Finalizing... System handshake complete.", time: 1000 },
];

// --- 1. Typing Effect Component ---
// This component types out a single line of text
interface TypingLineProps {
  text: string;
  onCompleted: () => void;
  typingSpeed?: number;
}

const TypingLine: React.FC<TypingLineProps> = ({ text, onCompleted, typingSpeed = 50 }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (typedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    } else {
      // Text finished typing, wait a moment then call onCompleted
      const completeTimeout = setTimeout(() => {
        onCompleted();
      }, 300); // Short delay after line is finished
      return () => clearTimeout(completeTimeout);
    }
  }, [typedText, text, onCompleted, typingSpeed]);

  return (
    <div className="flex items-center">
      <ChevronRight className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
      <p className="text-green-400">
        {typedText}
        <span className="typing-cursor">|</span>
      </p>
    </div>
  );
};

// --- 2. Hacker Preloader Component ---
// This component manages the different stages of the preloader
interface HackerPreloaderProps {
  onComplete: () => void;
}

const HackerPreloader: React.FC<HackerPreloaderProps> = ({ onComplete }) => {
  // Stages: 'denied' -> 'prompt' -> 'completed'
  const [stage, setStage] = useState<'denied' | 'prompt' | 'completed'>('denied');
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState(0);

  // Stage 1: "Access Denied"
  // Switches to the 'prompt' stage after a delay
  useEffect(() => {
    if (stage === 'denied') {
      const timer = setTimeout(() => {
        setStage('prompt');
      }, 2500); // How long 'Access Denied' shows
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Stage 2: "Prompt"
  // Logic to handle advancing to the next command
  const handleCommandComplete = () => {
    setCompletedLines(prev => [...prev, commands[commandIndex].text]);
    
    // Wait for the specified time for this command
    const currentCommand = commands[commandIndex];
    setTimeout(() => {
      if (commandIndex < commands.length - 1) {
        setCommandIndex(prev => prev + 1);
      } else {
        // All commands are done, move to 'completed' stage
        setStage('completed');
      }
    }, currentCommand.time);
  };

  // Stage 3: "Completed"
  // Calls the onComplete prop after a final delay
  useEffect(() => {
    if (stage === 'completed') {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // How long 'Generating Site' shows
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  // --- Render Logic ---

  // Stage 1: ACCESS DENIED
  if (stage === 'denied') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-red-500 font-mono flex-col">
        <style>{`
          .glitch {
            font-size: 5rem;
            font-weight: 700;
            animation: glitch 1s linear infinite;
          }
          @keyframes glitch {
            0%, 100% { text-shadow: -2px -2px 0 #0ff, 2px 2px 0 #f00; content: "ACCESS DENIED"; }
            20% { text-shadow: 2px 2px 0 #0ff, -2px -2px 0 #f00; }
            40% { text-shadow: 2px -2px 0 #0ff, -2px 2px 0 #f00; }
            60% { text-shadow: -2px 2px 0 #0ff, 2px -2px 0 #f00; }
            80% { text-shadow: -2px -2px 0 #0ff, 2px 2px 0 #f00; }
          }
        `}</style>
        <XCircle className="h-20 w-20 text-red-500 mb-4" />
        <h1 className="glitch">ACCESS DENIED</h1>
        <p className="text-xl mt-4">Unauthorized access detected.</p>
      </div>
    );
  }

  // Stage 2: TERMINAL
  if (stage === 'prompt') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black font-mono p-4">
        <style>{`
          .typing-cursor {
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
        {/* MacBook Style Terminal Window */}
        <div className="w-full max-w-4xl h-[600px] max-h-[90vh] bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden">
          {/* Window Header */}
          <div className="flex-shrink-0 p-3 bg-gray-800 border-b border-gray-700 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-grow text-center text-gray-400 text-sm">
              <Terminal className="h-4 w-4 inline-block -mt-1 mr-2" />
              <span>zsh — /bin/attack_vector</span>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-4 flex-grow overflow-y-auto space-y-2">
            <p className="text-gray-400">Last login: {new Date().toString()}</p>
            {/* Render completed lines */}
            {completedLines.map((line, index) => (
              <div key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                <p className="text-green-400">{line}</p>
              </div>
            ))}
            
            {/* Render the currently typing line */}
            <TypingLine
              key={commandIndex}
              text={commands[commandIndex].text}
              onCompleted={handleCommandComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  // Stage 3: COMPLETED
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-green-400 font-mono flex-col">
      <style>{`
        .pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
      <CheckCircle className="h-20 w-20 text-green-400 mb-4 pulse" />
      <h1 className="text-4xl font-bold mb-2 pulse">ATTACK COMPLETED</h1>
      <p className="text-xl">Generating site... please wait.</p>
    </div>
  );
};

export default HackerPreloader;
