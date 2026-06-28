import { Calendar, Briefcase, Award, GraduationCap } from 'lucide-react';
import { Badge } from './ui/badge';

export interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string | string[];
  tags?: string[];
  type?: 'work' | 'education' | 'achievement' | 'gfg';
}

interface TimelineProps {
  items: TimelineItemProps[];
}

export function Timeline({ items }: TimelineProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="h-4 w-4" />;
      case 'education':
        return <GraduationCap className="h-4 w-4" />;
      case 'achievement':
        return <Award className="h-4 w-4" />;
      case 'gfg':
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative border-l-2 border-border/80 pl-6 ml-4 md:ml-6 space-y-10 my-8">
      {items.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Glowing Bullet Node */}
          <span className="absolute -left-[35px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-sm transition-transform group-hover:scale-110">
            {getIcon(item.type)}
          </span>

          {/* Timeline Card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm font-semibold text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
              <span className="inline-flex max-w-fit items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {item.date}
              </span>
            </div>

            {/* Description */}
            <div className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              {Array.isArray(item.description) ? (
                <ul className="list-disc pl-5 space-y-1.5">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.description}</p>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border/20">
                {item.tags.map((tag, tIdx) => (
                  <Badge key={tIdx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
