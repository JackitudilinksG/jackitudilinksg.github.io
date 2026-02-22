'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/main.module.css';
import getCurrentDateFormatted from './date';
import Image from 'next/image';
import GitHubContributions from './GitHubContributions';

export default function MainContent() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(getCurrentDateFormatted());
  }, []);

  return (
    <section>
      <div className={styles.topText}>
        <h1>Main Content Area</h1>
        <p>This is where the main content of the application will be displayed.</p>
      </div>

      <div className={styles.CTA}>
        <div className={styles.ctaContent}>
          <p className={styles.date}>{date}</p>
          <div className={styles.secondContent}>
            <h1>Second Content Area</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
              Sit amet consectetur adipiscing elit quisque faucibus ex.
            </p>
          </div>
          <div className={styles.ctaButton}>
            <h2>Read More →</h2>
          </div>
        </div>

        <div className={styles.ctaImage}>
          <Image
            src="/assets/ctaImage.png"
            alt="Under Construction"
            width={562}
            height={398}
          />
        </div>
      </div>
      <GitHubContributions />
    </section>
  );
}