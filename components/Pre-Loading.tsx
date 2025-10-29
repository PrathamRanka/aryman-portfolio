"use client";

import { useState, useEffect } from "react";
import { MatrixText } from "./ui/pre-loader";
import { cn } from "@/lib/utils";


// Define the stages
type PreLoaderStage = "denied" | "matrix" | "granted";

// Define the props, including a callback for when the animation is done
interface PreLoaderAnimationProps {
  onFinished: () => void;
}

// Consistent "hacker" font style for all stages
const hackerTextStyle = "font-mono text-4xl md:text-6xl";

export default function PreLoading({ onFinished }: PreLoaderAnimationProps) {
  const [stage, setStage] = useState<PreLoaderStage>("denied");

  useEffect(() => {
    if (stage === "denied") {
      // 1. Show 'Access denied' for 1.5 seconds
      const timer = setTimeout(() => {
        setStage("matrix");
      }, 1500);
      return () => clearTimeout(timer);
    } 
    
    if (stage === "matrix") {
      // 2. Show MatrixText. Its duration is ~1700ms.
      // We'll give it 2 seconds (2000ms) to be safe.
      const timer = setTimeout(() => {
        setStage("granted");
      }, 2000); // 200ms delay + (10 chars * 100ms) + 500ms anim = 1700ms
      return () => clearTimeout(timer);
    } 
    
    if (stage === "granted") {
      // 3. Show 'Access granted' for 1.5s, then call onFinished
      const timer = setTimeout(() => {
        onFinished(); // Signal that the pre-loader is done
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage, onFinished]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">

      <div className="flex h-24 items-center justify-center">

       
        {stage === "denied" && (
          <div className={cn(hackerTextStyle, "text-red-500")}>
            Access denied
          </div>
        )}

      
        {stage === "matrix" && (
          <MatrixText
            text="Kokonut UI"
            initialDelay={200}
            letterAnimationDuration={500}
            letterInterval={100}
            className="min-h-0 bg-transparent"
          />
        )}

        {stage === "granted" && (
          <div className={cn(hackerTextStyle, "text-green-500")}>
            Access granted
          </div>
        )}
        
      </div>
    </div>
  );
}