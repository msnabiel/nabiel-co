"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

const MarqueeBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const announcements = [
    "🎉 Free shipping on orders over $50! Use code FREESHIP",
    "⚡ Flash Sale: 30% off everything! Ends tonight",
    "✨ New arrivals just dropped - Shop now!",
    "🔥 Limited time: Buy 2 Get 1 Free on selected items",
    "💎 Premium members get extra 15% off today"
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white relative overflow-hidden">
      <div className="relative h-12 flex items-center">
        {/* Scrolling content container */}
        <div className="flex-1 overflow-hidden">
          <div 
            className="whitespace-nowrap"
            style={{
              animation: 'scrollRight 15s linear infinite'
            }}
            onMouseEnter={(e) => {
  (e.target as HTMLElement).style.animationPlayState = 'paused';
}}
onMouseLeave={(e) => {
  (e.target as HTMLElement).style.animationPlayState = 'running';
}}

          >
            {announcements.map((announcement, index) => (
              <span key={index} className="text-sm font-medium inline-block px-16">
                {announcement}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {announcements.map((announcement, index) => (
              <span key={`duplicate-${index}`} className="text-sm font-medium inline-block px-16">
                {announcement}
              </span>
            ))}
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <style>
        {`
          @keyframes scrollRight {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MarqueeBar;