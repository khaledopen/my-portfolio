import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/layouts/SiteLayout';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route
            path="projets"
            element={
              <Suspense fallback={<p className="grid min-h-svh place-items-center">Chargement…</p>}>
                <ProjectsPage />
              </Suspense>
            }
          />
          {/* Anciennes adresses de pages projet → liste complète */}
          <Route path="projects/*" element={<Navigate to="/projets" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
