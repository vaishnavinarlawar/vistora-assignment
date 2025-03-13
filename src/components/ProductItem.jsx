import React from 'react';
import { useCart } from '../context/CartContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price.toFixed(2)}</p>
                <p className="product-quantity">Available: {product.quantity}</p>
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;