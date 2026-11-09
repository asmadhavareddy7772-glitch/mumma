import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function PhotoLightbox({
  isOpen,
  photo,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) {
  const touchStartXRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        onNext(); // swiped left -> next
      } else {
        onPrev(); // swiped right -> prev
      }
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || !photo) return null;

  return (
    <div 
      className="photo-lightbox-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
    >
      <div 
        className="lightbox-content-box cinematic-zoom-enter" 
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close photo view"
          title="Close (Esc)"
        >
          <X size={24} />
        </button>

        {/* Previous button */}
        <button
          className="lightbox-nav-btn prev-btn"
          onClick={onPrev}
          aria-label="Previous photograph"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next button */}
        <button
          className="lightbox-nav-btn next-btn"
          onClick={onNext}
          aria-label="Next photograph"
          title="Next (Right Arrow)"
        >
          <ChevronRight size={28} />
        </button>

        {/* Image Stage: Maintaining aspect ratio, never cropping faces */}
        <div className="lightbox-image-stage">
          <img
            src={photo.src}
            alt={photo.caption}
            className="lightbox-image"
          />
        </div>

        {/* Caption & Counter Bar */}
        <div className="lightbox-info-bar">
          <div className="lightbox-caption-wrapper">
            <Heart size={16} fill="#E63946" color="#E63946" className="lightbox-heart" />
            <p className="lightbox-caption">{photo.caption}</p>
          </div>
          <span className="lightbox-counter">
            {currentIndex + 1} of {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}
