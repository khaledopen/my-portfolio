import { createContext, useContext } from 'react';

/** `true` quand l'intro est terminée (ou n'a pas besoin d'être jouée). */
export const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);
