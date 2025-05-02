"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  
  const titleRef = useRef<HTMLParagraphElement>(null);
  const MAX_BLUR = 20;

  useEffect(() => {
    const handleScroll = () => {
      var scrollY = window.scrollY;
      var saveScrollY = scrollY;
      scrollY = saveScrollY + window.scrollY;
      // Map scroll position to a blur radius (0–MAX_BLUR px)
      const blurValue = Math.min(saveScrollY / 50, MAX_BLUR);
      if (titleRef.current) {
        titleRef.current.style.filter = `blur(${blurValue}px)`;
      }

      if (blurValue < MAX_BLUR) {
        window.scrollTo(0, 0);
      } else {
        // Blur complete: remove listener to restore normal scrolling
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    alert('This page is currently under development');
  }, []);

  return (
    <section id="hero-div">
      <p id="hero-title" ref={titleRef}>
        portfolio
      </p>

      <Image
        id="hero-image"
        src="/assets/profile_pic.png"
        alt="profile-pic"
        width={200}
        height={200}
      />
    </section>
  );
}
