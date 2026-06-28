import { SEOHead } from '../components/seo-head';
import { Timeline, type TimelineItemProps } from '../components/timeline';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function About() {
  const skills = {
    frontend: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", 
      "React.js", "Next.js", "Tailwind CSS", "UI/UX Design", "Figma"
    ],
    backendData: [
      "Python", "MongoDB", "Data Analysis", "NumPy", "Pandas", 
      "Matplotlib", "Seaborn", "Vector Search & RAG"
    ],
    core: [
      "Data Structures & Algorithms (DSA)", "Machine Learning (ML)", 
      "Automated Text Classification", "Git & GitHub"
    ]
  };

  const experienceItems: TimelineItemProps[] = [
    {
      title: "Campus Representative (Internship)",
      subtitle: "GeeksforGeeks",
      date: "Jun 2026 – Present",
      description: [
        "Selected as GeeksforGeeks Campus Mantri representing GCET Safapora Kashmir.",
        "Organize technical boot camps workshops and coding tests.",
        "Promote collaborative learning in Data Structures & Algorithms (DSA) and build a thriving campus developer community."
      ],
      tags: ["Leadership", "Community Building", "Public Speaking", "DSA"],
      type: "gfg"
    },
    {
      title: "Internship Rotation",
      subtitle: "Edunet Foundation",
      date: "Sep 2025 – Dec 2025",
      description: [
        "Employability Skills with AI (Nov 2025 – Dec 2025): Applied AI productivity tools to enhance workplace readiness, supported by AICTE and IBM SkillsBuild.",
        "Artificial Intelligence Intern (Oct 2025 – Nov 2025): Built and trained basic machine learning models in Python, supported by AICTE and Shell India.",
        "Data Analyst Intern (Sep 2025 – Oct 2025): Utilized LLM-based techniques to process datasets and extract insights, supported by AICTE and VOIS."
      ],
      tags: ["AI Models", "Python", "Data Analysis", "IBM SkillsBuild"],
      type: "work"
    },
    {
      title: "Web Developer (Internship)",
      subtitle: "Cognifyz Technologies",
      date: "Jul 2024 – Aug 2024",
      description: [
        "Designed and developed responsive user interfaces focusing on accessibility, modern design patterns, and cross-browser performance.",
        "Created user wireframes and interactive prototypes in Figma, translating them into functional frontend code."
      ],
      tags: ["Frontend Development", "UI/UX Design", "Figma", "Web Performance"],
      type: "work"
    },
    {
      title: "Data Analyst (Internship)",
      subtitle: "FastHire Manpower Solution",
      date: "Jul 2024 – Aug 2024",
      description: [
        "Conducted numerical computing and data processing on large sets of employee information.",
        "Built visual plots and charts using Python libraries (NumPy, Pandas, Matplotlib, Seaborn) to present key business analytics."
      ],
      tags: ["Python", "NumPy", "Pandas", "Matplotlib", "Data Analytics"],
      type: "work"
    },
    {
      title: "Campus Ambassador",
      subtitle: "Academor",
      date: "Jan 2024 – Apr 2024",
      description: "Represented Academor on campus promoting career development programs online coding classes and digital learning modules.",
      tags: ["Marketing", "Campus Outreach"],
      type: "work"
    }
  ];

  const educationItems: TimelineItemProps[] = [
    {
      title: "B-Tech in Computer Science & Engineering (Lateral Entry)",
      subtitle: "Government College of Engineering and Technology (GCET), Safapora, Kashmir",
      date: "Dec 2023 – Dec 2026",
      description: "Focusing on data structures, database management systems, web development, and artificial intelligence. Maintained a strong academic record with a cumulative grade point average.",
      tags: ["Grade: 8.01 CGPA", "Computer Science"],
      type: "education"
    },
    {
      title: "Diploma in Computer Engineering",
      subtitle: "Kashmir Government Polytechnic College, Srinagar",
      date: "Aug 2020 – Aug 2023",
      description: "Familiarized with fundamental software engineering concepts, hardware configurations, scripting languages, and networking essentials. Participated in curling extracurricular sports activities.",
      tags: ["Grade: 8.50 CGPA", "Iceless Curling 🥌"],
      type: "education"
    }
  ];

  return (
    <div className="space-y-12 py-8">
      <SEOHead 
        title="About Me" 
        description={`Bio education history technical skills and experience timeline of Majid Yaseen Qurashi.`} 
      />

      {/* Intro Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">About Me</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Get to know my academic background technical competencies and professional internship milestones.
        </p>
      </section>

      {/* Profile Bio & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Biography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                I am a Software Engineer focused on frontend development and user interface design. 
                I build responsive, high-performance web applications using HTML, CSS, JavaScript, React, and Next.js. 
                I also apply AI and ML using Python to solve real-world problems.
              </p>
              <p>
                With hands-on experience through multiple internships (Edunet Foundation, Cognifyz, FastHire), 
                I focus on writing clean code, building responsive interfaces, and delivering efficient solutions. 
                Currently, I represent GCET Safapora Kashmir as the GeeksforGeeks Campus Mantri, working to cultivate an active competitive programming culture on campus.
              </p>
            </CardContent>
          </Card>

          {/* Education timeline */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Education</h2>
            <Timeline items={educationItems} />
          </div>
        </div>

        {/* Right side: Skills Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Frontend */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Frontend & Design
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.frontend.map((s, idx) => (
                    <Badge key={idx} variant="success">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Backend & Data */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Backend & Data Science
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.backendData.map((s, idx) => (
                    <Badge key={idx} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Core Concepts */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Core Concepts & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.core.map((s, idx) => (
                    <Badge key={idx} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Activities & Hobbies</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Beyond engineering, I am passionate about sports, including <strong>Iceless Curling 🥌</strong>, writing, and community tutoring. I also write opinion columns for local newspapers like <em>Brighter Kashmir</em> and <em>Kashmir Frontier</em> discussing digital transformation and modern educational models.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Experience Section */}
      <section className="space-y-4 pt-4 border-t border-border/40">
        <h2 className="text-2xl font-bold text-foreground">Work & Internships</h2>
        <Timeline items={experienceItems} />
      </section>
    </div>
  );
}
