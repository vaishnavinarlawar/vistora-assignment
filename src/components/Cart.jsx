import React, { useState,useEffect } from 'react';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';


const Cart = () => {
    const { cartItems, totalItems, totalPrice, clearCart } = useCart();
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    const handleCheckout = () => {
        setCheckoutComplete(true);
        setTimeout(() => {
            clearCart();
            setCheckoutComplete(false);
        }, 3000);
    };

    useEffect(()=>{
        clearCart();
    },[])

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

    if (cartItems.length === 0) {
        return (
            <div className="cart empty-cart">
                <h2>Your Cart</h2>
                <p>Your cart is empty. Add some products to get started!</p>
            </div>
        );
    }

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