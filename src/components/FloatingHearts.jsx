import React from 'react';

const ROMANTIC_PALETTE = [
  '#E63946', // Heart red
  '#B91C32', // Dark red
  '#E91E63', // Deep rose
  '#F06292', // Romantic pink
  '#FFB6C1', // Light pink
  '#FF85A2', // Petal pink
  '#FFA6C9', // Soft pastel pink
  '#FF3366', // Bright rose
];

// Pre-computed organic floating items (mix of hearts & delicate sparkles)
const ADVANCED_FLOATING_ITEMS = Array.from({ length: 48 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const ratio = seed / 233280;
  const ratio2 = ((i * 12345 + 6789) % 233280) / 233280;
  const ratio3 = ((i * 54321 + 9876) % 233280) / 233280;

  const size = Math.floor(ratio * 20) + 12; // 12px to 32px
  const duration = (ratio2 * 7 + 7).toFixed(2); // 7s to 14s
  const delay = (-ratio * 15).toFixed(2); // staggered negative delay
  const left = ((i * 2.1) % 96 + 2).toFixed(2); // 2% to 98%
  const drift = Math.floor(ratio2 * 70) - 35; // -35px to +35px
  const spin = Math.floor(ratio * 50) - 25; // -25deg to +25deg
  const opacity = (ratio3 * 0.35 + 0.28).toFixed(2); // 0.28 to 0.63 soft transparency
  const color = ROMANTIC_PALETTE[i % ROMANTIC_PALETTE.length];
  const isSparkle = i % 5 === 0;
  const hasGlow = i % 3 === 0;

  return {
    id: i,
    size,
    duration,
    delay,
    left,
    drift,
    spin,
    opacity,
    color,
    isSparkle,
    hasGlow,
  };
});

export default function FloatingHearts() {
  return (
    <div className="ambient-floating-hearts-layer" aria-hidden="true">
      {ADVANCED_FLOATING_ITEMS.map((item) => (
        <div
          key={item.id}
          className={`floating-heart-item ${item.hasGlow ? 'glow-heart' : ''}`}
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            '--drift-x': `${item.drift}px`,
            '--rot-deg': `${item.spin}deg`,
            '--target-opacity': item.opacity,
          }}
        >
          {item.isSparkle ? (
            <span
              style={{
                fontSize: `${item.size}px`,
                color: item.color,
                display: 'block',
                lineHeight: 1,
                filter: `drop-shadow(0 0 6px ${item.color}80)`,
              }}
            >
              ✨
            </span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill={item.color}
              style={{
                filter: item.hasGlow ? `drop-shadow(0 2px 8px ${item.color}66)` : `drop-shadow(0 1px 3px ${item.color}33)`,
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
