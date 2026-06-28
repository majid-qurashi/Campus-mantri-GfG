import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '../components/theme-provider';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import '../global.css';

export const metadata: Metadata = {
  title: 'Majid Qurashi - GFG Campus Mantri Portfolio',
  description: 'Official GeeksforGeeks Campus Mantri Portfolio of Majid Yaseen Qurashi. Showcasing software engineering projects, tech workshops, coding seminars, and leadership at GCET Safapora, Kashmir.',
  keywords: [
    'Majid Yaseen Qurashi',
    'Majid Qurashi',
    'GeeksforGeeks Campus Mantri',
    'GFG GCET',
    'GCET Safapora',
    'Kashmir Developer',
    'Kashmiri Programmer',
    'Software Engineer Portfolio',
    'Web Developer Kashmir'
  ],
  authors: [{ name: 'Majid Yaseen Qurashi' }],
  robots: 'index, follow',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Majid GFG'
  },
  openGraph: {
    type: 'website',
    title: 'Majid Qurashi - GFG Campus Mantri Portfolio',
    description: 'Official GeeksforGeeks Campus Mantri Portfolio of Majid Yaseen Qurashi. Showcasing software engineering projects, tech workshops, coding seminars, and leadership at GCET Safapora, Kashmir.',
    images: [{ url: '/icon-512x512.png', width: 512, height: 512, alt: 'Majid Qurashi GFG Campus Mantri Icon' }],
    siteName: 'Majid Qurashi Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majid Qurashi - GFG Campus Mantri Portfolio',
    description: 'Official GeeksforGeeks Campus Mantri Portfolio of Majid Yaseen Qurashi. Showcasing software engineering projects, tech workshops, coding seminars, and leadership at GCET Safapora, Kashmir.',
    images: ['/icon-512x512.png']
  }
};

export const viewport: Viewport = {
  themeColor: '#2f8d46',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="light" storageKey="gfg-theme">
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
            <Navbar />
            <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
