import React, { useEffect, useRef, useState } from 'react';
import { X, Heart, Sparkles, MailOpen, FastForward } from 'lucide-react';

const FULL_LETTER_CONTENT = "Happiest birthday, my love. I don't know how I fell for you and how you fell for me. But trust me, I'll never leave your hand until my last breath. I'll be with you even if the whole world is against you. And I promise you, I'll stand beside you whether the situations are good or bad. I know our ages are different, but that thing is never gonna be a problem for us. Just trust the process. I'm believing that everything is happening for a reason, so let it continue. Be careful, take care of your health, eat well and study well. I'll never do anything that's gonna hurt you. I've fallen for you, I'm believing that you are the one for me. Thank you for choosing me. I love you so much, mumma💋. Once again, happiest birthday, mine🫂🫀.";

export default function LoveLetter({ isOpen, onClose }) {
  const letterRef = useRef(null);
  const [charCount, setCharCount] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll and trigger smooth typewriter progression
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    if (letterRef.current) {
      letterRef.current.scrollTop = 0;
    }

    const timer = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= FULL_LETTER_CONTENT.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 16);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInstantReveal = () => {
    setCharCount(FULL_LETTER_CONTENT.length);
  };

  if (!isOpen) return null;

  const isTypingComplete = charCount >= FULL_LETTER_CONTENT.length;
  const displayedText = FULL_LETTER_CONTENT.slice(0, charCount);

  return (
    <div
      className="love-letter-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
    >
      <div
        className="love-letter-paper paper-unfold-animation"
        onClick={(e) => e.stopPropagation()}
        ref={letterRef}
      >
        {/* Subtle Floating Sparkles on Paper */}
        <div className="letter-paper-sparkles" aria-hidden="true">
          <Sparkles size={16} className="paper-sparkle ps-1" />
          <Sparkles size={14} className="paper-sparkle ps-2" />
          <Sparkles size={18} className="paper-sparkle ps-3" />
        </div>

        {/* Top bar with stamp badge & actions */}
        <div className="letter-top-bar">
          <div className="letter-stamp-badge">
            <span className="stamp-heart">💌</span>
            <span className="stamp-text">20 November</span>
          </div>

          <div className="letter-top-buttons">
            {!isTypingComplete && (
              <button
                className="letter-skip-btn"
                onClick={handleInstantReveal}
                aria-label="Reveal complete letter immediately"
                title="Show entire letter instantly"
              >
                <span>Read Full Letter</span>
                <FastForward size={14} />
              </button>
            )}

            <button
              className="letter-close-btn"
              onClick={onClose}
              aria-label="Close love letter"
              title="Fold and close letter"
            >
              <X size={18} />
              <span className="close-text">Close</span>
            </button>
          </div>
        </div>

        {/* Decorative Romantic Header with Top Heart */}
        <div className="letter-header">
          <div className="heart-divider">
            <span className="line"></span>
            <div className="letter-heart-halo">
              <Heart size={24} className="letter-heart-icon" fill="#E63946" color="#B91C32" />
            </div>
            <span className="line"></span>
          </div>
          <h2 id="letter-title" className="letter-salutation">
            My Dearest Nagamahisha Reddy,
          </h2>
        </div>

        {/* Exact, Untouched Love Letter Content with Gentle Typewriter & Unfold */}
        <div className="letter-body-content">
          <p className="letter-paragraph">
            {displayedText}
            {!isTypingComplete && <span className="typewriter-caret">|</span>}
          </p>
        </div>

        {/* Romantic Sign-off Section */}
        <div className="letter-footer">
          <div className="footer-heart-symbol">
            <Sparkles size={16} className="sparkle-icon" />
            <Heart size={18} fill="#E63946" color="#E63946" className="footer-mini-heart" />
            <Sparkles size={16} className="sparkle-icon" />
          </div>

          <p className="final-romantic-msg">
            Forever grateful that you came into my life. 💗
          </p>

          <p className="final-signoff">
            With all my love, Mumma
          </p>

          {/* Small animated glowing heart at the end of the letter as specified */}
          <div className="letter-end-glowing-heart" aria-label="Forever beating heart">
            <Heart size={26} fill="#E63946" color="#B91C32" className="end-beating-heart-svg" />
            <span className="end-heart-glow-ring"></span>
          </div>
        </div>

        {/* Action Button to Fold & Close */}
        <div className="letter-bottom-actions">
          <button
            className="fold-close-btn"
            onClick={onClose}
            aria-label="Fold and close letter"
          >
            <MailOpen size={18} />
            <span>Fold & Put Back into Envelope 💌</span>
          </button>
        </div>
      </div>
    </div>
  );
}
