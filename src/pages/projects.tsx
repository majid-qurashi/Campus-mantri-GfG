import { useEffect, useState } from 'react';
import { ExternalLink, Code, Search, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/seo-head';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { loadProjects } from '../lib/dataLoader';
import type { Project } from '../types';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const data = await loadProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects data", err);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  // Compute all available technology tags
  const allTechs = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech)))];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesTech = 
      selectedTech === 'All' || 
      p.tech.includes(selectedTech);
      
    return matchesSearch && matchesTech;
  });

  return (
    <div className="space-y-8 py-8">
      <SEOHead 
        title="Projects Showcase" 
        description={`Inspect Majid Qurashi's software developments, AI news classifiers, and UI designs.`} 
      />

      {/* Intro Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-2.5">
          <Code className="h-8 w-8 text-primary" /> Technical Projects
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Showcasing machine learning classifiers, web interfaces, and custom tools built in Python, Figma, and React.
        </p>
      </section>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects (e.g. NLP, React, Figma)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Found {filteredProjects.length} matching projects
          </div>
        </div>

        {/* Tech Badges Row */}
        {allTechs.length > 1 && (
          <div className="flex flex-wrap gap-2 pt-2 border-b border-border/20 pb-4">
            {allTechs.map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? 'default' : 'outline'}
                size="xs"
                onClick={() => setSelectedTech(tech)}
                className="rounded-full text-xs font-semibold py-1 px-3"
              >
                {tech}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse h-60 bg-muted/20" />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p, idx) => (
            <Card key={idx} className="flex flex-col justify-between h-full hover:border-primary/45 hover:shadow-xs transition-all duration-300">
              <div className="space-y-4">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {p.tech.map((t, tIdx) => (
                      <Badge key={tIdx} variant="secondary" className="text-[10px] font-semibold py-0.5">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-extrabold">{p.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.shortDescription}
                  </p>
                  
                  {p.problemStatement && (
                    <div className="text-xs border-l-2 border-primary/50 pl-3 py-1 bg-muted/30 rounded-r-md">
                      <strong className="text-foreground">Problem:</strong> {p.problemStatement}
                    </div>
                  )}

                  {p.highlights && p.highlights.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Highlights
                      </span>
                      <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                        {p.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </div>

              <CardFooter className="pt-2 border-t border-border/20 mt-4">
                <Button className="w-full flex items-center justify-center gap-1.5" asChild>
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    Open Source Codebase <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground text-sm font-medium">No projects match the selected filters.</p>
            <Button variant="ghost" size="sm" onClick={() => { setSearchTerm(''); setSelectedTech('All'); }} className="mt-2">
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
