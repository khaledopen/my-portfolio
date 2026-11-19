/**
 * « Loin de l’écran » — journal visuel.
 * Tant qu'aucune photo n'est fournie, chaque planche est un horizon dessiné en code
 * (aucune fausse photographie). Pour utiliser une vraie photo : renseigner `photo`
 * (fichier dans public/images/world/, avec extension) et son `credit` si elle n'est pas de toi.
 */
export interface WorldPlate {
  id: string;
  hour: 'dawn' | 'noon' | 'dusk' | 'night';
  caption: string;
  photo?: { src: string; alt: string; width: number; height: number; credit?: string };
}

export const worldPlates: WorldPlate[] = [
  { id: 'horizon', hour: 'dawn', caption: 'Une belle vue remet les priorités dans l’ordre.' },
  { id: 'calme', hour: 'noon', caption: 'Le calme, c’est là que les meilleures idées arrivent.' },
  { id: 'architecture', hour: 'dusk', caption: 'Une ligne juste, un détail soigné : ça se voit tout de suite.' },
  { id: 'nuit', hour: 'night', caption: 'Les projets avancent souvent quand tout le monde dort.' }
];
