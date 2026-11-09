import React, { useState } from 'react';
import Navigation from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';
import RomanticCursor from './components/RomanticCursor';
import CinematicIntro from './components/CinematicIntro';
import BirthdayHero from './components/BirthdayHero';
import LoveLetter from './components/LoveLetter';
import MemoriesGallery from './components/MemoriesGallery';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';
import { Heart } from 'lucide-react';
import './App.css';

export default function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="romantic-app-root">
      {/* Interactive Cursor Trail on Desktop / Touch Bursts */}
      <RomanticCursor />

      {/* Cinematic Opening Intro Sequence */}
      {showIntro && (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Background Floating Hearts & Sparkles */}
      <FloatingHearts />

      {/* Top Romantic Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="romantic-main-content">
        {/* Section One: Birthday Landing Page & Section Two: Love Letter Envelope */}
        <BirthdayHero 
          isLetterOpen={isLetterOpen}
          onOpenLetter={() => setIsLetterOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* Section Three: Our Beautiful Memories Gallery */}
        <MemoriesGallery />

        {/* Section Seven: Extra Romantic Surprise */}
        <FinalSurprise />
      </main>

      {/* Section Two: Interactive Love Letter Modal */}
      <LoveLetter 
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      {/* Section Six: Floating Circular Music Player (Fixed Bottom-Right) */}
      <MusicPlayer />

      {/* Romantic Footer */}
      <footer className="romantic-footer">
        <div className="footer-content">
          <p className="footer-love-text">
            Crafted with all my love for Naga Maneesha Reddy
            <Heart size={15} fill="#E63946" color="#E63946" className="footer-inline-heart" />
          </p>
          <p className="footer-date-text">
            20 November • Today, tomorrow, always
          </p>
        </div>
      </footer>
    </div>
  );
}
