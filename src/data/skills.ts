/**
 * Univers technique : regroupement des technologies par domaine.
 * Chaque technologie listée ici doit apparaître dans la `stack` d'au moins un projet
 * (les projets qui l'utilisent sont calculés automatiquement). Une techno sans projet n'est pas affichée.
 */
export const skillDomains: { domain: string; intent: string; tools: string[] }[] = [
  {
    domain: 'Interfaces',
    intent: 'Des écrans clairs, rapides, qui inspirent confiance.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Bootstrap 5', 'Vite', 'React Router', 'TanStack Query', 'GSAP', 'Framer Motion']
  },
  { domain: 'Mobile', intent: 'Des applications pensées pour le téléphone d’abord.', tools: ['React Native', 'Expo'] },
  { domain: 'Back-end & API', intent: 'Des règles métier solides et des API sûres.', tools: ['Express', 'Node.js', 'Laravel 12', 'PHP', 'FastAPI', 'Python', 'JWT', 'Zod', 'Socket.io'] },
  { domain: 'Données', intent: 'Des données fiables, migrées proprement.', tools: ['PostgreSQL', 'MySQL', 'Prisma', 'Supabase', 'Drizzle'] },
  { domain: 'Cartes & visualisation', intent: 'Rendre lisibles les lieux et les chiffres.', tools: ['Leaflet', 'Recharts', 'Chart.js'] },
  { domain: 'IA & automatisation', intent: 'Mettre l’IA au service d’un usage concret.', tools: ['OpenAI', 'Groq', 'Telegraf', 'Nodemailer', 'Cloudinary'] }
];
