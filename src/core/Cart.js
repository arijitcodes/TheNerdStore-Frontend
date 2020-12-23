import React, { useState, useEffect } from "react";
import "../styles.css";

// Components and Methods
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  // Load All Products from CART
  const loadAllProducts = () => {
    return (
      <div>
        <h2>For Load All Products</h2>
        <div className="row text-center">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <div className="col-md-6 col-sm-12" key={index}>
                <Card
                  product={product}
                  addToCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                  showCount={true}
                />
              </div>
            ))
          ) : (
            <div className="col text-warning h3">Cart is Empty!</div>
          )}
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
    <Base title="Cart" description="Check you Shopping Cart">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          {/* {loadCheckout()} */}
          <Payment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
