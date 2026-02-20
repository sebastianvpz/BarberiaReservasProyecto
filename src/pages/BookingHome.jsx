import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

export const BookingHome = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServicios() {
      // Limitamos a 3 para el Home
      const { data } = await supabase.from('servicios').select('*').limit(3);
      if (data) setServicios(data);
    }
    fetchServicios();
  }, []);

  // Función para manejar el clic en un servicio específico
  const seleccionarServicioDirecto = (servicio) => {
    navigate('/reservar', { state: { servicioDirecto: servicio } });
  };

  return (
    <div className="theme-booking" style={{ backgroundColor: 'var(--booking-bg)', color: 'white' }}>
      
      {/* SECCIÓN HERO */}
      <section style={{ 
        height: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200") center/cover'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--booking-gold)' }}>ESTILO & PRECISIÓN</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>Reserva tu experiencia de cuidado personal de lujo.</p>
          <Link to="/reservar" className="btn-gold">
            RESERVAR CITA AHORA
          </Link>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS DINÁMICOS */}
      <section className="container" style={{ padding: '5rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Nuestros Servicios</h2>
          <Link to="/reservar" style={{ color: 'var(--booking-gold)', textDecoration: 'none', fontWeight: 'bold' }}>
            VER TODO →
          </Link>
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {servicios.map((s) => (
            <motion.div 
              key={s.id} 
              className="service-card-mini"
              whileHover={{ y: -10 }}
              style={{ cursor: 'pointer' }}
              onClick={() => seleccionarServicioDirecto(s)} // Salta al Paso 2
            >
              <img src={s.imagen_url || 'https://via.placeholder.com/400'} alt={s.nombre} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--booking-gold)' }}>{s.nombre}</h3>
                <p style={{ color: 'var(--booking-muted)' }}>{s.duracion_minutos} min • ${s.precio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};