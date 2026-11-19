import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Work } from '../sections/Work';
import { Archive } from '../sections/Archive';
import { Tools } from '../sections/Tools';
import { Moments } from '../sections/Moments';
import { World } from '../sections/World';
import { Philosophy } from '../sections/Philosophy';
import { Journey } from '../sections/Journey';
import { Contact } from '../sections/Contact';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/**
 * Phase 1 — Le silence : Hero
 * Phase 2 — La connexion : About, Work, Archive, Tools
 * Phase 3 — La révélation : Moments, World, Philosophy, Journey
 * Puis le crépuscule : Contact
 */
export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Archive />
      <Tools />
      <Moments />
      <World />
      <Philosophy />
      <Journey />
      <Contact />
    </>
  );
}
