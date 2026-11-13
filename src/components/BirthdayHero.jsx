import React from 'react';
import { Heart, Calendar, ChevronDown, RotateCcw, Mail, Image as ImageIcon, Gift } from 'lucide-react';
import AnimatedEnvelope from './AnimatedEnvelope';

export default function BirthdayHero({ isLetterOpen, onOpenLetter, onReplayIntro }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="birthday-hero-section">
      <div className="hero-content-wrapper">
        {/* Top Controls: Date Badge & Replay Intro Option */}
        <div className="hero-top-bar">
          <div className="birthday-date-badge" role="status">
            <Calendar size={14} className="date-icon" />
            <span className="date-text">20 NOVEMBER</span>
            <Heart size={13} fill="#E63946" color="#E63946" className="date-heart" />
          </div>

          {onReplayIntro && (
            <button 
              className="replay-intro-btn"
              onClick={onReplayIntro}
              aria-label="Replay cinematic opening introduction"
              title="Replay cinematic intro sequence"
            >
              <RotateCcw size={13} />
              <span>Replay Intro</span>
            </button>
          )}
        </div>

        {/* Main Heading: Exact wording, All uppercase, Bold typography, Black color, Center aligned */}
        <div className="hero-heading-block">
          <h1 className="hero-main-title">
            HAPPIEST BIRTHDAY MUMMA
          </h1>

          {/* Her Name: Exact name, Romantic deep pink / red color, Elegant typography, Decorative hearts */}
          <div className="hero-name-wrapper">
            <span className="decorative-heart left-heart" aria-hidden="true">
              <Heart size={22} fill="#E63946" color="#E63946" />
            </span>

            <h2 className="hero-person-name">
              NAGAMAHISHA REDDY
            </h2>

            <span className="decorative-heart right-heart" aria-hidden="true">
              <Heart size={22} fill="#E63946" color="#E63946" />
            </span>
          </div>

          {/* Subtext: "Today is all about you, my favourite person. ❤️" */}
          <p className="hero-subtext">
            Today is all about you, my favourite person. ❤️
          </p>
        </div>

        {/* Interactive Quick-Action Heart Buttons */}
        <div className="hero-action-buttons-group">
          <button 
            className="romantic-heart-btn letter-btn"
            onClick={onOpenLetter}
            aria-label="Open My Letter"
          >
            <Mail size={16} className="btn-icon" />
            <span>Open My Letter 💌</span>
          </button>

          <a 
            href="#memories"
            className="romantic-heart-btn memories-btn"
            onClick={(e) => scrollToSection(e, '#memories')}
            aria-label="Explore Our Memories"
          >
            <ImageIcon size={16} className="btn-icon" />
            <span>Explore Our Memories ❤️</span>
          </a>

          <a 
            href="#surprise"
            className="romantic-heart-btn surprise-btn"
            onClick={(e) => scrollToSection(e, '#surprise')}
            aria-label="One Last Surprise"
          >
            <Gift size={16} className="btn-icon" />
            <span>One Last Surprise 🫀</span>
          </a>
        </div>

        {/* Section Two: Interactive 3D Love Letter Envelope Anchor */}
        <div id="letter" className="hero-envelope-container">
          <AnimatedEnvelope 
            isLetterOpen={isLetterOpen}
            onOpenLetter={onOpenLetter}
          />
        </div>

        {/* Small Elegant Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <a 
            href="#memories" 
            onClick={(e) => scrollToSection(e, '#memories')}
            className="scroll-hint-link"
            aria-label="Scroll to memories gallery"
          >
            <span className="scroll-text">Scroll to explore our journey ❤️</span>
            <ChevronDown size={18} className="scroll-arrow-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
