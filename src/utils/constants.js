export const navLinks = [
  { name: 'À propos', url: '#about' },
  { name: 'Parcours', url: '#experience' },
  { name: 'Projets', url: '#projects' },
  { name: 'Contact', url: '#contact' }
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/khaledopen', icon: 'github' },
  { name: 'LinkedIn', url: 'https://ci.linkedin.com/in/kone-sory-ben-khaled-71ba44308', icon: 'linkedin' }
];

export const skills = [
  'React', 'React Native', 'TypeScript', 'JavaScript', 'PHP', 'Laravel',
  'Node.js', 'Express', 'PostgreSQL', 'MySQL', 'Prisma', 'Tailwind CSS',
  'Bootstrap', 'Docker', 'Figma', 'GitHub'
];

export const technologyStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', group: 'Front-end' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', group: 'Langage' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', group: 'Langage' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', group: 'Back-end' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', group: 'Back-end' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', group: 'Back-end' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', group: 'Interface' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', group: 'Interface' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', group: 'Données' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', group: 'Données' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', group: 'DevOps' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', group: 'Outils' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', group: 'Design' },
  { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', group: 'Données' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', group: 'Back-end' }
];

export const workExperience = [
  {
    title: 'Formation en informatique',
    company: 'Université Polytechnique de Bingerville',
    url: 'https://www.linkedin.com/school/universite-polytechnique-de-bingerville/',
    range: 'Abidjan, Côte d’Ivoire',
    description: [
      'Développement de bases solides en programmation, conception d’interfaces et réalisation de projets numériques.',
      'Mise en pratique des technologies web et mobile à travers des applications complètes et responsives.',
      'Approche centrée sur la résolution de problèmes, la qualité du code et l’expérience utilisateur.'
    ]
  },
  {
    title: 'Développeur web & mobile junior',
    company: 'Projets personnels',
    url: '#projects',
    range: 'En apprentissage continu',
    description: [
      'Conception d’applications métier avec React, Laravel, Node.js et PostgreSQL.',
      'Développement de solutions pour la finance, l’immobilier, l’hôtellerie et les services de proximité.',
      'Création d’interfaces modernes, accessibles et adaptées aux différents écrans.'
    ]
  }
];

export const featuredProjects = [
  {
    title: 'Clair — Gestion de caisse',
    short: 'GC',
    color: '#FFE500',
    eyebrow: 'Application de gestion',
    description: 'Application multi-utilisateur pour piloter une caisse partagée : recettes, dépenses, reçus PDF, exports Excel, historique auditable et tableaux de bord.',
    technologies: ['Laravel 12', 'MySQL', 'Bootstrap', 'Chart.js'],
    github: 'https://github.com/khaledopen/Gestion-Caisse'
  },
  {
    title: 'Belleza',
    short: 'BZ',
    color: '#F4A7C4',
    eyebrow: 'SaaS pour instituts de beauté',
    description: 'Solution de gestion pour instituts en Côte d’Ivoire avec agenda, prestations, clients, équipe, disponibilités et isolation des données par établissement.',
    technologies: ['React', 'TypeScript', 'Express', 'Prisma'],
    github: 'https://github.com/khaledopen/institut-beauty'
  },
  {
    title: 'MonBudget',
    short: 'MB',
    color: '#86EFAC',
    eyebrow: 'Gestion financière personnelle',
    description: 'Application full-stack pour suivre revenus et dépenses, définir des budgets, gérer des objectifs d’épargne et calculer des prévisions financières.',
    technologies: ['React', 'Express', 'PostgreSQL', 'Chart.js'],
    github: 'https://github.com/khaledopen/flux-financiers'
  },
  {
    title: 'Wharf Hôtel',
    short: 'WH',
    color: '#93C5FD',
    eyebrow: 'Réservation hôtelière',
    description: 'Plateforme de réservation avec administration, persistance PostgreSQL, confirmations par e-mail, gestion sécurisée des sessions et suivi des demandes.',
    technologies: ['React', 'Express', 'PostgreSQL', 'Nodemailer'],
    github: 'https://github.com/khaledopen/whraf-hotel'
  },
  {
    title: 'Attou Immo',
    short: 'AI',
    color: '#FDBA74',
    eyebrow: 'Application immobilière mobile',
    description: 'Application Expo pour locataires avec navigation mobile, cartes, géolocalisation, calendrier, stockage local et échanges en temps réel.',
    technologies: ['React Native', 'Expo', 'Maps', 'Socket.io'],
    github: 'https://github.com/khaledopen/projet-attou-immo'
  },
  {
    title: 'Artisans CI',
    short: 'AC',
    color: '#C4B5FD',
    eyebrow: 'Marketplace de services',
    description: 'Plateforme qui met en relation les clients et des artisans qualifiés, avec recherche de professionnels, profils de services et espace d’administration.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Axios'],
    github: 'https://github.com/khaledopen/artisans-ci-frontend'
  }
];

export const otherProjects = [
  {
    title: 'ImmoScrap',
    description: 'Plateforme immobilière full-stack avec cartographie, graphiques, API Express et stockage PostgreSQL.',
    technologies: ['React', 'Express', 'PostgreSQL', 'Leaflet'],
    github: 'https://github.com/khaledopen/ImmoScrap'
  },
  {
    title: 'Gestion Loyer',
    description: 'Projet de gestion locative destiné au suivi des loyers et des opérations liées aux biens immobiliers.',
    technologies: ['Gestion locative', 'Application métier'],
    github: 'https://github.com/khaledopen/Gestion-Loyer'
  },
  {
    title: 'Attou Immo APK',
    description: 'Dépôt de livraison et de présentation de la version mobile du projet immobilier Attou Immo.',
    technologies: ['Mobile', 'Android', 'Présentation'],
    github: 'https://github.com/khaledopen/attou-immoApk'
  },
  {
    title: 'TodoList React',
    description: 'Gestionnaire de tâches avec priorités, filtres, sélection multiple et sauvegarde locale.',
    technologies: ['React', 'TypeScript', 'DaisyUI'],
    github: 'https://github.com/khaledopen/todolist-react'
  },
  {
    title: 'GoTech Portfolio',
    description: 'Site vitrine premium pour une agence de solutions digitales et logiciels sur mesure.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/khaledopen/GoTech-Portfolio'
  },
  {
    title: 'Robbie Lens Photographie',
    description: 'Portfolio de photographe avec galerie, page de présentation et formulaire de contact.',
    technologies: ['HTML', 'CSS', 'Responsive Design'],
    github: 'https://github.com/khaledopen/Portflio-Robbie-lens'
  },
  {
    title: 'Projet Église',
    description: 'Projet web consacré à la présence numérique et à la présentation d’une communauté religieuse.',
    technologies: ['Web', 'Interface utilisateur'],
    github: 'https://github.com/khaledopen/projet-eglise'
  },
  {
    title: 'Mon projet React',
    description: 'Projet d’apprentissage des composants, propriétés, listes et interactions de base avec React.',
    technologies: ['React', 'Vite', 'JavaScript'],
    github: 'https://github.com/khaledopen/mon-projet-react'
  },
  {
    title: 'Premier Projet',
    description: 'Premier exercice web versionné sur GitHub, réalisé en HTML et CSS.',
    technologies: ['HTML', 'CSS', 'Git'],
    github: 'https://github.com/khaledopen/PremierProjet'
  }
];

export const personalInfo = {
  name: 'KONE SORY BEN KHALED',
  shortName: 'Sory Ben Khaled',
  location: 'Abidjan, Côte d’Ivoire',
  linkedin: 'https://ci.linkedin.com/in/kone-sory-ben-khaled-71ba44308',
  github: 'https://github.com/khaledopen'
};
