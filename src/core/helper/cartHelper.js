// Add Products in Cart
export const addItemToCart = (item, next) => {
  let cart = [];
  let productExistsInCart = false;

  if (typeof window !== undefined) {
    // Setting count = 1 for any item to add
    if (!item.count) {
      item.count = 1;
    }

    // Checking if cart already exists in LocalStorage
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      // Trying to find if item is already there
      // If found, incrementing count
      cart.map((product, index) => {
        if (product._id === item._id) {
          if (item.stock <= product.count) {
            alert("Can't add More.");
          } else {
            cart[index].count++;
          }
          productExistsInCart = true;
        }
      });
    }

    // If product Does NOT exists in the cart already, push it in cart
    if (!productExistsInCart) {
      cart.push({
        ...item,
      });
    }

    // Set cart in Local Storage
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
    }
  }
  next();
};

// Check Cart
export const checkCart = () => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      return cart.length;
    } else {
      return null;
    }
  }
};
