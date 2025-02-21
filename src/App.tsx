import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header/header';
import Comments from './pages/Comments';
import WebShop from './pages/WebShop';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { toggleTheme } from './redux/slices/themeSlice';
import './App.css'; // Stilovi za teme

const App: React.FC = () => {
  // Preuzimanje stanja teme iz Redux-a
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleCartUpdate = (count: number) => {
    setCartCount(count);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        <Header cartCount={cartCount} />
        {/* Gumb za prebacivanje teme */}
        <button onClick={() => dispatch(toggleTheme())} className="theme-toggle">
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        {/* Rute za razne stranice */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Početna stranica */}
          <Route path="/comments" element={<Comments />} /> {/* Stranica za komentare */}
          <Route path="/webshop" element={<WebShop onCartUpdate={handleCartUpdate} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
