import React, { useContext, useEffect, useState } from "react";

// Components and Methods
import ImageHelper from "./helper/ImageHelper";
import {
  addItemToCart,
  checkCart,
  removeItemFromCart,
} from "./helper/cartHelper";

// Context
import CartContext from "./context/cartNotification/cartContext";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => {
    return f;
  },
  reload = undefined,
  showCount = false,
}) => {
  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "Default";

  const cartContext = useContext(CartContext);
  const { setProductsInCart } = cartContext;

  // Adds the Product, that this Card is holding, into Cart Localstorage
  const addProductToCart = async () => {
    addItemToCart(product, () => {
      alert("Product Added to cart. To checkout, visit Cart Page.");
    });

    // Setting NumberOfProductsInCart value in Global Cart Notification State
    setProductsInCart(checkCart());
  };

  // Show add to cart button
  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={addProductToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  // Show Remove from Cart Button
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setProductsInCart(checkCart());
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info h-100">
      {/* <div className="card-header lead">{cardTitle}</div> */}
      <div className="row">
        <div className="card-body">
          <h5 className="card-title lead">{cardTitle}</h5>
          <div className="container my-2">
            <ImageHelper product={product} />
          </div>
          <p className="card-text font-weight-light text-wrap">
            {cardDescription}
          </p>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <span className="badge badge-success p-2">$ {cardPrice}</span>
            {showCount && (
              <span className="badge badge-info ml-2">x{product.count}</span>
            )}
            {!showCount &&
              (product.stock > 0 ? (
                <span
                  className={
                    product.stock > 5
                      ? "badge badge-success p-2 ml-4"
                      : "badge badge-warning p-2 ml-4"
                  }
                >
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="badge badge-danger p-2 ml-4">
                  Out of Stock
                </span>
              ))}
          </div>
          {/* {!showCount &&
            (product.stock > 0 ? (
              <div className="col align-bottom">
                <p className="btn btn-success btn-sm">
                  In Stock ({product.stock} left)
                </p>
              </div>
            ) : (
              <div className="col">
                <p className="btn btn-danger btn-sm">Out of Stock</p>
              </div>
            ))} */}
        </div>
        {product.stock && product.stock > 0 ? (
          <div className="row">
            <div className="col-12">{showAddToCart()}</div>
            <div className="col-12">{showRemoveFromCart()}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
