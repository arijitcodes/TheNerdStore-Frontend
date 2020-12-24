import React, { useReducer } from "react";

// Context
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";

import { SET_PRODUCTS_IN_CART } from "./types";

const CartState = (props) => {
  const initialState = 0;

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Set productsInCart
  const setProductsInCart = (noOfProducts) => {
    dispatch({
      type: SET_PRODUCTS_IN_CART,
      payload: noOfProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart: state,
        setProductsInCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
