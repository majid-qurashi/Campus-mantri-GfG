import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export function SEOHead({ title, description }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Majid Qurashi - GeeksforGeeks Campus Mantri`;
    document.title = fullTitle;
    
    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update dynamic share URL
    setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href);

    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }
    
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
  }, [title, description]);

  return null;
}
