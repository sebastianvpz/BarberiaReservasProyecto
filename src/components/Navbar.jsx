import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo-gold">
          BARBER<span>PRO</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/reservar">Reservar</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
    </header>
  );
};