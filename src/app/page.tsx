"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const MAX_BLUR = 10;

  useEffect(() => {
    const handleScroll = () => {
      // 1. Get the current scroll offset
      const scrollY = window.scrollY;

      // 2. Map scrollY to blur: e.g. 0px blur at top, MAX_BLUR px at 50*MAX_BLUR px down
      const blurValue = Math.min(scrollY / 50, MAX_BLUR);

      // 3. Apply the blur; decreasing when scrollY decreases
      if (titleRef.current) {
        titleRef.current.style.filter = `blur(${blurValue}px)`;
      }
    };

    // Attach listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset blur on unmount
      if (titleRef.current) {
        titleRef.current.style.filter = '';
      }
    };
  }, []);

  return (
    <section id="hero-div" className="relative h-screen overflow-auto">
      <p
        id="hero-title"
        ref={titleRef}
        className="fixed top-1/2 left-1/2 z-10 text-[15vw] font-bold transform -translate-x-1/2 -translate-y-1/2"
      >
        portfolio
      </p>

      <Image
        id="hero-image"
        src="/assets/profile_pic.png"
        alt="profile-pic"
        width={200}
        height={200}
        className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2"
      />

      {/* …other content below… */}
    </section>
  );
}
