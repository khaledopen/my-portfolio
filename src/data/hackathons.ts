import type { HackathonEvent } from '../types';

/**
 * HACKATHONS, CONCOURS ET ÉVÉNEMENTS
 * ------------------------------------------------------------
 * Ajouter un événement = ajouter un objet dans ce tableau. Aucun composant à modifier.
 *
 * 1. Dépose les photos dans public/images/hackathons/, public/images/competitions/ ou public/images/events/
 * 2. Lance `npm run images` pour générer les versions AVIF/WebP (garde l'original en .jpg/.png)
 * 3. Renseigne `src` (chemin de l'original, avec extension) avec la largeur et la hauteur réelles de l'image.
 * 4. `result` uniquement s'il est confirmé (classement, prix…).
 *
 * Exemple (à copier, ne pas décommenter tel quel) :
 *
 * {
 *   slug: 'nom-du-hackathon-2026',
 *   name: 'Nom du hackathon',
 *   kind: 'hackathon',
 *   date: '2026-03-14',
 *   location: 'Abidjan',
 *   description: 'Ce qui s’est passé, en deux phrases.',
 *   role: 'Développeur front-end',
 *   team: ['Prénom Nom', 'Prénom Nom'],
 *   challenge: 'Le problème posé.',
 *   project: 'Nom du projet présenté',
 *   result: '2e place',
 *   lesson: 'Ce que j’en retiens.',
 *   photos: [
 *     { src: '/images/hackathons/nom-2026-01.jpg', alt: 'L’équipe pendant la présentation finale', width: 1600, height: 1067 }
 *   ]
 * },
 */
export const hackathons: HackathonEvent[] = [];
