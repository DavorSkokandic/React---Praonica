import React, { useState } from 'react';
import './ServiceMenu.css';

const ServiceMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { name: 'Pranje', link: '/webshop' },
    { name: 'Sušenje', link: '/webshop' },
    { name: 'Peglanje', link: '/webshop' },
    { name: 'Dostava', link: '/webshop' }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`service-menu ${menuOpen ? 'open' : 'closing'}`}>
      <div className="main-circle" onClick={toggleMenu}>
        <span className="main-circle-text">Usluge</span>
      </div>
      <div className="service-circles">
        {services.map((service, index) => (
          <a key={index} href={service.link} className="service-link">
            <div className="service-circle">{service.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ServiceMenu;
