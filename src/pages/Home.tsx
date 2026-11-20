import { useRef } from 'react';
import { PenLine } from '@/components/PenLine';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Work } from '@/sections/Work';
import { World } from '@/sections/World';
import { Contact } from '@/sections/Contact';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle();
  const page = useRef<HTMLDivElement>(null);
  return (
    <div ref={page} className="relative overflow-clip">
      <PenLine container={page} />
      <Hero />
      <About />
      <Work />
      <World />
      <Contact />
    </div>
  );
}
