import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => setIsOpen(false); // ✅ fix

  return (
    <div
      className={`${styles.navbar} flex items-center justify-between relative`}
    >
      {/* Logo */}
      <div className={`${styles.logo} px-5 py-4 md:px-7 bg-primary`}>
        <span>Privy Stars</span>
      </div>

      {/* Desktop Nav */}
      <ul className={`${styles.navLinks} hidden lg:flex`}>
        {[
          "home",
          "about us",
          "academics",
          "admissions",
          "student life",
          "contact",
        ].map((label) => (
          <li key={label}>
            <Link
              to="/"
              className={`${styles.navLink} hover:bg-success text-base-content px-5 py-4 md:px-7 active:bg-primary`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger for Mobile */}
      <div className="lg:hidden px-5">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer for Mobile Nav */}
      <div
        className={`fixed top-0 right-0 h-full w-[50vw] max-w-sm bg-primary z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeDrawer} aria-label="Close Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Links with Slant Hover Animation */}
        <ul className="space-y-4 p-4">
          {[
            "home",
            "about us",
            "academics",
            "admissions",
            "student life",
            "contact",
          ].map((label) => (
            <li key={label} className="relative overflow-hidden group">
              <Link
                to="/"
                onClick={closeDrawer}
                className={`${styles.navlink} relative block px-5 py-3 text-white group`}
              >
                {/* Background behind text */}
                <span className="absolute inset-0 origin-left transform -skew-x-12 scale-x-0 bg-white group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                {/* Text label */}
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
