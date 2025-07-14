"use client";
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = [
    {
      text: "🎉 Free shipping on orders over $50! Use code FREESHIP",
      bgColor: "bg-blue-600",
      textColor: "text-white"
    },
    {
      text: "⚡ Flash Sale: 30% off everything! Ends tonight",
      bgColor: "bg-red-600",
      textColor: "text-white"
    },
    {
      text: "✨ New arrivals just dropped - Shop now!",
      bgColor: "bg-purple-600",
      textColor: "text-white"
    }
  ];

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  // Auto-rotate announcements every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(nextAnnouncement, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div className={`${currentAnnouncement.bgColor} ${currentAnnouncement.textColor} relative transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left arrow - hidden on mobile */}
          <button
            onClick={prevAnnouncement}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Announcement content */}
          <div className="flex-1 text-center">
            <p className="text-sm font-medium animate-pulse">
              {currentAnnouncement.text}
            </p>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Right arrow - hidden on mobile */}
            <button
              onClick={nextAnnouncement}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots indicator */}
            <div className="flex space-x-1">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-opacity ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to announcement ${index + 1}`}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors ml-2"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;