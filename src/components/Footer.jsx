
import { Instagram, Facebook, X } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="logo-gold">BARBER<span>PRO</span></h2>
            <p>Donde el estilo se encuentra con la tradición.</p>
          </div>
          
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><X size={20} /></a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 JB Proyectos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};