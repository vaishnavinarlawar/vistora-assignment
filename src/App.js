import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <ProductList />
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
