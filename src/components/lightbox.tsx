"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { GalleryImage } from '../types';

interface LightboxProps {
  item: GalleryImage | null;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Disable scrolling when lightbox is active
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
        title="Close Lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Content wrapper */}
      <div
        className="relative max-w-4xl w-full flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking image
      >
        <img
          src={item.image}
          alt={item.title || 'Gallery Image'}
          className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl border border-white/10"
          loading="lazy"
        />
        
        {/* Caption panel */}
        {(item.title || item.caption) && (
          <div className="text-white max-w-2xl px-4">
            {item.title && <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>}
            {item.caption && <p className="text-sm text-gray-300 mt-1">{item.caption}</p>}
            {item.category && (
              <span className="inline-block bg-primary/20 text-primary border border-primary/30 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-3">
                {item.category}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
