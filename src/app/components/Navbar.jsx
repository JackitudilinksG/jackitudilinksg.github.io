'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
    const pathname = usePathname() || '/'
    const [open, setOpen] = useState(false)

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
                    Jackitudilinks
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
            </div>
        </nav>
    )
}
