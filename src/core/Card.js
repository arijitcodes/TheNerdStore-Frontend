import React from "react";

// Components
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "Default";

  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {}}
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
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart()}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
