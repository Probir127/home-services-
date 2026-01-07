import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PricesPage from './pages/PricesPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import ServiceListPage from './pages/ServiceListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/layout/PageTransition';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            } />
            <Route path="/om-oss" element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            } />
            <Route path="/priser" element={
              <PageTransition>
                <PricesPage />
              </PageTransition>
            } />
            <Route path="/kontakt" element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            } />
            <Route path="/begar-offert" element={
              <PageTransition>
                <QuotePage />
              </PageTransition>
            } />

            <Route path="/services" element={
              <PageTransition>
                <ServiceListPage />
              </PageTransition>
            } />
            <Route path="/services/:category" element={
              <PageTransition>
                <ServiceListPage />
              </PageTransition>
            } />
            <Route path="/services/:category/:slug" element={
              <PageTransition>
                <ServiceDetailPage />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
