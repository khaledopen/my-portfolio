import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/editorial/EditorialHero';
import About from './components/editorial/EditorialAbout';
import Experience from './components/editorial/EditorialProcess';
import Projects from './components/editorial/EditorialProjects';
import OtherProjects from './components/editorial/EditorialArchive';
import Contact from './components/editorial/EditorialContact';

function PortfolioPage() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <OtherProjects />
      <Experience />
      <Contact />
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
