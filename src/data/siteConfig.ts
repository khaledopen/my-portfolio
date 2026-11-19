export const siteConfig = {
  /** Domaine final, sans slash final. À mettre à jour après le déploiement (sitemap, canonical, Open Graph). */
  url: 'https://ksbk.vercel.app',
  title: 'Kone Sory Ben Khaled — Discret par nature. Sans limites quand je crée.',
  description: 'Portfolio de Kone Sory Ben Khaled, développeur web & mobile à Abidjan : projets, univers technique, parcours.',
  /** L'intro est jouée une fois par session de navigation. */
  introStorageKey: 'ksbk:intro-seen'
};

export const navigation = [
  { label: 'Travaux', href: '/#work' },
  { label: 'Outils', href: '/#tools' },
  { label: 'Moments', href: '/#moments' },
  { label: 'Univers', href: '/#world' },
  { label: 'Parcours', href: '/#journey' },
  { label: 'Contact', href: '/#contact' }
];
