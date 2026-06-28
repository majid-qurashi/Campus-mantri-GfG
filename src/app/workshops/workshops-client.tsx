"use client";

import { useEffect, useState } from 'react';
import { ArrowUpDown, ExternalLink, X, MapPin, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { loadWorkshops } from '../../lib/dataLoader';
import type { Workshop } from '../../types';

export function WorkshopsClient({
  initialWorkshops = []
}: {
  initialWorkshops?: Workshop[];
}) {
  const [workshops, setWorkshops] = useState<Workshop[]>(initialWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [sortNewest, setSortNewest] = useState(true);
  const [loading, setLoading] = useState(initialWorkshops.length === 0);

  useEffect(() => {
    if (initialWorkshops.length > 0) {
      setLoading(false);
      return;
    }
    async function getWorkshops() {
      try {
        const data = await loadWorkshops();
        setWorkshops(data);
      } catch (err) {
        console.error("Failed to load workshops data", err);
      } finally {
        setLoading(false);
      }
    }
    getWorkshops();
  }, [initialWorkshops]);

  const sortedWorkshops = [...workshops].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortNewest ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-8 py-8">
      {/* Intro Header */}
      <section className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Workshops & Events
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Events conducted for B-Tech students to foster coding literacy and competitive programming.
          </p>
        </div>
        
        {/* Sort Toggle */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSortNewest(!sortNewest)}
          className="flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowUpDown className="h-4 w-4 text-primary" />
          <span>Sort by: {sortNewest ? "Newest" : "Oldest"}</span>
        </Button>
      </section>

      {/* Grid of Workshops */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse h-64 bg-muted/20" />
          ))}
        </div>
      ) : sortedWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkshops.map((w, idx) => (
            <Card 
              key={idx} 
              className="flex flex-col justify-between overflow-hidden cursor-pointer h-full hover:scale-101 hover:border-primary/45 transition-all duration-300"
              onClick={() => setSelectedWorkshop(w)}
            >
              <div>
                <div className="aspect-video w-full overflow-hidden bg-muted relative border-b border-border">
                  <img 
                    src={w.image} 
                    alt={w.title}
                    className="h-full w-full object-cover transition-transform hover:scale-103 duration-300"
                    loading="lazy"
                  />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-xs font-semibold py-0.5">
                    {w.date}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1">{w.title}</CardTitle>
                  {w.organizer && (
                    <CardDescription className="text-xs font-semibold flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary" /> {w.organizer}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {w.description}
                  </p>
                </CardContent>
              </div>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full flex items-center gap-1">
                  View Workshop Info
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm text-center py-12">No workshops available.</p>
      )}

      {/* Custom Modal Detail Drawer */}
      {selectedWorkshop && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedWorkshop(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-card rounded-2xl overflow-hidden border border-border shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image banner */}
            <div className="aspect-video w-full overflow-hidden bg-muted relative border-b border-border">
              <img 
                src={selectedWorkshop.image} 
                alt={selectedWorkshop.title} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 transition-colors focus:outline-none"
                title="Close dialog"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Details panel */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <Badge variant="success">{selectedWorkshop.date}</Badge>
                  {selectedWorkshop.role && (
                    <Badge variant="secondary" className="flex items-center gap-1 text-[10px]">
                      <Sparkles className="h-2.5 w-2.5" /> {selectedWorkshop.role}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-foreground leading-snug">
                  {selectedWorkshop.title}
                </h3>
                {selectedWorkshop.organizer && (
                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {selectedWorkshop.organizer}
                  </p>
                )}
              </div>

              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
                <p>{selectedWorkshop.description}</p>
              </div>

              {selectedWorkshop.link && (
                <div className="pt-4 border-t border-border/20">
                  <Button className="w-full flex items-center justify-center gap-2" asChild>
                    <a href={selectedWorkshop.link} target="_blank" rel="noopener noreferrer">
                      Access Event Links & Resources <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
