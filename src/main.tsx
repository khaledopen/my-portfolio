import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/nunito';
import './styles/index.css';
import App from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('Élément #root introuvable dans index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
