import type { ProjectEntry } from '../types';

/**
 * CONTENU ÉDITORIAL DES PROJETS
 * ------------------------------------------------------------
 * Chaque entrée correspond à un dépôt GitHub (champ `repo`, nom exact).
 * Les dates et liens viennent de src/data/github.generated.json (npm run sync:github).
 *
 * Règles :
 *  - `summary`, `features` et `stack` doivent être vérifiables dans le dépôt (README, manifestes, code).
 *  - Pour masquer un projet sans le supprimer : `hidden: { reason: '…' }`.
 *  - `featured: true` → présentation immersive dans « Selected work ».
 *  - Un dépôt public non listé ici apparaît quand même dans l'archive (avec sa description GitHub),
 *    à condition d'être postérieur à GoTech-Portfolio, de ne pas être un fork et de ne pas être vide.
 *
 * Vérification initiale : 19/11/2026, à partir du contenu des dépôts (README, package.json, composer.json, pages).
 */
export const START_REPO = 'GoTech-Portfolio';

export const projectEntries: ProjectEntry[] = [
  {
    repo: 'GoTech-Portfolio',
    slug: 'gotech',
    title: 'GoTech',
    domain: 'Web & vitrine',
    summary: 'Site vitrine d’agence digitale : services, réalisations, méthode de travail et formulaire de contact.',
    features: ['Sections Solutions, Projets, Méthodologie et Contact', 'Formulaire de contact', 'Animations d’apparition au chargement'],
    stack: ['HTML', 'CSS', 'JavaScript']
  },
  {
    repo: 'Gestion-Loyer',
    slug: 'gestion-loyer',
    title: 'Gestion Loyer',
    domain: 'Immobilier',
    summary: 'Application de gestion locative : immeubles, appartements, locataires, paiements, impayés et réparations.',
    features: ['Suivi des immeubles, appartements et locataires', 'Paiements et suivi des impayés', 'Suivi des réparations', 'Export PDF (jsPDF)', 'Authentification JWT'],
    stack: ['React', 'React Router', 'Express', 'PostgreSQL', 'JWT', 'jsPDF']
  },
  {
    repo: 'ImmoScrap',
    slug: 'immoscrap',
    title: 'ImmoScrap',
    domain: 'Immobilier',
    summary: 'Plateforme de recherche immobilière avec carte interactive, comparateur et estimateur de prix, alertes et espace d’administration.',
    features: ['Recherche, fiches détaillées et favoris', 'Carte interactive (Leaflet)', 'Comparateur et estimateur de prix', 'Alertes', 'Administration : biens, utilisateurs, journaux, sources'],
    stack: ['React', 'Express', 'PostgreSQL', 'Leaflet', 'Recharts', 'Framer Motion']
  },
  {
    repo: 'attou-immoApk',
    slug: 'attouhome',
    title: 'AttouHome',
    domain: 'Immobilier',
    featured: true,
    summary: 'Plateforme de location qui met en relation propriétaires et locataires à Abidjan : deux applications mobiles, une console d’administration et une API.',
    features: [
      'Application propriétaire et application locataire (Expo / React Native)',
      'Carte interactive avec calcul d’itinéraire',
      'Messagerie en temps réel liée aux demandes de visite',
      'Autocomplétion des adresses pour les propriétaires',
      'Tâches automatiques : expiration des demandes de visite, modération des annonces',
      'Console d’administration web'
    ],
    stack: ['React Native', 'Expo', 'React', 'Express', 'Prisma', 'Socket.io', 'Cloudinary', 'Nodemailer'],
    note: 'Le dépôt « projet-attou-immo » contient la première version de l’application locataire.'
  },
  {
    repo: 'projet-eglise',
    slug: 'projet-eglise',
    title: 'Projet Église',
    domain: 'Associatif',
    summary: 'Application de vie communautaire pour une église : annonces, cotisations, répertoire des membres et partage de la Parole.',
    features: ['Inscription et connexion', 'Annonces', 'Suivi des cotisations', 'Répertoire des membres', 'Tableau de bord'],
    stack: ['React', 'Tailwind CSS', 'Express', 'PostgreSQL', 'JWT']
  },
  {
    repo: 'whraf-hotel',
    slug: 'wharf-hotel',
    title: 'Wharf Hôtel',
    domain: 'Hôtellerie & services',
    featured: true,
    summary: 'Site et back-office d’un hôtel : réservations persistées en base, administration sécurisée et notifications par e-mail.',
    features: [
      'Réservations et demandes enregistrées dans PostgreSQL',
      'Sessions administrateur sécurisées (express-session, Helmet, limitation de débit)',
      'File d’envoi d’e-mails de confirmation (Nodemailer)',
      'Validation des données avec Zod',
      'Exports Excel et PDF depuis l’administration',
      'Migrations transactionnelles et relançables'
    ],
    stack: ['React', 'Vite', 'Express', 'PostgreSQL', 'Nodemailer', 'Zod']
  },
  {
    repo: 'flux-financiers',
    slug: 'monbudget',
    title: 'MonBudget',
    domain: 'Gestion & finance',
    featured: true,
    summary: 'Gestion financière personnelle : revenus et dépenses, budgets mensuels, objectifs d’épargne et prévisions sur trois ou six mois.',
    features: [
      'Suivi des revenus et des dépenses par catégorie',
      'Budgets mensuels',
      'Objectifs d’épargne',
      'Prévision à partir des 3 ou 6 derniers mois',
      'API REST protégée par JWT',
      'Tests unitaires des calculs financiers'
    ],
    stack: ['React', 'Tailwind CSS', 'Chart.js', 'Express', 'PostgreSQL', 'JWT']
  },
  {
    repo: 'Gestion-Caisse',
    slug: 'caisseflow',
    title: 'CaisseFlow',
    domain: 'Gestion & finance',
    featured: true,
    summary: 'Caisse d’entreprise partagée entre plusieurs utilisateurs : chaque opération est signée par son auteur et visible sur un tableau de bord commun.',
    features: [
      'Entrées, sorties et mouvements de fonds',
      'Tableau de bord partagé et graphiques',
      'Reçus PDF (DomPDF) et exports Excel',
      'Documents partagés',
      'Journal d’activité',
      'Suite de tests automatisés'
    ],
    stack: ['Laravel 12', 'PHP', 'MySQL', 'Bootstrap 5', 'Chart.js'],
    images: [
      {
        src: '/projects/caisseflow-dashboard.png',
        alt: 'Tableau de bord de CaisseFlow : solde global, total des entrées et des sorties, opérations du jour',
        caption: 'Tableau de bord',
        width: 1899,
        height: 886
      },
      { src: '/projects/caisseflow-documents.png', alt: 'Écran de gestion des documents partagés dans CaisseFlow', caption: 'Documents partagés', width: 1899, height: 886 }
    ],
    note: 'Le dépôt s’appelle Gestion-Caisse ; son README utilise encore l’ancien nom « Clair ».'
  },
  {
    repo: 'institut-beauty',
    slug: 'belleza',
    title: 'Belleza',
    domain: 'Hôtellerie & services',
    featured: true,
    summary: 'SaaS de gestion pour instituts de beauté en Côte d’Ivoire : agenda, prestations, clients et équipe, avec données isolées par établissement.',
    features: [
      'Agenda et réservations, protégés contre les créneaux simultanés',
      'Prestations, clients et équipe',
      'Isolation des données par établissement',
      'Formulaires validés (React Hook Form + Zod)',
      'Statistiques (Recharts)'
    ],
    stack: ['React', 'TypeScript', 'TanStack Query', 'Express', 'Prisma', 'PostgreSQL']
  },
  {
    repo: 'my-portfolio',
    slug: 'portfolio-v1',
    title: 'Portfolio v1',
    domain: 'Web & vitrine',
    summary: 'Première version éditoriale de ce portfolio.',
    features: [],
    stack: ['React', 'Vite'],
    hidden: { reason: 'Ancienne version de ce site.' }
  },
  {
    repo: 'Bot_english',
    slug: 'englishmate',
    title: 'EnglishMate AI',
    domain: 'IA & bots',
    featured: true,
    summary: 'Bot Telegram pour pratiquer l’anglais à l’écrit comme à l’oral : il transcrit les vocaux, corrige en français et répond par une note vocale.',
    features: [
      'Transcription des messages vocaux (Whisper)',
      'Corrections expliquées en français',
      'Réponses vocales en synthèse de voix',
      'Trois niveaux : débutant, intermédiaire, avancé',
      'Mémoire des derniers échanges',
      'Comptes et activité stockés dans PostgreSQL'
    ],
    stack: ['Node.js', 'Telegraf', 'Groq', 'OpenAI', 'PostgreSQL'],
    note: 'Le site de présentation est dans le dépôt « bot-site ».'
  },
  {
    repo: 'testeur-wifi',
    slug: 'speedtest',
    title: 'SpeedTest Web',
    domain: 'Outils',
    summary: 'Test de vitesse de connexion en temps réel : ping, gigue, débit descendant et montant mesurés entre le navigateur et le serveur.',
    features: ['Ping et gigue sur six requêtes', 'Débit descendant mesuré en flux (ReadableStream)', 'Débit montant', 'Back-end au choix : Express ou FastAPI'],
    stack: ['React', 'Express', 'FastAPI', 'Python']
  },
  {
    repo: 'Asso',
    slug: 'un-sourire-pour-tissem',
    title: 'Un sourire pour Tissem',
    domain: 'Associatif',
    summary: 'Site d’association pour l’inclusion, l’autonomie et le bien-être des enfants extraordinaires, avec formulaire de contact et lien de don.',
    features: ['Pages de présentation de l’association', 'Formulaire de contact (envoi via Brevo)', 'Lien vers la collecte HelloAsso'],
    stack: ['React', 'TypeScript', 'vinext', 'Drizzle', 'Tailwind CSS']
  },
  {
    repo: 'Portail-inter-associatif',
    slug: 'portail-inter-associatif',
    title: 'Portail inter-associatif',
    domain: 'Associatif',
    summary: 'Guichet numérique solidaire pour les associations d’Orléans et du Loiret : annuaire, réservation rapide, espaces usagers et professionnels.',
    features: [
      'Annuaire et fiches associations',
      'Parcours de réservation rapide et annulation',
      'Espace usager et espace professionnel',
      'Observatoire pour l’administration',
      'Carte (Leaflet) et statistiques (Recharts)',
      'Base Supabase avec migrations et tests'
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Leaflet', 'Recharts', 'Tailwind CSS']
  },
  {
    repo: 'Anniv-SD',
    slug: 'birthday-magic',
    title: 'Birthday Magic',
    domain: 'Web & vitrine',
    summary: 'Site d’anniversaire interactif et animé, entièrement configurable depuis un seul fichier de données.',
    features: ['Animations GSAP et Framer Motion', 'Galerie de photos', 'Confettis', 'Musique de fond à la demande'],
    stack: ['React', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
    hidden: { reason: 'Projet personnel (cadeau d’anniversaire). Retirer cette ligne pour l’afficher.' }
  },
  {
    repo: 'bot-site',
    slug: 'englishmate-site',
    title: 'EnglishMate — site',
    domain: 'IA & bots',
    summary: 'Site de présentation et espace compte du bot EnglishMate AI.',
    features: ['Page de présentation du bot', 'Espace compte relié à Supabase'],
    stack: ['React', 'TypeScript', 'Supabase', 'Motion']
  },

  // Dépôts antérieurs à GoTech-Portfolio, déjà présentés dans la v1 : affichés sur décision manuelle.
  {
    repo: 'artisans-ci-frontend',
    slug: 'artisans-ci',
    title: 'ArtisanCI',
    domain: 'Hôtellerie & services',
    summary: 'Mise en relation entre clients et artisans qualifiés (plomberie, électricité, serrurerie, peinture…), avec espaces client, artisan et administrateur.',
    features: ['Recherche d’artisans et profils', 'Création et suivi de demandes', 'Avis clients', 'Tableaux de bord client, artisan et administrateur'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Axios'],
    includeBeforeStart: { reason: 'Premier commit le 09/01/2026, avant GoTech-Portfolio. Conservé car présenté dans la v1.' }
  },
  {
    repo: 'projet-attou-immo',
    slug: 'attou-immo-locataire',
    title: 'Attou Immo — application locataire',
    domain: 'Immobilier',
    summary: 'Première version de l’application mobile locataire d’AttouHome : carte, géolocalisation, calendrier de visites et messagerie.',
    features: ['Carte et géolocalisation', 'Calendrier', 'Stockage local', 'Échanges en temps réel (Socket.io)'],
    stack: ['React Native', 'Expo', 'Socket.io'],
    includeBeforeStart: { reason: 'Premier commit le 11/05/2026, avant GoTech-Portfolio. Conservé car présenté dans la v1.' }
  }
];
