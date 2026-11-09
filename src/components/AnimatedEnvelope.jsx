import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function AnimatedEnvelope({ isLetterOpen, onOpenLetter }) {
  const [isOpening, setIsOpening] = useState(false);

  const triggerHeartConfetti = () => {
    try {
      // Fire romantic confetti burst with deep reds, petal pinks, and white hearts
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#E63946', '#B91C32', '#FFB6C1', '#F06292', '#E91E63', '#FFF0F5', '#FFFFFF'],
        disableForReducedMotion: true,
      });

      // Secondary staggered bursts on both sides
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.3, y: 0.65 },
          colors: ['#E63946', '#FFB6C1', '#F06292'],
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.7, y: 0.65 },
          colors: ['#E63946', '#FFB6C1', '#B91C32'],
          disableForReducedMotion: true,
        });
      }, 250);
    } catch {
      // Graceful fallback if canvas is restricted
    }
  };

  const handleEnvelopeClick = () => {
    if (isOpening || isLetterOpen) return;

    setIsOpening(true);
    triggerHeartConfetti();

    // Sequence: 1. Zoom toward envelope -> 2. Heart seal dissolves -> 3. Flap flips open backward -> 4. Letter emerges -> 5. Full letter unfolds
    setTimeout(() => {
      onOpenLetter();
      setIsOpening(false);
    }, 750);
  };

  const isFlapOpen = isOpening || isLetterOpen;

  return (
    <div className="envelope-section">
      <div 
        className={`envelope-wrapper ${isFlapOpen ? 'open' : ''} ${isOpening ? 'is-zooming-open' : ''}`}
        onClick={handleEnvelopeClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEnvelopeClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Open birthday surprise love letter"
      >
        <div className="envelope-3d-scene">
          {/* Back Paper of Envelope */}
          <div className="envelope-back"></div>

          {/* Letter Peeking & Emerging From Inside */}
          <div className={`envelope-letter-preview ${isFlapOpen ? 'slide-up-emerge' : ''}`}>
            <div className="preview-top-line">
              <span className="mini-heart">❤️</span>
              <span className="mini-salutation">For Naga Maneesha Reddy</span>
              <span className="mini-heart">❤️</span>
            </div>
            <div className="preview-text-skeleton">
              <span className="skel-line full"></span>
              <span className="skel-line mid"></span>
              <span className="skel-line short"></span>
            </div>
            <div className="preview-seal-hint">
              <Sparkles size={14} className="sparkle-hint" />
            </div>
          </div>

          {/* Pocket Lower Triangles */}
          <div className="envelope-pocket"></div>

          {/* Envelope Top Flap with 3D Backward Rotate */}
          <div className={`envelope-flap ${isFlapOpen ? 'flap-opened' : ''}`}>
            <div className="flap-triangle"></div>
          </div>

          {/* Wax Heart Seal in Center with Glowing Aura */}
          <div className={`envelope-heart-seal ${isFlapOpen ? 'seal-dissolve' : ''}`}>
            <div className="seal-heart-inner">
              <Heart size={22} fill="#E63946" color="#FFFFFF" strokeWidth={1.5} />
            </div>
            <span className="seal-glow-aura" aria-hidden="true"></span>
          </div>
        </div>

        {/* Floating Sparkles & Hearts around envelope */}
        <div className="envelope-sparkles" aria-hidden="true">
          <span className="env-sparkle sp-1">✨</span>
          <span className="env-sparkle sp-2">💖</span>
          <span className="env-sparkle sp-3">✨</span>
          <span className="env-sparkle sp-4">🌸</span>
        </div>
      </div>

      {/* Instruction below envelope as requested */}
      <div className="envelope-instructions">
        <p className="instruction-text">
          Open your little surprise, Mumma 💌
        </p>
      </div>
    </div>
  );
}
