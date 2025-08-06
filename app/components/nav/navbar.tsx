import React from 'react';
import styles from './navbar.module.css';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Privy Stars Now</div>
      <ul className={styles.navLinks}>
      <li><Link to="/" className={styles.navLink}>home</Link></li>
      <li><Link to="/" className={styles.navLink}>about us</Link></li>
      <li><Link to="/" className={styles.navLink}>academics</Link></li>
      <li><Link to="/" className={`${styles.navLink} `}>admissions</Link></li>
      <li><Link to="/" className={styles.navLink}>student life</Link></li>
      <li><Link to="/" className={styles.navLink}>contact</Link></li>
      </ul>
    </div>
  );
}
