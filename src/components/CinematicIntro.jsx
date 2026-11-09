import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, FastForward } from 'lucide-react';

export default function CinematicIntro({ onComplete }) {
  // Step tracking: 1 = glowing particles, 2 = floating hearts, 3 = "Someone special...", 4 = "HAPPIEST BIRTHDAY MUMMA", 5 = "NAGA MANEESHA REDDY", 6 = Glowing Heart, 7 = Complete
  const [step, setStep] = useState(1);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedName, setDisplayedName] = useState('');

  const FULL_TITLE = "HAPPIEST BIRTHDAY MUMMA";
  const FULL_NAME = "NAGA MANEESHA REDDY";

  useEffect(() => {
    // Timeline orchestration
    const t1 = setTimeout(() => setStep(2), 600);   // Step 2: floating hearts appear
    const t2 = setTimeout(() => setStep(3), 1300);  // Step 3: "Someone special..."
    const t3 = setTimeout(() => setStep(4), 2800);  // Step 4: Title reveal starts
    const t4 = setTimeout(() => setStep(5), 4500);  // Step 5: Name reveal starts
    const t5 = setTimeout(() => setStep(6), 6200);  // Step 6: Glowing heart appears
    const t6 = setTimeout(() => {
      setStep(7);
      setTimeout(() => onComplete(), 700);
    }, 7600); // Step 7: Transition into main page

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  // Letter-by-letter reveal for HAPPIEST BIRTHDAY MUMMA
  useEffect(() => {
    if (step >= 4) {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setDisplayedTitle(FULL_TITLE.slice(0, index));
        if (index >= FULL_TITLE.length) {
          clearInterval(interval);
        }
      }, 55);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Typewriter reveal for NAGA MANEESHA REDDY
  useEffect(() => {
    if (step >= 5) {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setDisplayedName(FULL_NAME.slice(0, index));
        if (index >= FULL_NAME.length) {
          clearInterval(interval);
        }
      }, 65);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleSkip = () => {
    setStep(7);
    onComplete();
  };

  return (
    <div className={`cinematic-intro-overlay ${step === 7 ? 'fade-out-intro' : ''}`} role="dialog" aria-label="Birthday Introduction Sequence">
      {/* Skip Button */}
      <button 
        className="intro-skip-btn" 
        onClick={handleSkip} 
        aria-label="Skip introduction"
        title="Skip intro to letter"
      >
        <span>Skip Intro</span>
        <FastForward size={14} />
      </button>

      {/* Step 1 & 2: Ambient Glowing Particles & Floating Hearts */}
      <div className="intro-particles-container" aria-hidden="true">
        <span className="glow-dot dot-1"></span>
        <span className="glow-dot dot-2"></span>
        <span className="glow-dot dot-3"></span>
        <span className="glow-dot dot-4"></span>
        <span className="glow-dot dot-5"></span>

        {step >= 2 && (
          <>
            <span className="intro-heart ih-1">💖</span>
            <span className="intro-heart ih-2">❤️</span>
            <span className="intro-heart ih-3">✨</span>
            <span className="intro-heart ih-4">🌸</span>
            <span className="intro-heart ih-5">💕</span>
          </>
        )}
      </div>

      <div className="intro-content-stage">
        {/* Step 3: "Someone special deserves something special..." with blur-to-clear */}
        <div className={`intro-teaser-text ${step >= 3 && step < 5 ? 'visible blur-clear' : ''} ${step >= 5 ? 'fade-teaser-up' : ''}`}>
          <Sparkles size={16} className="teaser-sparkle" />
          <span>Someone special deserves something special...</span>
          <Sparkles size={16} className="teaser-sparkle" />
        </div>

        {/* Step 4: "HAPPIEST BIRTHDAY MUMMA" */}
        {step >= 4 && (
          <h1 className="intro-main-title scale-up-glow">
            {displayedTitle}
            <span className="intro-cursor-caret">|</span>
          </h1>
        )}

        {/* Step 5: "NAGA MANEESHA REDDY" */}
        {step >= 5 && (
          <h2 className="intro-person-name typewriter-glow">
            {displayedName}
          </h2>
        )}

        {/* Step 6: Glowing Animated Heart underneath */}
        {step >= 6 && (
          <div className="intro-glowing-heart-wrapper">
            <Heart size={44} fill="#E63946" color="#B91C32" className="intro-beating-heart" />
            <span className="intro-heart-aura"></span>
          </div>
        )}
      </div>
    </div>
  );
}

