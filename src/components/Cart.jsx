import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';

const Cart = () => {
    // Accessing cart state and actions from the context
    const { cartItems, totalItems, totalPrice, clearCart } = useCart();
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    // Function to handle the checkout process
    const handleCheckout = () => {
        setCheckoutComplete(true);
        setTimeout(() => {
            clearCart(); // Clear the cart after successful checkout
            setCheckoutComplete(false); // Reset the checkout state
        }, 3000);
    };

    // Clear cart items when the component mounts
    useEffect(() => {
        clearCart();
    }, [])

    // Render checkout success message
    if (checkoutComplete) {
        return (
            <div className="cart">
                <div className="checkout-success">
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase.</p>
                </div>
            </div>
        );
    }

    // Render empty cart message if no items are present
    if (cartItems.length === 0) {
        return (
            <div className="cart empty-cart">
                <h2>Your Cart</h2>
                <p>Your cart is empty. Add some products to get started!</p>
            </div>
        );
    }

    // Render cart with items
    return (
        <div className="cart">
            <div className="cart-header">
                <h2>Your Cart ({totalItems} items)</h2>
                <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                </button>
            </div>

            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <div className="cart-footer">
                <div className="cart-total">
                    <span>Item:</span>
                    <span className="total-price">{totalItems} items</span>
                </div>
                <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-price">₹{totalPrice.toFixed(2)}</span>
                </div>

                <button
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
