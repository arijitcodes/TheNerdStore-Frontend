import React, { useState, useEffect } from "react";
import "../styles.css";

// Components and Methods
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  // Load All Products from CART
  const loadAllProducts = () => {
    return (
      <div>
        <h2>For Load All Products</h2>
        <div className="row text-center">
          {products &&
            products.map((product, index) => (
              <div className="col-md-6 col-sm-12">
                <Card
                  key={index}
                  product={product}
                  addToCart={false}
                  removeFromCart={true}
                />
              </div>
            ))}
        </div>
      </div>
    );
  };

  // Load Checkout
  const loadCheckout = () => {
    return (
      <div>
        <h2>For Checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Check you Shopping Cart">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
