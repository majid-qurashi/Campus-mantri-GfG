"use client";

import { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { Linkedin } from '../../components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CONFIG } from '../../config/content';

export function ContactClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(CONFIG.personal.prefilledLinkedinMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Required fields check
    if (!formData.name.trim()) {
      setErrorMsg('Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Email address is required.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Message content is required.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Phone format validation (optional)
    if (formData.phone.trim()) {
      const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        setErrorMsg('Please enter a valid phone number (e.g., +123456789, 10 digits).');
        return;
      }
    }

    // Check frequent submissions check (block within 1 minute)
    const lastSubTime = localStorage.getItem('gfg_last_submission_time');
    if (lastSubTime) {
      const timeElapsed = Date.now() - parseInt(lastSubTime, 10);
      if (timeElapsed < 60000) {
        setSubmitting(true);
        // Simulate response latency of 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitting(false);
        setErrorMsg(`Dear ${formData.name}, I have already received your message. If you want to get back to me, please try after 10-20 minutes.`);
        return;
      }
    }

    setSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a21f8980-3a6c-4366-8f7c-15fa25578cd6',
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          subject: 'Message from GFG Campus Mantri Portfolio',
          from_name: 'Campus Mantri Portfolio'
        })
      });

      const result = await response.json();
      if (response.status === 200) {
        // Store current submission timestamp on success
        localStorage.setItem('gfg_last_submission_time', Date.now().toString());
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setErrorMsg(result.message || 'Form submission failed. Please try again.');
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Let&apos;s collaborate on workshops, hackathons, open-source projects, or coding seminars at Safapora.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Contact Channels */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Direct Channels</CardTitle>
              <CardDescription>Get in touch with me directly through these channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${CONFIG.personal.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/45 transition-colors group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                  <Mail className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Email Address</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{CONFIG.personal.email}</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={CONFIG.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/45 transition-colors group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                  <Linkedin className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">LinkedIn Network</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">/in/majidqurashi</p>
                </div>
              </a>
            </CardContent>
          </Card>

          {/* Copier Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Prefilled Message Template
              </CardTitle>
              <Button 
                variant="outline" 
                size="xs" 
                onClick={handleCopyTemplate}
                className="flex items-center gap-1"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed bg-background/50 p-3 rounded-lg border border-border/60 mx-5 mb-5 font-mono">
              &quot;{CONFIG.personal.prefilledLinkedinMessage}&quot;
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Contact Form */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Fill out this form and I will get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. I&apos;ll get back to you shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-2">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-foreground">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-foreground">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-foreground">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number (optional)"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-foreground">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can work together..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
