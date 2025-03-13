
import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { products } from '../data/products';

const ProductList = () => {
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState('All');

    const categories = ['All', ...new Set(products.map(product => product.category))];

    const priceRanges = {
        'All': [0, Infinity],
        'Under ₹5000': [0, 5000],
        '₹5001-₹10000': [5001, 10000],
        '₹10001-₹50000': [10001, 50000],
        '₹50001': [50001, Infinity]
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = category === 'All' || product.category === category;
        const [min, max] = priceRanges[priceRange];
        const priceMatch = product.price >= min && product.price <= max;

        return categoryMatch && priceMatch;
    });

    return (
        <div className="product-list-container">
            <div className="filters">
                <div className="filter-group">
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Price Range:</label>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        {Object.keys(priceRanges).map(range => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="product-list">
                {filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
