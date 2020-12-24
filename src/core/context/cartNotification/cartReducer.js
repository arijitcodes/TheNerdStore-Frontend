import { SET_PRODUCTS_IN_CART } from "./types";

export default (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS_IN_CART:
      return action.payload;
      break;

    default:
      return state;
      break;
  }
};
