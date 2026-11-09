import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Camera, Maximize2 } from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';

// Direct asset imports ensure Vite bundles the actual images into the deployment
import photo1 from '../assets/photos/photo1.jpg';
import photo2 from '../assets/photos/photo2.jpg';
import photo3 from '../assets/photos/photo3.jpg';
import photo4 from '../assets/photos/photo4.jpg';
import photo5 from '../assets/photos/photo5.jpg';

const MEMORIES_DATA = [
  {
    id: 1,
    defaultSrc: photo1,
    fallbackSrc: '/photos/photo1.jpg',
    caption: 'A moment I wish I could relive ❤️',
    styleType: 'polaroid',
    dateHint: 'Memory #1',
    rotation: '-2.2deg',
    slideDirection: 'left',
    heartSticker: '💖',
  },
  {
    id: 2,
    defaultSrc: photo2,
    fallbackSrc: '/photos/photo2.jpg',
    caption: 'My favourite smile.',
    styleType: 'clean',
    dateHint: 'Memory #2',
    rotation: '0deg',
    slideDirection: 'right',
    heartSticker: '🌸',
  },
  {
    id: 3,
    defaultSrc: photo3,
    fallbackSrc: '/photos/photo3.jpg',
    caption: 'Every memory with you is special.',
    styleType: 'polaroid',
    dateHint: 'Memory #3',
    rotation: '2.4deg',
    slideDirection: 'left',
    heartSticker: '💕',
  },
  {
    id: 4,
    defaultSrc: photo4,
    fallbackSrc: '/photos/photo4.jpg',
    caption: 'You make ordinary moments beautiful.',
    styleType: 'clean',
    dateHint: 'Memory #4',
    rotation: '0deg',
    slideDirection: 'right',
    heartSticker: '✨',
  },
  {
    id: 5,
    defaultSrc: photo5,
    fallbackSrc: '/photos/photo5.jpg',
    caption: 'My favourite person, always.',
    styleType: 'polaroid',
    dateHint: 'Memory #5',
    rotation: '-1.8deg',
    slideDirection: 'left',
    heartSticker: '❤️',
  },
];

export default function MemoriesGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [visibleItems, setVisibleItems] = useState({});
  const [imageSources, setImageSources] = useState(() => {
    return MEMORIES_DATA.reduce((acc, item) => {
      try {
        const saved = localStorage.getItem(`mumma_custom_photo_${item.id}`);
        acc[item.id] = saved || item.defaultSrc;
      } catch {
        acc[item.id] = item.defaultSrc;
      }
      return acc;
    }, {});
  });

  const cardRefs = useRef([]);

  // Intersection Observer for scroll-triggered entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleItems((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Multi-tier fallback handling
  const handleImageError = (id) => {
    const item = MEMORIES_DATA.find((m) => m.id === id);
    const current = imageSources[id];

    if (current === item?.defaultSrc && item?.fallbackSrc) {
      setImageSources((prev) => ({ ...prev, [id]: item.fallbackSrc }));
    } else if (typeof current === 'string' && current.endsWith('.jpg')) {
      setImageSources((prev) => ({ ...prev, [id]: `/photos/photo${id}.jpeg` }));
    } else if (typeof current === 'string' && current.endsWith('.jpeg') && !current.endsWith('.jpg.jpeg')) {
      setImageSources((prev) => ({ ...prev, [id]: `/photos/photo${id}.jpg.jpeg` }));
    }
  };

  // Allow replacing a photo dynamically from the device
  const handleFileChange = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageSources((prev) => ({ ...prev, [id]: previewUrl }));

      try {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            localStorage.setItem(`mumma_custom_photo_${id}`, reader.result);
          } catch {
            // Storage quota handled safely
          }
        };
        reader.readAsDataURL(file);
      } catch {
        // Fallback safely
      }
    }
  };

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + MEMORIES_DATA.length) % MEMORIES_DATA.length
      );
    }
  };

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % MEMORIES_DATA.length);
    }
  };

  const activePhoto =
    activePhotoIndex !== null
      ? {
          src: imageSources[MEMORIES_DATA[activePhotoIndex].id],
          caption: MEMORIES_DATA[activePhotoIndex].caption,
        }
      : null;

  return (
    <section id="memories" className="memories-gallery-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="gallery-header-block">
          <div className="gallery-badge">
            <Camera size={14} className="badge-icon" />
            <span>Treasured Moments</span>
            <Sparkles size={14} className="badge-icon" />
          </div>

          <h2 className="gallery-main-heading">
            OUR LITTLE WORLD ❤️
          </h2>

          <p className="gallery-subtitle">
            "Some moments become memories. Some people become everything."
          </p>
        </div>

        {/* Gallery Cards Grid: Scrapbook Polaroid & Clean Cards */}
        <div className="gallery-grid">
          {MEMORIES_DATA.map((item, idx) => {
            const currentSrc = imageSources[item.id];
            const isPolaroid = item.styleType === 'polaroid';
            const isVisible = visibleItems[item.id];

            return (
              <div
                key={item.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-id={item.id}
                className={`memory-card ${isPolaroid ? 'card-polaroid' : 'card-clean'} ${
                  isVisible ? 'scroll-revealed' : 'scroll-hidden'
                } slide-${item.slideDirection}`}
                style={{
                  '--card-rotation': item.rotation,
                  '--anim-delay': `${idx * 0.12}s`,
                }}
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
                aria-label={`View photo: ${item.caption}`}
              >
                {/* Washi Tape Accent on Polaroid */}
                {isPolaroid && (
                  <div className="polaroid-tape-accent" aria-hidden="true">
                    <span className="washi-tape-glint"></span>
                  </div>
                )}

                {/* Floating Heart Sticker */}
                <div className="card-heart-sticker" aria-hidden="true">
                  <span>{item.heartSticker}</span>
                </div>

                {/* Photo Frame Container */}
                <div className="photo-frame">
                  <img
                    src={currentSrc}
                    alt={item.caption}
                    className="gallery-img"
                    onError={() => handleImageError(item.id)}
                    loading="lazy"
                  />
                  <div className="photo-overlay-hover">
                    <Maximize2 size={24} className="expand-icon" />
                    <span className="expand-text">View Photograph</span>
                  </div>
                </div>

                {/* Change Photo Option (Clean & Discreet) */}
                <div className="change-photo-container" onClick={(e) => e.stopPropagation()}>
                  <label className="change-photo-btn" title="Upload a photo for this card">
                    <Camera size={13} />
                    <span>Change Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden-file-input"
                      onChange={(e) => handleFileChange(item.id, e)}
                    />
                  </label>
                </div>

                {/* Caption Block */}
                <div className="photo-caption-block">
                  <p className="photo-caption-text">{item.caption}</p>
                  <span className="photo-subtag">
                    <Heart size={11} fill="#E63946" color="#E63946" className="subtag-heart" />
                    {item.dateHint}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={activePhotoIndex !== null}
        photo={activePhoto}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={activePhotoIndex ?? 0}
        totalCount={MEMORIES_DATA.length}
      />
    </section>
  );
}
