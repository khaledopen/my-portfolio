import React from 'react';
import Button from '../ui/Button';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { personalInfo } from '../../utils/constants';

const Contact = () => {
  const [ref, , hasIntersected] = useIntersectionObserver();

  return (
    <section id="contact" ref={ref} className="py-24 px-6 lg:px-20 bg-nb-white">
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-2 border-nb-black p-10 md:p-16 shadow-brutal-xl bg-nb-yellow text-center">
            <p className="font-mono text-sm font-medium text-nb-black mb-4 tracking-widest uppercase">04. Et maintenant ?</p>
            <h2 className="font-display font-black text-nb-black text-clamp-3xl md:text-clamp-4xl mb-6 leading-tight">Construisons quelque chose ensemble.</h2>
            <p className="text-nb-black/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">Une idée, une opportunité ou simplement envie d’échanger ? Je suis disponible pour discuter de nouveaux projets et de collaborations.</p>
            <Button href={personalInfo.linkedin} variant="outline" size="lg" className="bg-nb-black text-nb-white border-nb-black hover:bg-nb-black/80 shadow-none">Me contacter sur LinkedIn ↗</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
