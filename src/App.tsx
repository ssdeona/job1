import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { VacanciesPage } from './pages/VacanciesPage';
import { AboutPage } from './pages/AboutPage';
import VacancyPage from './pages/VacancyPage';
import { NotFoundPage } from './pages/NotFoundPage';  

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<VacanciesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
        <Route path="*" element={<NotFoundPage />} />   
      </Routes>
    </>
  );
}

export default App;