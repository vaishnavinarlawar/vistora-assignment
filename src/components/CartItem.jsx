import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    // Accessing functions to update quantity and remove items from the cart
    const { updateQuantity, removeFromCart } = useCart();

    // Handle quantity change via input field
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        updateQuantity(item.id, newQuantity);
    };

    return (
        <div className="cart-item">
            {/* Display item image */}
            <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
            </div>

            {/* Display item details */}
            <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
            </div>

            {/* Quantity controls and item removal */}
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

                {/* Display item subtotal */}
                <div className="cart-item-subtotal">
                    ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Button to remove item from cart */}
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
