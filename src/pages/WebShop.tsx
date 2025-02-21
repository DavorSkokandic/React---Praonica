import React, { useState, useEffect } from 'react';
import './WebShop.css';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem extends Service {
  quantity: number;
}

interface ShopProps {
  onCartUpdate: (count: number) => void;
}

const services: Service[] = [
  { id: 1, name: 'Pranje', description: 'Pranje rublja', price: 10 },
  { id: 2, name: 'Sušenje', description: 'Sušenje rublja', price: 8 },
  { id: 3, name: 'Peglanje', description: 'Peglanje odjeće', price: 12 },
  { id: 4, name: 'Dostava', description: 'Dostava opranog rublja', price: 5 }
];

const validUsername = 'testUser'; // Zamijenite s stvarnim korisničkim imenom
const validPassword = 'testPass'; // Zamijenite s stvarnom lozinkom

const Shop: React.FC<ShopProps> = ({ onCartUpdate }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // State za lozinku
  const [error, setError] = useState<string>(''); // State za poruku o pogrešci

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    onCartUpdate(cart.reduce((count, item) => count + item.quantity, 0));
  }, [cart, onCartUpdate]);

  const addToCart = (service: Service) => {
    const existingItem = cart.find(item => item.id === service.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const removeFromCart = (serviceId: number) => {
    setCart(cart.filter(item => item.id !== serviceId));
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    setCart(cart.map(item =>
      item.id === serviceId ? { ...item, quantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (username === '' || password === '') {
      setError('Molimo unesite korisničko ime i lozinku.');
      return;
    }
    if (username === validUsername && password === validPassword) {
      setCart([]);
      localStorage.removeItem('cart');
      onCartUpdate(0);
      setError(''); // Prazni poruku o pogrešci ako su podaci ispravni
    } else {
      setError('Pogrešno korisničko ime ili lozinka.');
    }
  };

  return (
    <div className="shop-container">
      <h1>Naše usluge</h1>
      <div className="service-list">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Cijena: {service.price} €</p>
            <button onClick={() => addToCart(service)}>Dodaj u košaricu</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Košarica</h2>
        {cart.length === 0 ? (
          <p>Košarica je prazna.</p>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Količina: 
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                    min="1"
                  />
                </p>
                <p>Cijena: {item.price} €</p>
                <button onClick={() => removeFromCart(item.id)}>Ukloni</button>
              </div>
            ))}
            <h3>Ukupno: {calculateTotal()} €</h3>
            
            {/* Dodajte inpute za korisničko ime i lozinku */}
            <div className="login-fields">
              <label>
                Korisničko ime:
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </label>
              <label>
                Lozinka:
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </label>
            </div>

            {error && <p className="error-message">{error}</p>} {/* Prikaz poruke o pogrešci */}

            <button className="checkout-btn" onClick={handleCheckout}>Naruči</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
