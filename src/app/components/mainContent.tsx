'use Client';
import React from 'react';
import styles from '../styles/main.module.css';
import getCurrentDateFormatted from './date';
import Image from 'next/image'

export default function MainContent() {
  const date = getCurrentDateFormatted();

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
            <p>This is where the secondary content of the application will be displayed.</p>
          </div>
          <div className={styles.ctaButton}>
            <h2>Click Me!</h2>
          </div>
        </div>
        <div className={styles.ctaImage}>
          <Image
            src="/assets/ctaImage.png"
            alt="Under Construction"
            width={703/1.25}
            height={497/1.25}
          />
        </div>
      </div>
    </section>
  );
}