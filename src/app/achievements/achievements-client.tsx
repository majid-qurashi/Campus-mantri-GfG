"use client";

import { useEffect, useState } from 'react';
import { Search, Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { loadAchievements } from '../../lib/dataLoader';
import type { Achievement } from '../../types';

export function AchievementsClient({
  initialAchievements = []
}: {
  initialAchievements?: Achievement[];
}) {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(initialAchievements.length === 0);

  useEffect(() => {
    if (initialAchievements.length > 0) {
      setLoading(false);
      return;
    }
    async function getAchievements() {
      try {
        const data = await loadAchievements();
        setAchievements(data);
      } catch (err) {
        console.error("Failed to load achievements data", err);
      } finally {
        setLoading(false);
      }
    }
    getAchievements();
  }, [initialAchievements]);

  const filteredAchievements = achievements.filter(ach => {
    const term = searchTerm.toLowerCase();
    return (
      ach.title.toLowerCase().includes(term) ||
      ach.issuingOrg.toLowerCase().includes(term) ||
      ach.date.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 py-8">
      {/* Intro Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Achievements & Certifications
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Official credentials and training workshops certified by IITs, NIELIT, AICTE, and IBM.
        </p>
      </section>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search credentials (e.g. Python, NIELIT, IIT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          Showing {filteredAchievements.length} of {achievements.length} items
        </div>
      </div>

      {/* Credentials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse h-36 bg-muted/20" />
          ))}
        </div>
      ) : filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((ach, idx) => (
            <Card key={idx} className="flex flex-col justify-between h-full hover:border-primary/45 hover:shadow-xs transition-all">
              <CardHeader className="pb-3 flex flex-row items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm sm:text-base font-bold leading-tight line-clamp-2">
                    {ach.title}
                  </CardTitle>
                  <CardDescription className="text-xs font-semibold mt-1">
                    {ach.issuingOrg}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center justify-between gap-4 mt-2">
                  {ach.date ? (
                    <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">
                      {ach.date}
                    </span>
                  ) : (
                    <span />
                  )}

                  {ach.verificationLink && (
                    <Button variant="ghost" size="xs" className="text-primary hover:text-primary-dark" asChild>
                      <a href={ach.verificationLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No achievements found matching your search.
        </div>
      )}
    </div>
  );
}
