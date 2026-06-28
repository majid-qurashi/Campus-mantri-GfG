"use client";

import { useEffect, useState } from 'react';
import { Eye, Images } from 'lucide-react';
import { Lightbox } from '../../components/lightbox';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { loadGallery } from '../../lib/dataLoader';
import type { GalleryImage } from '../../types';

export function GalleryClient({
  initialImages = []
}: {
  initialImages?: GalleryImage[];
}) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(initialImages.length === 0);

  useEffect(() => {
    if (initialImages.length > 0) {
      setLoading(false);
      return;
    }
    async function getGallery() {
      try {
        const data = await loadGallery();
        setImages(data);
      } catch (err) {
        console.error("Failed to load gallery data", err);
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [initialImages]);

  // Compute categories
  const categories = ['All', ...Array.from(new Set(images.map(img => img.category).filter(Boolean))) as string[]];

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="space-y-8 py-8">
      {/* Intro Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-2.5">
          <Images className="h-8 w-8 text-primary" /> Visual Gallery
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Photo archive documenting student attendance, hackathons, and GFG community milestones on campus.
        </p>
      </section>

      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 pt-2 pb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full text-xs font-semibold py-1.5"
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Grid gallery */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse h-56 bg-muted/20" />
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-md"
              onClick={() => setSelectedItem(img)}
            >
              {/* Image container */}
              <div className="aspect-video w-full overflow-hidden bg-muted relative">
                <img
                  src={img.image}
                  alt={img.title || 'Gallery Image'}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/95 text-primary shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="h-5 w-5" />
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              {(img.title || img.caption) && (
                <div className="p-4 border-t border-border/20">
                  {img.title && <h3 className="font-bold text-sm text-foreground line-clamp-1">{img.title}</h3>}
                  {img.caption && <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{img.caption}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm text-center py-12">No images available for this category.</p>
      )}

      {/* Lightbox Pop-up */}
      <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
