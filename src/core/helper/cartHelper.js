// Add Products in Cart
export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...item,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

// Load Cart Elements
export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

// Remove Item from Cart
export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // Removing Item from Cart
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });

    // Updating into LocalStorage Cart
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

// Empty Out Cart - to be used after Order Successfull
export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      next();
    }
  }
};
