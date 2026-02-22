import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <p className={styles.columnLabel}>Sections</p>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div className={styles.column}>
                    <p className={styles.columnLabel}>Socials</p>
                    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://github.com/JackitudilinksG" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/deric-jojo-0594a7271/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>© {new Date().getFullYear()} Deric Jojo. All rights reserved.</p>
            </div>
            <div className={styles.bigTextWrapper}>
                <p className={styles.bigText}>DERIC JOJO</p>
            </div>
        </footer>
    );
}