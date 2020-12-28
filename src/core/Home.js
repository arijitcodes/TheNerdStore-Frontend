import React, { useState, useEffect } from "react";
import "../styles.css";

// Components and Methods
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  // Load All Products Method - to laod all products into Products State
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.err || data.error) {
        setError(data.err ? data.err : data.error);
      } else {
        setProducts(data);
      }
    });
  };

  return (
    <Base title="Home" description="Welcome to The NerdStore">
      <div className="row text-center">
        <h1 className="text-white">All of Products</h1>
        <div className="col-12">
          <div className="row">
            {products.map((product, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
