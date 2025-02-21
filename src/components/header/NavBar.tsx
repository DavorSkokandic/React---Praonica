import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../header/NavBar';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li><button onClick={() => handleScroll('home')}>Home</button></li>
        <li><button onClick={() => handleScroll('about')}>O nama</button></li>
        <li><button onClick={() => handleScroll('location')}>Lokacija</button></li>
        <li><button onClick={() => handleScroll('contact')}>Kontakt</button></li>
        <li><Link to="/comments">Komentari</Link></li>
        <li><Link to="/webshop">Web Shop</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
