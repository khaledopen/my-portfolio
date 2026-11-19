import { worldPlates } from '../data/world';
import { HorizonPlate } from '../components/HorizonPlate';
import { Picture } from '../components/Picture';

export function World() {
  return (
    <section id="world" className="section world is-day" aria-labelledby="world-title">
      <div className="wrap section-head">
        <h2 id="world-title">Loin de l’écran.</h2>
        <p>Les belles vues, le calme, l’architecture. Ce qui m’inspire quand je ne code pas finit toujours par revenir dans ce que je construis.</p>
      </div>
      <div className="wrap world__journal">
        {worldPlates.map((plate, index) => (
          <figure key={plate.id} className={`world__plate world__plate--${index + 1}`}>
            <div className="world__frame">
              {plate.photo ? <Picture src={plate.photo.src} alt={plate.photo.alt} width={plate.photo.width} height={plate.photo.height} /> : <HorizonPlate hour={plate.hour} seed={index * 2.7 + 1} />}
            </div>
            <figcaption>
              {plate.caption}
              {plate.photo?.credit && <span className="world__credit mono"> Photo : {plate.photo.credit}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
