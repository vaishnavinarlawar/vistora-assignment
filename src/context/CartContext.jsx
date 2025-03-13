import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Initial state for the cart
const initialState = {
    cartItems: [],  // Array to store items in the cart
    totalItems: 0,  // Total number of items in the cart
    totalPrice: 0,  // Total price of all items in the cart
};

// Load cart from localStorage if available
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');  // Retrieve cart from localStorage
        return savedCart ? JSON.parse(savedCart) : initialState;  // Parse saved cart or return initial state
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return initialState;
    }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));  // Save cart as JSON string
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
};

// Calculate total items and price in the cart
const calculateCartTotals = (cartItems) => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);  // Sum of all item quantities
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);  // Sum of all item prices

    return { totalItems, totalPrice };
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product } = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.id === product.id);

            let updatedCartItems;

            if (existingItemIndex >= 0) {
                // Item already exists in cart, update quantity
                updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity: updatedCartItems[existingItemIndex].quantity + 1
                };
            } else {
                // Item doesn't exist in cart, add it
                updatedCartItems = [...state.cartItems, { ...product, quantity: 1 }];
            }

            const { totalItems, totalPrice } = calculateCartTotals(updatedCartItems);

            const newState = {
                ...state,
                cartItems: updatedCartItems,
                totalItems,
                totalPrice
            };

            saveCartToStorage(newState);  // Save updated cart to localStorage
            return newState;
        }

        case 'REMOVE_FROM_CART': {
            const { productId } = action.payload;
            const updatedCartItems = state.cartItems.filter(item => item.id !== productId);  // Remove item by ID

            const { totalItems, totalPrice } = calculateCartTotals(updatedCartItems);

            const newState = {
                ...state,
                cartItems: updatedCartItems,
                totalItems,
                totalPrice
            };

            saveCartToStorage(newState);  // Save updated cart to localStorage
            return newState;
        }

        case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                // If quantity is zero or less, remove the item from cart
                return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { productId } });
            }

            const updatedCartItems = state.cartItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );

            const { totalItems, totalPrice } = calculateCartTotals(updatedCartItems);

            const newState = {
                ...state,
                cartItems: updatedCartItems,
                totalItems,
                totalPrice
            };

            saveCartToStorage(newState);  // Save updated cart to localStorage
            return newState;
        }

        case 'CLEAR_CART': {
            saveCartToStorage(initialState);  // Reset cart to initial state
            return initialState;
        }

        default:
            return state;
    }
};

// CartProvider component to provide cart state to children
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

    useEffect(() => {
        saveCartToStorage(state);  // Persist cart state whenever it changes
    }, [state]);

    // Action functions to interact with the cart
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product } });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
