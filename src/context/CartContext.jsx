import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
};

// Load cart from localStorage if available
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : initialState;
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return initialState;
    }
};

const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
};

const calculateCartTotals = (cartItems) => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return { totalItems, totalPrice };
};

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

            saveCartToStorage(newState);
            return newState;
        }

        case 'REMOVE_FROM_CART': {
            const { productId } = action.payload;
            const updatedCartItems = state.cartItems.filter(item => item.id !== productId);

            const { totalItems, totalPrice } = calculateCartTotals(updatedCartItems);

            const newState = {
                ...state,
                cartItems: updatedCartItems,
                totalItems,
                totalPrice
            };

            saveCartToStorage(newState);
            return newState;
        }

        case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
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

            saveCartToStorage(newState);
            return newState;
        }

        case 'CLEAR_CART': {
            saveCartToStorage(initialState);
            return initialState;
        }

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

    useEffect(() => {
        saveCartToStorage(state);
    }, [state]);

    const addToCart = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { product }
        });
    };

    const removeFromCart = (productId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { productId }
        });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { productId, quantity }
        });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
