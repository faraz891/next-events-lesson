import React from 'react'
import Link from 'next/link'
import styles from "./main-header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">NextEvents</Link>
            </div>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <Link href="/events">Browse all events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
