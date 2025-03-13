import React from 'react';
import { useCart } from '../context/CartContext';

const ProductItem = ({ product }) => {
    // Access the function to add items to the cart
    const { addToCart } = useCart();

    return (
        <div className="product-item">
            {/* Display product image */}
            <img src={product.image} alt={product.name} className="product-image" />

            {/* Display product details */}
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price.toFixed(2)}</p>
                <p className="product-quantity">Available: {product.quantity}</p>

                {/* Button to add product to cart */}
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
