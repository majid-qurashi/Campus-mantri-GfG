"use client";

import Link from 'next/link';
import { Mail, Globe, Heart } from 'lucide-react';
import { Linkedin, Github } from './icons';
import { CONFIG } from '../config/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-border/40 pb-8">
          {/* Left Column: Branding */}
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-primary tracking-tight">
              Majid Yaseen Qurashi
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              GeeksforGeeks Campus Mantri
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              Government College of Engineering and Technology, Safapora
            </p>
          </div>

          {/* Middle Column: Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/campus-mantri" className="hover:text-primary transition-colors">Journey</Link>
            <Link href="/achievements" className="hover:text-primary transition-colors">Achievements</Link>
            <Link href="/workshops" className="hover:text-primary transition-colors">Workshops</Link>
          </div>

          {/* Right Column: Socials */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href={`mailto:${CONFIG.personal.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              title="Email Majid"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={CONFIG.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={CONFIG.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              title="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={CONFIG.personal.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              title="Personal Portfolio"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground mt-8 gap-4">
          <p>© {currentYear} {CONFIG.personal.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> for GeeksforGeeks Campus Mantri Portfolio.
          </p>
        </div>
      </div>
    </footer>
  );
}
