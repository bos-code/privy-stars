import React from 'react';
import styles from './navbar.module.css';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Privy Stars</div>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>home</Link>
        <Link to="/" className={styles.navLink}>about us</Link>
        <Link to="/" className={styles.navLink}>academics</Link>
        <Link to="/" className={styles.navLink}>admissions</Link>
        <Link to="/" className={styles.navLink}>student life</Link>
        <Link to="/" className={styles.navLink}>contact</Link>
      </div>
    </div>
  );
}
