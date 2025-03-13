import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        updateQuantity(item.id, newQuantity);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
            </div>

            <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-controls">
                <div className="quantity-control">
                    <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>

                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        className="quantity-input"
                    />

                    <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>

                <div className="cart-item-subtotal">
                    ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;