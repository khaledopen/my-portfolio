const values = [
  { name: 'Discipline', line: 'La régularité fait plus que l’inspiration. On revient au travail, même les jours sans élan.' },
  { name: 'Persévérance', line: 'Un bug têtu n’est qu’une question qui n’a pas encore trouvé sa réponse.' },
  { name: 'Excellence', line: 'Le détail que personne ne remarque est souvent celui qui fait tenir l’ensemble.' },
  { name: 'Curiosité', line: 'Laravel, Expo, Prisma, Supabase, l’IA vocale : chaque projet m’a obligé à apprendre autre chose.' },
  { name: 'Créativité', line: 'Je préfère montrer une idée qui fonctionne plutôt que la décrire.' },
  { name: 'Ambition', line: 'Construire à Abidjan des produits qui tiennent la comparaison avec ce qui se fait ailleurs.' }
];

const method = [
  ['Écouter', 'Comprendre le besoin, le contexte et les personnes qui utiliseront le produit.'],
  ['Structurer', 'Transformer les idées en parcours clair, en modèle de données et en priorités.'],
  ['Concevoir', 'Dessiner une interface lisible, cohérente, adaptée à chaque écran.'],
  ['Développer', 'Donner vie au produit sur une base technique solide et maintenable.'],
  ['Affiner', 'Tester, corriger les détails, préparer la suite.']
] as const;

export function Philosophy() {
  return (
    <section id="philosophy" className="section philosophy is-day" aria-labelledby="philosophy-title">
      <div className="wrap section-head">
        <h2 id="philosophy-title">Bâti par la discipline.</h2>
        <p>Je crois au travail acharné, à l’amélioration constante et aux projets qui existent vraiment.</p>
      </div>

      <div className="wrap">
        <ul className="values">
          {values.map(value => (
            <li key={value.name}>
              <h3>{value.name}</h3>
              <p>{value.line}</p>
            </li>
          ))}
        </ul>

        <div className="method">
          <h3 className="method__title">Ma méthode, projet après projet</h3>
          <ol className="method__steps">
            {method.map(([name, detail], index) => (
              <li key={name}>
                <span className="mono">{index + 1}</span>
                <strong>{name}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
