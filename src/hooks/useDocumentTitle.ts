import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Kone Sory Ben Khaled` : siteConfig.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description ?? siteConfig.description;
  }, [title, description]);
}
