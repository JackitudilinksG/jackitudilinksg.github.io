'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import { useTheme } from '../contexts/ThemeContext'

export default function Navbar() {
    const pathname = usePathname() || '/'
    const [open, setOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
                    <Image
                        src="/assets/Logo_colour.png"
                        alt="Description of the image"
                        width={33.8}
                        height={29.5}
                        priority
                    />
                </Link>

                <button
                    className={styles.menuToggle}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen(prev => !prev)}
                >
                    <span className={`${styles.hamburger} ${open ? styles.open : ''}`} />
                </button>

                <ul className={`${styles.links} ${open ? styles.open : ''}`}>
                    {links.map(({ href, label }) => {
                        const active = pathname === href
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={active ? styles.active : ''}
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    )
}
