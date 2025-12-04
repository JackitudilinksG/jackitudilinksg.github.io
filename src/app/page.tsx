"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Hero() {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const MAX_BLUR = 10;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blurValue = Math.min(scrollY / 50, MAX_BLUR);

      if (titleRef.current) {
        titleRef.current.style.filter = `blur(${blurValue}px)`;
      }
    };

    // Attach listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset blur on unmount
      if (titleRef.current) {
        titleRef.current.style.filter = '';
      }
    };
  }, []);

  return (
    <section id="container" className={styles.world}>
      <div id='hero-section'>
        <p id="hero-title" ref={titleRef}>portfolio</p>
        <Image
          id="hero-image"
          src="/assets/profile_pic.png"
          alt="profile-pic"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.content}>
        <p>HELLO WORLD</p>
      </div>
      {/* …other content below… */}
    </section>
  );
}
