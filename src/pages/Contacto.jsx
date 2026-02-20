import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';

export const Contacto = () => {

  const [mapLoaded, setMapLoaded] = useState(false);
  return (
    <div className="container anim-fade-in" style={{ padding: '5rem 0' }}>
      <h1 className="step-title" style={{ fontSize: '3rem' }}>CONTACTO</h1>
      
      <div className="contact-grid">
        {/* COLUMNA DE INFORMACIÓN */}
        <div className="contact-info-section">
          <div className="info-item">
            <div className="icon-gold"><MapPin size={24} /></div>
            <div>
              <h3>Ubicación</h3>
              <p>Av. Mariscal La Mar 549, Miraflores</p>
              <p>Lima, Perú</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-gold"><Phone size={24} /></div>
            <div>
              <h3>Teléfono</h3>
              <p>+51 1 407 7380</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-gold"><Mail size={24} /></div>
            <div>
              <h3>Email</h3>
              <p>contacto@barberpro.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-gold"><Clock size={24} /></div>
            <div>
              <h3>Horarios</h3>
              <p>Lun - Sáb: 9:00 AM - 9:00 PM</p>
              <p>Dom: 10:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="map-container">
          <iframe
            onLoad={() => setMapLoaded(true)}
              style={{ 
                opacity: mapLoaded ? 1 : 0, 
                transition: 'opacity 1s ease',
                border: 0, 
                borderRadius: '15px' 
              }} 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4830.479957875632!2d-77.0439351!3d-12.115202600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c83a13deed49%3A0x3a20e2a3cd66f889!2sAv.%20Mariscal%20La%20Mar%20549%2C%20Miraflores%2015074!5e1!3m2!1ses-419!2spe!4v1771535166303!5m2!1ses-419!2spe" 
            width="100%" 
            height="450" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
