import React, { useState, useEffect, useRef } from 'react';

const TRAIL_COLORS = ['#E63946', '#FFB6C1', '#F06292', '#E91E63', '#FF85A2', '#B91C32'];

export default function RomanticCursor() {
  const [particles, setParticles] = useState([]);
  const [clickBursts, setClickBursts] = useState([]);
  const lastMoveTimeRef = useRef(0);
  const isFinePointerRef = useRef(false);

  useEffect(() => {
    isFinePointerRef.current = window.matchMedia('(pointer: fine)').matches;

    // Desktop: Subtle trailing heart particles following cursor
    const handleMouseMove = (e) => {
      if (!isFinePointerRef.current) return;

      const now = Date.now();
      if (now - lastMoveTimeRef.current < 45) return; // throttle to ~22fps for silky lightweight rendering
      lastMoveTimeRef.current = now;

      // Random particle characteristics
      const isSparkle = Math.random() > 0.65;
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      const size = Math.floor(Math.random() * 8) + 10;
      const particleId = `${now}-${Math.random()}`;

      const newParticle = {
        id: particleId,
        x: e.clientX,
        y: e.clientY,
        size,
        color,
        isSparkle,
        driftX: (Math.random() - 0.5) * 30,
      };

      setParticles((prev) => [...prev.slice(-14), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particleId));
      }, 750);
    };

    // Both desktop & touch: Romantic heart burst on click/tap
    const handlePointerDown = (e) => {
      // Don't burst over interactive form elements or envelope interior
      if (e.target.closest('input, textarea, .envelope-letter-preview')) return;

      const burstId = Date.now() + Math.random();
      const count = isFinePointerRef.current ? 6 : 4;
      const burstParticles = Array.from({ length: count }, (_, i) => ({
        id: `${burstId}-${i}`,
        angle: (i * (360 / count)) + (Math.random() * 20 - 10),
        dist: Math.random() * 32 + 22,
        color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        size: Math.floor(Math.random() * 6) + 12,
      }));

      const burst = {
        id: burstId,
        x: e.clientX,
        y: e.clientY,
        particles: burstParticles,
      };

      setClickBursts((prev) => [...prev.slice(-6), burst]);

      setTimeout(() => {
        setClickBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 850);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="romantic-cursor-layer" aria-hidden="true">
      {/* Floating Cursor Trail */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="cursor-trail-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            color: p.color,
            fontSize: `${p.size}px`,
            '--drift-x': `${p.driftX}px`,
          }}
        >
          {p.isSparkle ? '✨' : '💖'}
        </span>
      ))}

      {/* Click / Tap Bursts */}
      {clickBursts.map((b) => (
        <div
          key={b.id}
          className="cursor-burst-container"
          style={{ left: `${b.x}px`, top: `${b.y}px` }}
        >
          {b.particles.map((p) => (
            <span
              key={p.id}
              className="cursor-burst-item"
              style={{
                '--angle': `${p.angle}deg`,
                '--dist': `${p.dist}px`,
                color: p.color,
                fontSize: `${p.size}px`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

