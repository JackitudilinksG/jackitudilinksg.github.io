"use client";
import Image from 'next/image'

import React, { useEffect, useRef } from 'react'

export default function Hero() {
  const blocksRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const blocks = blocksRef.current
    let latestScroll = 0
    let ticking = false

    interface BlockElement extends HTMLAnchorElement {
      dataset: {
      depth: string;
      };
    }

    const updateParallax = (scrollY: number) => {
      (blocks as BlockElement[]).forEach((block) => {
      if (!block) return;
      const depth = parseFloat(block.dataset.depth);
      const scale = 1 + scrollY * depth * 0.0007;
      const translateY = scrollY * depth * 0.3;
      block.style.transform = `translateY(-${translateY}px) scale(${scale})`;
      });
    };

    const onScroll = () => {
      latestScroll = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax(latestScroll)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    updateParallax(window.scrollY)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
    <h3>this page is currently under development</h3>
      <div id='hero-div'>
        <p id='hero-title'>portfolio</p>
        <Image
          id='hero-image'
          src='/assets/profile_pic.png'
          alt='profile-pic'
          width={150}
          height={150}
        />
      </div>
    </div>
  )
}
