"use client";

import React from "react";
import SparklesText from "./Sparklestext";

const Logo = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">

      {/* Card Container (no background glow now) */}
      <div className="relative px-10 py-8 rounded-2xl 
                      backdrop-blur-xl 
                      border border-white/10">

        {/* Sparkle Text */}
        <SparklesText
          as="h1"
          className="relative z-10 text-xl md:text-2xl font-extrabold tracking-tight"
          sparkleCount={18}
          sparkleSize={20}
          colors={{ first: "#ffffff", second: "#60a5fa" }}
        >
          {/* Gradient ONLY on text */}
          <span className="bg-gradient-to-r from-indigo-600 via-sky-300 to-purple-800 
                           bg-clip-text text-transparent
                           drop-shadow-[0_0_20px_rgba(96,165,250,0.25)]">
            Anam
          </span>
        </SparklesText>

      </div>
    </div>
  );
};

export default Logo;