import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // <--- FALTA ESTA LÍNEA
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingHome } from './pages/BookingHome';
import { Reservas } from './pages/Reservas';
import { Contacto } from './pages/Contacto';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait"> 
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <BookingHome />
            </PageWrapper>
          } 
        />
        <Route 
          path="/reservar" 
          element={
            <PageWrapper>
              <Reservas />
            </PageWrapper>
          } 
        />
        <Route 
          path="/contacto" 
          element={
            <PageWrapper>
              <Contacto />
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <div className="app-main">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;