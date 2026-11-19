/**
 * Informations personnelles. Ne renseigner que des informations réelles.
 * Les champs à `null` ne sont pas affichés.
 */
export const profile = {
  name: 'Kone Sory Ben Khaled',
  fullName: 'KONE SORY BEN KHALED',
  monogram: 'KSBK',
  role: 'Développeur web & mobile',
  location: 'Abidjan, Côte d’Ivoire',
  github: 'https://github.com/khaledopen',
  linkedin: 'https://ci.linkedin.com/in/kone-sory-ben-khaled-71ba44308',
  /** Adresse publique de contact — à renseigner si tu veux l'afficher. */
  email: null as string | null,
  /** Chemin d'un CV dans /public (ex. '/cv/kone-sory-ben-khaled.pdf') — à renseigner. */
  cv: null as string | null,
  /** Photo personnelle pour la section About (dans /public/images/about), avec extension. */
  portrait: null as { src: string; alt: string; width: number; height: number } | null
};
