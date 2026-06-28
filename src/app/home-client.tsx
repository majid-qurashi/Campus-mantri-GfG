"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Calendar, ExternalLink, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { loadAchievements, loadWorkshops, loadProjects } from '../lib/dataLoader';
import type { Achievement, Workshop, Project } from '../types';
import { CONFIG } from '../config/content';
import majidProfile from '@/assets/majid.webp';

export function HomeClient({
  initialWorkshops = [],
  initialAchievements = [],
  initialProjects = []
}: {
  initialWorkshops?: Workshop[];
  initialAchievements?: Achievement[];
  initialProjects?: Project[];
}) {
  const [workshops, setWorkshops] = useState<Workshop[]>(initialWorkshops.slice(0, 3));
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements.slice(0, 3));
  const [projects, setProjects] = useState<Project[]>(initialProjects.slice(0, 3));
  const [loading, setLoading] = useState(initialWorkshops.length === 0);

  useEffect(() => {
    if (initialWorkshops.length > 0) {
      setLoading(false);
      return;
    }
    async function fetchData() {
      try {
        const [w, a, p] = await Promise.all([
          loadWorkshops(),
          loadAchievements(),
          loadProjects()
        ]);
        setWorkshops(w.slice(0, 3)); // Featured 3
        setAchievements(a.slice(0, 3)); // Featured 3
        setProjects(p.slice(0, 3)); // Featured 3
      } catch (error) {
        console.error("Error loading home page data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [initialWorkshops, initialAchievements, initialProjects]);

  const stats = [
    { label: "Students Impacted", value: "50+" },
    { label: "Tech Workshops", value: "3+" },
    { label: "DSA Sessions", value: "5+" },
    { label: "LinkedIn Followers", value: "4K+" }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-b from-primary/10 via-primary/5 to-transparent px-6 py-12 sm:px-12 sm:py-20">
        {/* Subtle grid background decoration */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,oklch(var(--primary)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--primary)/0.2)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Badge variant="success" className="animate-pulse py-1 px-3">
                🏆 GeeksforGeeks Campus Mantri
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Building a Thriving <span className="text-primary bg-clip-text">Coding Culture</span> on Campus
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hi, I&apos;m <span className="font-semibold text-foreground">{CONFIG.personal.name}</span>. 
              I drive technical initiatives, foster problem-solving in DSA, and build high-performance user interfaces as a Software Engineer.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Button size="lg" asChild>
                <Link href="/campus-mantri" className="flex items-center gap-2">
                  Explore CM Journey <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Glowing decorative backdrop ring */}
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative rounded-2xl border-2 border-primary/30 p-2 bg-card/50 backdrop-blur-xs shadow-xl max-w-70 sm:max-w-[320px]">
                <img 
                  src={majidProfile.src} 
                  alt={CONFIG.personal.name}
                  className="rounded-xl w-full object-cover aspect-square transition-all duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center sm:text-left">
          Campus Representative Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="text-center hover:scale-102 transition-transform duration-200">
              <CardContent className="pt-6">
                <p className="text-3xl sm:text-4xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Workshops & Events */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Latest Workshops & Events
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Events organized to promote DSA and technical learning
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/workshops" className="flex items-center gap-1.5">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse h-48 bg-muted/20" />
            ))
          ) : workshops.length > 0 ? (
            workshops.map((w, idx) => (
              <Card key={idx} className="flex flex-col justify-between overflow-hidden h-full">
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-muted relative border-b border-border">
                    <img 
                      src={w.image} 
                      alt={w.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                      loading="lazy"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-xs font-semibold py-0.5">
                      {w.date}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{w.title}</CardTitle>
                    {w.organizer && <CardDescription className="font-medium text-xs">{w.organizer}</CardDescription>}
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                      {w.description}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={w.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                      Details <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm col-span-3 text-center py-6">No workshops available.</p>
          )}
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> Key Projects
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Some of my software and UI engineering works
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects" className="flex items-center gap-1.5">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse h-48 bg-muted/20" />
            ))
          ) : projects.length > 0 ? (
            projects.map((p, idx) => (
              <Card key={idx} className="flex flex-col justify-between h-full">
                <CardHeader>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {p.tech.slice(0, 3).map((t, tIdx) => (
                      <Badge key={tIdx} variant="secondary" className="text-[10px] py-0.5">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-1">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.shortDescription}
                  </p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                      Codebase <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm col-span-3 text-center py-6">No projects available.</p>
          )}
        </div>
      </section>

      {/* Featured Achievements */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Featured Achievements
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select certifications and academic credentials
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/achievements" className="flex items-center gap-1.5">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse h-36 bg-muted/20" />
            ))
          ) : achievements.length > 0 ? (
            achievements.map((a, idx) => (
              <Card key={idx} className="flex flex-col justify-between h-full hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm sm:text-base font-bold line-clamp-1">{a.title}</CardTitle>
                  <CardDescription className="text-xs font-semibold">{a.issuingOrg}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  {a.date && (
                    <span className="text-xs font-medium bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-sm">
                      Issued {a.date}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm col-span-3 text-center py-6">No achievements available.</p>
          )}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">Interested in hosting a workshop or coding boot camp?</h3>
          <p className="text-sm text-muted-foreground">
            Let&apos;s collaborate to organize high-impact events and help more students get started with software development.
          </p>
        </div>
        <Button size="lg" asChild className="mt-4 sm:mt-0">
          <Link href="/contact">Let&apos;s Connect</Link>
        </Button>
      </section>
    </div>
  );
}
