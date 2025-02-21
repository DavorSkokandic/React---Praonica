import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          <h1>Praonica na 90</h1>
        </NavLink>
      </div>

      {!menuOpen && (  // Košarica nestaje kad je meni otvoren
        <div className="cart-icon" title="Košarica">
          <NavLink to="/webshop">
          <FaShoppingCart style={{ color: '#fff', fontSize: '1.8rem' }} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </NavLink>
        </div>
      )}

      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-items">
          <li>
            <button onClick={() => { handleScroll('about'); setMenuOpen(false); }}>O nama</button>
          </li>
          <li>
            <button onClick={() => { handleScroll('location'); setMenuOpen(false); }}>Lokacija</button>
          </li>
          <li>
            <button onClick={() => { handleScroll('contact'); setMenuOpen(false); }}>Kontakt</button>
          </li>
          <li>
            <NavLink to="/comments" onClick={() => setMenuOpen(false)}>
              Komentari
            </NavLink>
          </li>
          <li>
            <NavLink to="/webshop" onClick={() => setMenuOpen(false)}>
              Web Shop
            </NavLink>
          </li>
        </ul>
        {menuOpen && (
          <div className="close-icon" onClick={toggleMenu}>
            <FaTimes />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
