"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './styles/page.module.css';
import MainContent from './components/mainContent';

export default function Hero() {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const MAX_BLUR = 10;

  useEffect(() => {
    // show alert once on page load
    alert('This page is under construction 🚧🏗️👷‍♂️');

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
    <section className={styles.container}>
      <div className={styles.heroSection}>
        <p className={styles.heroTitle} ref={titleRef}>portfolio</p>
        <div className={styles.heroImageGroup}>
          <Image
              className={styles.heroImage}
              src="/assets/profile_pic.png"
              alt="profile-pic"
              width={200}
              height={200}
          />
          <div className={styles.suggestion}>
              <p style={{padding: '15px 40px'}}>Scroll down to see more</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <MainContent />
      </div>
    </section>
  );
}