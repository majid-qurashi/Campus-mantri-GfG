import { useState } from 'react';
import { Award, Sparkles, Terminal, Users, CalendarDays, BookOpen, Eye } from 'lucide-react';
import { SEOHead } from '../components/seo-head';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Timeline, type TimelineItemProps } from '../components/timeline';
import { Badge } from '../components/ui/badge';
import { Lightbox } from '../components/lightbox';
import offerLetterImg from '../assets/offer-letter.webp';
import campusMantriImg from '../assets/campus-mantri-img.webp';

export function CampusMantri() {
  const objectives = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Building",
      desc: "Establishing a coding-focused workspace on campus where peers help one another solve DSA problems and share technical guidance."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "DSA & CP Promotion",
      desc: "Conducting webinars and offline workshops addressing array manipulation, algorithm complexity, trees, and logic building in coding."
    },
    {
      icon: <Terminal className="h-6 w-6 text-primary" />,
      title: "Hands-on Hackathons",
      desc: "Collaborating with college faculty and external clubs to sponsor codeathons, developer jams, and technical project exhibitions."
    }
  ];

  const milestones: TimelineItemProps[] = [
    {
      title: "Campus Rep Appointment",
      subtitle: "Official Selection",
      date: "Jun 2026",
      description: "Selected as GeeksforGeeks Campus Mantri at Government College of Engineering and Technology safapora Safapora Kashmir after competitive screening evaluation.",
      tags: ["Selection", "Credentials"],
      type: "gfg"
    },
    {
      title: "Club Core Committee Setup",
      subtitle: "Team Recruitment",
      date: "Jun 2026",
      description: "Appointed workshop coordinators and design heads to establish the official GFG Student Chapter committee at GCET Safapora.",
      tags: ["Organizing", "Leadership"],
      type: "gfg"
    },
    {
      title: "First Campus DSA Workshop",
      subtitle: "Event Execution",
      date: "Jun 2026",
      description: "Led the first hands-on laboratory session teaching arrays, strings, and standard search algorithms to 60+ junior B-Tech students.",
      tags: ["Workshop", "Teaching"],
      type: "gfg"
    },
    {
      title: "Future Coding Contest Roadmaps",
      subtitle: "Planned Initiative",
      date: "Jul 2026",
      description: "Currently structuring college-wide competitive programming tests with custom prizes and certifications sponsored by GeeksforGeeks.",
      tags: ["Planning", "Competitions"],
      type: "gfg"
    }
  ];

  const [lightboxImage, setLightboxImage] = useState<{ image: string; title?: string; caption?: string } | null>(null);

  return (
    <div className="space-y-12 py-8">
      <SEOHead 
        title="Campus Mantri Journey" 
        description={`Discover Majid Qurashi's role and milestones as the official GeeksforGeeks Campus Representative at GCET Safapora.`} 
      />

      {/* Header banner */}
      <section className="space-y-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        <Badge variant="success" className="py-1 px-3">
          👑 Leadership & Community
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Campus Mantri Journey
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Pioneering coding literacy, algorithm tutorials, and team software projects at GCET Safapora Kashmir.
        </p>

        {/* Campus Mantri Image Hero Banner */}
        <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-border/60 shadow-sm aspect-video max-h-[300px] mt-4 relative bg-muted">
          <img 
            src={campusMantriImg} 
            alt="Campus Mantri Community Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
              GCET Safapora Campus Developer Community & Coding Club Leadership
            </p>
          </div>
        </div>
      </section>

      {/* Appointment and Offer Letter Highlight */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <Card className="lg:col-span-2 flex flex-col justify-between bg-linear-to-r from-primary/5 via-transparent to-transparent border-primary/20">
          <div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Official Campus Mantri Appointment</CardTitle>
                  <CardDescription>Issued by GeeksforGeeks Corporate Office</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                The **GeeksforGeeks Campus Mantri Program** is a prestigious leadership initiative recognizing student coordinators who lead tech development and DSA learning inside engineering colleges.
              </p>
              <p>
                As the representative for **GCET Safapora Safapora Kashmir**, Majid Yaseen Qurashi is authorized to coordinate local webinars, distribute GFG learning materials, verify student certificates, and run hackathons under GFG branding.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 py-1.5 italic bg-primary/5 text-foreground rounded-r-md">
                "To represent GCET Safapora, organize tech workshops, and build a vibrant competitive programming network..."
              </blockquote>
            </CardContent>
          </div>

          <div className="p-5 border-t border-border/20 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-muted/20 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary shrink-0" />
              <span>June 2026 - Present Term</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary shrink-0" />
              <span>450+ CS Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary shrink-0" />
              <span>Fostering DSA & CP</span>
            </div>
          </div>
        </Card>

        {/* Offer Letter Preview Card */}
        <Card 
          className="cursor-pointer overflow-hidden group hover:border-primary/45 transition-all flex flex-col justify-between"
          onClick={() => setLightboxImage({ 
            image: offerLetterImg, 
            title: "Official GFG Offer Letter", 
            caption: "Majid Yaseen Qurashi's appointment letter as Campus Mantri representative at GCET Safapora Kashmir." 
          })}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted border-b border-border">
            <img 
              src={offerLetterImg} 
              alt="Offer Letter Preview" 
              className="w-full h-full object-cover transition-transform group-hover:scale-102 duration-300"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/95 text-primary shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="h-5 w-5" />
              </span>
            </div>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-bold flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-primary" /> Offer Letter Preview
            </CardTitle>
            <CardDescription className="text-xs">Click to open full document view</CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Core Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center">Core Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {objectives.map((obj, idx) => (
            <Card key={idx} className="hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <div className="p-2 rounded-lg bg-primary/10">{obj.icon}</div>
                <CardTitle className="text-base">{obj.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {obj.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Timeline Milestones</h2>
        <Timeline items={milestones} />
      </section>

      {/* Lightbox Modal */}
      <Lightbox item={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
