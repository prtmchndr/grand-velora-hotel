"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/85 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-20.5 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
        >
          <img
            src="/images/logo/logogv.png"
            alt="Grand Velora Hotel"
            className="h-20 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          <a
            href="#home"
            className="nav-link"
          >
            HOME
          </a>

          <a
            href="#rooms"
            className="nav-link"
          >
            ROOMS
          </a>

          <a
            href="#about"
            className="nav-link"
          >
            ABOUT US
          </a>

          <a
            href="#facilities"
            className="nav-link"
          >
            FACILITIES
          </a>

          <a
            href="#gallery"
            className="nav-link"
          >
            GALLERY
          </a>

          <a
            href="#contact"
            className="nav-link"
          >
            CONTACT
          </a>

          <a
            href="#booking"
            className="ml-2 inline-flex h-11 min-w-30 items-center justify-center whitespace-nowrap bg-[#C9A45C] px-5 text-xs font-semibold leading-none tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#B58E48]"
          >
            BOOK NOW
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center text-[#172033] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-[#172033] transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-[#172033] transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-[#172033] transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>

      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-125 border-t border-gray-100"
            : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-6 pt-2">

          <a
            href="#home"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            HOME
          </a>

          <a
            href="#rooms"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            ROOMS
          </a>

          <a
            href="#about"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            ABOUT US
          </a>

          <a
            href="#facilities"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            FACILITIES
          </a>

          <a
            href="#gallery"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            GALLERY
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            CONTACT
          </a>

          <a
            href="#booking"
            onClick={closeMenu}
            className="mt-3 inline-flex h-11 items-center justify-center whitespace-nowrap bg-[#C9A45C] px-6 text-xs font-semibold leading-none tracking-[0.12em] text-white transition hover:bg-[#B58E48]"
          >
            BOOK NOW
          </a>

        </div>
      </div>
    </header>
  );
}