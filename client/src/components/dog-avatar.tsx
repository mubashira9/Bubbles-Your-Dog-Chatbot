"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface DogAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export function DogAvatar({
  size = "md",
  className,
  animated = true,
}: DogAvatarProps) {
  const [showTongue, setShowTongue] = useState(false);
  const [tailWag, setTailWag] = useState(0);

  useEffect(() => {
    if (!animated) return;

    // Tongue animation - show/hide every 3 seconds
    const tongueInterval = setInterval(() => {
      setShowTongue((prev) => !prev);
    }, 3000);

    // Tail wagging animation - continuous gentle wag
    const tailInterval = setInterval(() => {
      setTailWag((prev) => (prev === 0 ? 15 : prev === 15 ? -15 : 0));
    }, 400);

    return () => {
      clearInterval(tongueInterval);
      clearInterval(tailInterval);
    };
  }, [animated]);

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <svg
        viewBox="0 0 100 100"
        className={cn(sizeClasses[size])}
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        {/* Body */}
        <ellipse
          cx="50"
          cy="70"
          rx="20"
          ry="15"
          fill="white"
          stroke="#2d3748"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Head */}
        <circle
          cx="50"
          cy="40"
          r="22"
          fill="white"
          stroke="#2d3748"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Left ear */}
        <path
          d="M 35 25 Q 25 20 20 35 Q 25 45 35 40 Q 40 35 35 25"
          fill="#4a5568"
          stroke="#2d3748"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Right ear */}
        <path
          d="M 65 25 Q 75 20 80 35 Q 75 45 65 40 Q 60 35 65 25"
          fill="#4a5568"
          stroke="#2d3748"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Eyes */}
        <circle cx="43" cy="35" r="2" fill="#2d3748" />
        <circle cx="57" cy="35" r="2" fill="#2d3748" />

        {/* Nose */}
        <ellipse
          cx="50"
          cy="47"
          rx="5"
          ry="4"
          fill="#2d3748"
          stroke="#2d3748"
          strokeWidth="2"
        />

        {/* Nose highlight */}
        <ellipse cx="48" cy="45" rx="1.5" ry="1" fill="white" />

        {/* Mouth */}
        <path
          d="M 50 53 Q 45 57 40 55"
          stroke="#2d3748"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50 53 Q 55 57 60 55"
          stroke="#2d3748"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tongue */}
        {showTongue && (
          <ellipse
            cx="50"
            cy="60"
            rx="3"
            ry="6"
            fill="#ef4444"
            stroke="#2d3748"
            strokeWidth="2"
          />
        )}

        {/* Front legs only */}
        <rect
          x="42"
          y="75"
          width="6"
          height="12"
          fill="white"
          stroke="#2d3748"
          strokeWidth="2"
          rx="3"
        />
        <rect
          x="52"
          y="75"
          width="6"
          height="12"
          fill="white"
          stroke="#2d3748"
          strokeWidth="2"
          rx="3"
        />

        {/* Red collar */}
        <ellipse
          cx="50"
          cy="65"
          rx="18"
          ry="4"
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="1"
        />
        <circle
          cx="55"
          cy="65"
          r="2"
          fill="#fbbf24"
          stroke="#d97706"
          strokeWidth="1"
        />

        {/* Tail */}
        <ellipse
          cx="75"
          cy="65"
          rx="6"
          ry="3"
          fill="#4a5568"
          stroke="#2d3748"
          strokeWidth="2"
          style={{
            transformOrigin: "70px 65px",
            transform: `rotate(${tailWag}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </svg>
    </div>
  );
}
