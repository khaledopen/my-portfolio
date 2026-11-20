/**
 * MA PELLICULE — photos et vidéos de la pile à déplacer.
 *
 * Pour en ajouter :
 *  1. Photo : dépose-la dans public/images/photos/ (jpg ou png).
 *     Vidéo : dépose-la dans public/videos/ (mp4), avec une image d'aperçu .jpg du même nom.
 *  2. Lance `npm run images` (versions AVIF/WebP plus légères).
 *  3. Ajoute une ligne ci-dessous avec ses dimensions réelles.
 */
export interface PileItem {
  /** Image (ou aperçu de la vidéo) — chemin dans /public, avec extension */
  src: string;
  /** Vidéo mp4 facultative : lue en boucle sans le son dans la pile, avec le son dans la vue rapprochée */
  video?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const pileItems: PileItem[] = [
  {
    src: '/images/photos/design-sprint-universitaire.jpg',
    alt: 'Quatre étudiants en t-shirts orange devant la bannière du Design Sprint Universitaire',
    caption: 'Design Sprint Universitaire',
    width: 810,
    height: 1080
  },
  {
    src: '/videos/robot-demo.jpg',
    video: '/videos/robot-demo.mp4',
    alt: 'Vidéo : un petit robot roulant fait sa démonstration dans un amphithéâtre devant des enfants et des étudiants',
    caption: 'Le robot en démonstration',
    width: 464,
    height: 832
  },
  {
    src: '/images/photos/equipe.jpg',
    alt: 'Cinq étudiants en chemise et cravate assis sur des gradins, souriants',
    caption: 'Avec l’équipe',
    width: 1080,
    height: 810
  },
  {
    src: '/images/photos/robot-arduino.jpg',
    alt: 'Robot roulant fait maison : châssis transparent, carte Arduino, câbles et piles',
    caption: 'Notre robot Arduino',
    width: 810,
    height: 1080
  },
  {
    src: '/videos/robot-reglages.jpg',
    video: '/videos/robot-reglages.mp4',
    alt: 'Vidéo : gros plan sur le robot posé sur une table pendant les réglages',
    caption: 'Derniers réglages',
    width: 464,
    height: 832
  }
];
