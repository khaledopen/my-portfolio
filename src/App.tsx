import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const ProjectPage = lazy(() => import('./pages/ProjectPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route
            path="projects/:slug"
            element={
              <Suspense
                fallback={
                  <div className="page-loading" role="status">
                    Chargement du projet…
                  </div>
                }
              >
                <ProjectPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
