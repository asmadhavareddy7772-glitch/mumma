import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const NOTE_FREQS = {
  C3: 130.81, E3: 164.81, G3: 196.00,
  A3: 220.00, B3: 246.94, C4: 261.63,
  D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25,
  G5: 783.99,
};

const MELODY = [
  { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'C5', dur: 2 },
  { note: 'B4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 2 },
  { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'F4', dur: 2 },
  { note: 'E4', dur: 1 }, { note: 'D4', dur: 1 }, { note: 'C4', dur: 2 },
  { note: 'C4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'E4', dur: 1 },
  { note: 'D4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'B4', dur: 2 },
  { note: 'C5', dur: 3 }, { note: null, dur: 1 },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [usingAudioFile, setUsingAudioFile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const audioElRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timeoutRef = useRef(null);
  const stepIndexRef = useRef(0);

  const playSynthesizedNote = (freq, durationMs) => {
    if (!audioCtxRef.current || !freq) return;

    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 2, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000) * 1.6);

      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.04, now + 0.04);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000) * 1.2);

      osc.connect(gain);
      subOsc.connect(subGain);

      gain.connect(filter);
      subGain.connect(filter);
      filter.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);

      const stopTime = now + (durationMs / 1000) * 1.8;
      osc.stop(stopTime);
      subOsc.stop(stopTime);
    } catch {
      // safe cleanup
    }
  };

  const scheduleNextSynthesizerNote = () => {
    if (!isPlayingRef.current) return;

    const currentStep = MELODY[stepIndexRef.current % MELODY.length];
    stepIndexRef.current += 1;

    const beatDuration = 520;
    const noteTime = currentStep.dur * beatDuration;

    if (currentStep.note && NOTE_FREQS[currentStep.note]) {
      playSynthesizedNote(NOTE_FREQS[currentStep.note], noteTime);
    }

    timeoutRef.current = setTimeout(() => {
      scheduleNextSynthesizerNote();
    }, noteTime);
  };

  const startPlayback = async () => {
    if (!audioElRef.current) {
      const audio = new Audio('/music/romantic-track.mp3');
      audio.loop = true;
      audio.volume = 0.6;
      audioElRef.current = audio;
    }

    try {
      await audioElRef.current.play();
      setUsingAudioFile(true);
      isPlayingRef.current = true;
      setIsPlaying(true);
    } catch {
      // Audio file not present or network blocked -> fallback to synthesized romantic music box
      setUsingAudioFile(false);

      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);
      stepIndexRef.current = 0;
      scheduleNextSynthesizerNote();
    }
  };

  const stopPlayback = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (audioElRef.current) {
      audioElRef.current.pause();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3800);
    }
  };

  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="music-player-fixed-container">
      {/* Tooltip / Label */}
      {showTooltip && (
        <div className="music-tooltip-pill" role="status">
          <span>{usingAudioFile ? 'Playing custom song 🎵' : 'Playing romantic instrumental melody 🎵'}</span>
        </div>
      )}

      {/* Floating Circular Player with glowing aura and animated waves */}
      <div className={`music-circular-widget ${isPlaying ? 'is-active-playing' : ''}`}>
        <button
          onClick={toggleMusic}
          className="music-round-btn"
          aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
          title={isPlaying ? 'Pause music' : 'Play romantic music 🎵'}
        >
          {/* Animated Soft Glowing Rings */}
          <span className="music-glow-ring ring-1" aria-hidden="true"></span>
          <span className="music-glow-ring ring-2" aria-hidden="true"></span>

          <div className="music-center-icon">
            {isPlaying ? (
              <Pause size={18} className="player-icon" />
            ) : (
              <Play size={18} className="player-icon play-offset" />
            )}
          </div>
        </button>

        {/* Music Label & Wave Visualizer */}
        <div className="music-side-details" onClick={toggleMusic}>
          <span className="music-short-label">
            {isPlaying ? 'Music: Playing' : 'Romantic Music'}
          </span>

          {isPlaying ? (
            <div className="music-wave-bars" aria-hidden="true">
              <span className="wave-bar wb-1"></span>
              <span className="wave-bar wb-2"></span>
              <span className="wave-bar wb-3"></span>
              <span className="wave-bar wb-4"></span>
              <span className="wave-bar wb-5"></span>
            </div>
          ) : (
            <span className="music-subhint">Click to listen 🎵</span>
          )}
        </div>
      </div>
    </div>
  );
}
