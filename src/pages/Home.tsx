import React from 'react';
import './Home.css'; // Uvezi stilove
import ServiceMenu from '../components/header/ServiceMenu';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Navigacijska traka */}
      {/*
      <nav className="navbar">
        <ul className="navbar-list">
          <li><a href="#about">O nama</a></li>
          <li><a href="#services">Usluge</a></li>
          <li className="circle-container">
            <div className="central-circle">
              <span>Ponuda</span>
            </div>
          </li>
          <li><a href="#location">Lokacija</a></li>
          <li><a href="#contact">Kontakt</a></li>
        </ul>
      </nav>
    	*/}
      {/* Sekcija o nama */}
      <section id="about" className="section about-section">
        <h1>O nama</h1>
        <p>Mi smo moderna praonica koja nudi brze i efikasne usluge pranja i sušenja rublja.</p>
      </section>

      {/* Usluge */}
      <section id="services" className="section services-section">
        <h1>Naše usluge</h1>
        <ServiceMenu/>
      </section>

      {/* Lokacija */}
      <section id="location" className="section location-section">
        <h1>Naša lokacija</h1>
        <p>Posjetite nas na glavnoj ulici. Dostupna besplatna parkirna mjesta.</p>
      </section>

      {/* Kontakt */}
      <section id="contact" className="section contact-section">
        <h1>Kontaktirajte nas</h1>
        <p>Telefon: 123-456-789</p>
        <p>Email: info@praonica.com</p>
      </section>
    </div>
  );
};

export default Home;