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
      <div className="card-header lead">{cardTitle}</div>
      <div className="row">
        <div className="card-body">
          <ImageHelper product={product} />
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <p className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</p>
            {showCount && (
              <span className="badge badge-info ml-2">x{product.count}</span>
            )}
          </div>
          {!showCount &&
            (product.stock > 0 ? (
              <div className="col">
                <p className="btn btn-success btn-sm">
                  In Stock ({product.stock} left)
                </p>
              </div>
            ) : (
              <div className="col">
                <p className="btn btn-danger btn-sm">Out of Stock</p>
              </div>
            ))}
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
