export interface Achievement {
  title: string;
  issuingOrg: string;
  date: string;
  verificationLink: string;
}

export interface Workshop {
  title: string;
  date: string;
  image: string;
  link: string;
  description?: string;
  role?: string;
  organizer?: string;
}

export interface GalleryImage {
  image: string;
  title?: string;
  caption?: string;
  category?: string;
}

export interface Project {
  title: string;
  shortDescription: string;
  link: string;
  tech: string[]; // split from comma-separated string in parser
  problemStatement?: string;
  highlights?: string[]; // split from semicolon or comma-separated string
  image?: string;
}
