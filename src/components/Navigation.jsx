import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'My Letter', href: '#letter' },
    { name: 'Our Memories', href: '#memories' },
    { name: 'One Last Surprise', href: '#surprise' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className={`romantic-nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand / Title */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')} 
          className="nav-brand"
          aria-label="Go to top"
        >
          <span className="brand-text">Nagamahisha Reddy</span>
          <span className="brand-heart-pulse" aria-hidden="true">
            <Heart size={16} fill="#E63946" color="#E63946" />
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X size={24} color="#B91C32" /> : <Menu size={24} color="#000000" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`nav-mobile-drawer ${isOpen ? 'drawer-open' : ''}`} aria-hidden={!isOpen}>
        <div className="drawer-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="drawer-link"
            >
              <Sparkles size={14} className="drawer-icon" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

