import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  User, 
  Mail 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Reservas = () => {
  const location = useLocation();
  const [paso, setPaso] = useState(location.state?.servicioDirecto ? 2 : 1);
  const [servicios, setServicios] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  
  const [seleccion, setSeleccion] = useState({
    servicio: location.state?.servicioDirecto || null,
    fecha: '',
    hora: '',
    cliente_nombre: '',
    cliente_email: ''
  });

  
  const horariosBase = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const hoy = new Date().toISOString().split('T')[0];
  const ahora = new Date();
  const horaActualStr = ahora.getHours().toString().padStart(2, '0') + ":" + ahora.getMinutes().toString().padStart(2, '0');

  useEffect(() => {
    emailjs.init("LpyYc4QvTDEUo4kZs");
    fetchServicios();
  }, []);

  useEffect(() => {
    if (seleccion.fecha) {
      fetchDisponibilidad();
    }
  }, [seleccion.fecha]);


  async function fetchServicios() {
    const { data } = await supabase.from('servicios').select('*');
    if (data) setServicios(data);
    setCargando(false);
  }

  async function fetchDisponibilidad() {
    const { data, error } = await supabase
      .from('citas')
      .select('hora')
      .eq('fecha', seleccion.fecha);

    if (!error && data) {
      const ocupadas = data.map(cita => cita.hora.slice(0, 5));
      setHorasOcupadas(ocupadas);
    }
  }

  const enviarConfirmacionEmail = async () => {
    const templateParams = {
      cliente_nombre: seleccion.cliente_nombre,
      cliente_email: seleccion.cliente_email,
      servicio_nombre: seleccion.servicio.nombre,
      fecha: seleccion.fecha,
      hora: seleccion.hora
    };

    return emailjs.send('service_lx0v52d', 'template_5et2dhp', templateParams);
  };

  const guardarReserva = async () => {
    setEnviando(true);
    const { error } = await supabase.from('citas').insert([{
      fecha: seleccion.fecha,
      hora: seleccion.hora,
      cliente_nombre: seleccion.cliente_nombre,
      cliente_email: seleccion.cliente_email,
      servicio_id: seleccion.servicio.id
    }]);

    if (error) {
      alert("Error: " + error.message);
      setEnviando(false);
      return;
    }

    try {
      await enviarConfirmacionEmail();
      setPaso(4);
    } catch (e) {
      setPaso(4); 
    } finally {
      setEnviando(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      
      {/* INDICADOR DE PASOS */}
      {paso < 4 && (
        <div className="steps-indicator">
          <div className={`step ${paso >= 1 ? 'active' : ''}`}><span>1</span> Servicio</div>
          <div className={`step ${paso >= 2 ? 'active' : ''}`}><span>2</span> Horario</div>
          <div className={`step ${paso >= 3 ? 'active' : ''}`}><span>3</span> Datos</div>
        </div>
      )}

      {/* --- PASO 1: SERVICIOS --- */}
      {paso === 1 && (
        <div className="booking-step-content">
          <h2 className="step-title">Selecciona un Servicio</h2>
          
          <AnimatePresence mode="wait">
            {cargando ? (
              <motion.div 
                key="loading-skeletons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="services-list"
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="skeleton skeleton-item" />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="content-loaded"
                className="services-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {servicios.map((s) => (
                  <motion.div 
                    key={s.id} 
                    variants={itemVariants}
                    className={`service-card-booking ${seleccion.servicio?.id === s.id ? 'selected' : ''}`}
                    onClick={() => setSeleccion({ ...seleccion, servicio: s })}
                  >
                    <div className="service-info">
                      <h3>{s.nombre}</h3>
                      <p>{s.duracion_minutos} min • ${s.precio}</p>
                    </div>
                    {seleccion.servicio?.id === s.id && <Check color="var(--gold)" />}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="booking-actions">
            <button className="btn-gold" disabled={!seleccion.servicio} onClick={() => setPaso(2)}>
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {/* --- PASO 2: FECHA Y HORA --- */}
      {paso === 2 && (
        <motion.div 
          className="booking-step-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <button className="btn-back-minimal" onClick={() => setPaso(1)}>
            <ChevronLeft size={18} /> Volver a servicios
          </button>
          <h2 className="step-title">Reserva tu Horario</h2>
          <div className="datetime-wrapper">
            <div className="date-picker-section">
              <label><CalendarIcon size={18} /> Fecha</label>
              <input 
                type="date" min={hoy} className="input-custom" value={seleccion.fecha} 
                onChange={(e) => setSeleccion({...seleccion, fecha: e.target.value, hora: ''})} 
              />
            </div>
            <div className="time-picker-section">
              <label><Clock size={18} /> Horas disponibles</label>
              <div className="time-grid">
                {horariosBase.map(h => {
                  const estaOcupada = horasOcupadas.includes(h);
                  const yaPaso = (seleccion.fecha === hoy && h <= horaActualStr);
                  const deshabilitado = estaOcupada || yaPaso;
                  return (
                    <button 
                      key={h} disabled={deshabilitado}
                      className={`time-slot ${seleccion.hora === h ? 'selected' : ''} ${deshabilitado ? 'disabled' : ''}`}
                      onClick={() => setSeleccion({...seleccion, hora: h})}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="booking-actions">
            <button className="btn-gold" disabled={!seleccion.fecha || !seleccion.hora} onClick={() => setPaso(3)}>
              CONTINUAR
            </button>
          </div>
        </motion.div>
      )}

      {/* --- PASO 3: FORMULARIO --- */}
      {paso === 3 && (
        <motion.div 
          className="booking-step-content" 
          style={{ maxWidth: '500px', margin: '0 auto' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button className="btn-back-minimal" onClick={() => setPaso(2)}>
            <ChevronLeft size={18} /> Volver al calendario
          </button>
          <h2 className="step-title">Tus Datos</h2>
          <div className="form-group">
            <label><User size={16} /> Nombre completo</label>
            <input type="text" className="input-custom" placeholder="Tu nombre" 
              onChange={(e) => setSeleccion({...seleccion, cliente_nombre: e.target.value})} />
          </div>
          <div className="form-group">
            <label><Mail size={16} /> Correo electrónico</label>
            <input type="email" className="input-custom" placeholder="email@ejemplo.com" 
              onChange={(e) => setSeleccion({...seleccion, cliente_email: e.target.value})} />
          </div>
          <div className="resumen-final">
            <h4>Detalle de la cita:</h4>
            <p><strong>{seleccion.servicio.nombre}</strong></p>
            <p>{seleccion.fecha} a las {seleccion.hora}hs</p>
          </div>
          <button 
            className="btn-gold" style={{ width: '100%' }}
            disabled={!seleccion.cliente_nombre || !seleccion.cliente_email || enviando}
            onClick={guardarReserva}
          >
            {enviando ? "PROCESANDO..." : "CONFIRMAR RESERVA"}
          </button>
        </motion.div>
      )}

      {/* --- PASO 4: ÉXITO --- */}
      {paso === 4 && (
        <motion.div 
          className="booking-step-content" style={{ textAlign: 'center', padding: '4rem 0' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ color: 'var(--gold)', marginBottom: '2rem' }}>
            <Check size={80} style={{ margin: '0 auto', border: '2px solid var(--gold)', borderRadius: '50%', padding: '10px' }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--gold)' }}>¡Todo listo!</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1.5rem 0', fontSize: '1.1rem' }}>
            Gracias, <strong>{seleccion.cliente_nombre}</strong>. <br />
            Tu reserva ha sido confirmada correctamente.
          </p>
          <button className="btn-gold" onClick={() => window.location.href = '/'}>
            VOLVER AL INICIO
          </button>
        </motion.div>
      )}
    </div>
  );
};