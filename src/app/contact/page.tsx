'use client';

import SocialFanDeck from '../components/SocialFanDeck';
import styles from '../../styles/contact.module.css';

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.label}>Get in touch</p>
        <h1 className={styles.heading}>Contact</h1>
        <p className={styles.sub}>
          Open to new projects, collaborations, and conversations.
        </p>
        <a className={styles.emailLink} href="mailto:deric@example.com">
          deric@example.com
        </a>
      </header>

      <SocialFanDeck />
    </main>
  );
}