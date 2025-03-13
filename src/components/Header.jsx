import React, { useState } from 'react';

const Header = () => {

    // const [cartOpen, setCartOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo">
                <h1>ShopMart</h1>
            </div>
            {/* <div className="cart-summary" onClick={() => setCartOpen(!cartOpen)}>
                <div className="cart-icon">
                    🛒
                </div>
            </div> */}
        </header>
    );
};

export default Header;
