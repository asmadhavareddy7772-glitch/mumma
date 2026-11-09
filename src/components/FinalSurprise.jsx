import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, RotateCcw } from 'lucide-react';

export default function FinalSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [surpriseStep, setSurpriseStep] = useState(0);

  const handleReveal = () => {
    setIsRevealed(true);
    setSurpriseStep(1); // Step 1: Dreamy pale-pink atmosphere

    // Step 2 & 3: Large beating heart appears
    setTimeout(() => {
      setSurpriseStep(2);
    }, 600);

    // Step 4: Small red and pink hearts burst outward
    setTimeout(() => {
      setSurpriseStep(3);
      triggerCelebrationConfetti();
    }, 1400);

    // Step 5: Reveal quote message
    setTimeout(() => {
      setSurpriseStep(4);
    }, 2400);

    // Step 6: Reveal "HAPPIEST BIRTHDAY, MY LOVE ❤️"
    setTimeout(() => {
      setSurpriseStep(5);
    }, 3600);

    // Step 7: Reveal "Forever yours. 🫂🫀"
    setTimeout(() => {
      setSurpriseStep(6);
    }, 4600);
  };

  const triggerCelebrationConfetti = () => {
    try {
      const count = 220;
      const defaults = {
        origin: { y: 0.65 },
        disableForReducedMotion: true,
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          colors: ['#E63946', '#B91C32', '#FFB6C1', '#F06292', '#E91E63', '#FFF0F5', '#FF85A2'],
        });
      }

      fire(0.25, {
        spread: 30,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.9,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 130,
        startVelocity: 45,
      });
    } catch {
      // Safe fallback
    }
  };

  const handleReset = () => {
    setIsRevealed(false);
    setSurpriseStep(0);
  };

  return (
    <section id="surprise" className={`final-surprise-section ${isRevealed ? 'dreamy-pink-atmosphere' : ''}`}>
      <div className="section-container">
        {/* Section Heading */}
        <div className="surprise-header-block">
          <div className="surprise-badge">
            <Gift size={14} className="badge-icon" />
            <span>The Grand Finale</span>
            <Sparkles size={14} className="badge-icon" />
          </div>

          <h2 className="surprise-main-heading">
            ONE LAST THING, MUMMA ❤️
          </h2>
        </div>

        {/* Interactive Surprise Card Area */}
        <div className="surprise-card-wrapper">
          {!isRevealed ? (
            <div className="surprise-prompt-card">
              <div className="prompt-heart-halo">
                <Heart size={48} fill="#FFF0F5" color="#E63946" strokeWidth={1.5} className="pulse-heart" />
              </div>
              <p className="prompt-teaser-text">
                There is one final secret held in my heart, just for you...
              </p>
              <button
                className="surprise-trigger-btn"
                onClick={handleReveal}
                aria-label="Click for one last surprise"
              >
                <Sparkles size={18} className="btn-icon" />
                <span>Click for one last surprise 💌</span>
                <Heart size={16} fill="#FFFFFF" color="#FFFFFF" className="btn-icon" />
              </button>
            </div>
          ) : (
            <div className="surprise-revealed-card cinematic-reveal-staged" role="region" aria-live="polite">
              {/* Step 2 & 3: Large Heart slowly beats with glowing aura */}
              {surpriseStep >= 2 && (
                <div className="revealed-heart-halo">
                  <span className="orbit-heart heart-1">❤️</span>
                  <span className="orbit-heart heart-2">💖</span>
                  <span className="orbit-heart heart-3">✨</span>
                  <div className="center-beating-heart">
                    <Heart size={68} fill="#E63946" color="#B91C32" className="beating-heart-svg" />
                    <span className="beating-glow-aura"></span>
                  </div>
                </div>
              )}

              {/* Step 5: Reveal exact message */}
              {surpriseStep >= 4 && (
                <div className="revealed-message-container fade-in-bloom">
                  <blockquote className="revealed-romantic-quote">
                    "If I could choose again, I'd still choose you.
                    <br />
                    In every lifetime, in every situation, my heart would find you. ❤️"
                  </blockquote>
                </div>
              )}

              {/* Step 6: Display "HAPPIEST BIRTHDAY, MY LOVE ❤️" */}
              {surpriseStep >= 5 && (
                <div className="surprise-birthday-shoutout fade-in-scale">
                  <h3 className="birthday-love-title">
                    HAPPIEST BIRTHDAY, MY LOVE ❤️
                  </h3>
                </div>
              )}

              {/* Step 7: Final Dedication: "Forever yours. 🫂🫀" */}
              {surpriseStep >= 6 && (
                <div className="revealed-signature-block fade-in-slide">
                  <p className="revealed-signoff">Forever yours. 🫂🫀</p>
                  <p className="revealed-dedication">Naga Maneesha Reddy & Madhava Reddy</p>
                </div>
              )}

              {/* Replay Option */}
              {surpriseStep >= 6 && (
                <button
                  className="surprise-replay-btn"
                  onClick={handleReset}
                  aria-label="Close and replay surprise"
                >
                  <RotateCcw size={15} />
                  <span>Replay Surprise</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
