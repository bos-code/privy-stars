import React from 'react';
import styles from './navbar.module.css';
import Link from 'react-router-dom';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Privy Stars</div>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>home</Link>
        <Link href="/" className={styles.navLink}>about us</Link>
        <Link href="/" className={styles.navLink}>academics</Link>
        <Link href="/" className={styles.navLink}>admissions</Link>
        <Link href="/" className={styles.navLink}>student life</Link>
        <Link href="/" className={styles.navLink}>contact</Link>
      </div>
    </div>
  );
}
