import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

// Context
import CartContext from "./context/cartNotification/cartContext";

// Components & Methods
import { emptyCart, loadCart, checkCart } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import { getUsersPrimaryAddress } from "../user/helper/userapicalls";
import Address from "../user/Address";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const [address, setAddress] = useState(null);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const cartContext = useContext(CartContext);

  const { setProductsInCart } = cartContext;

  useEffect(() => {
    getToken(userId, token);
    preload();
  }, []);

  // Getting Token Method
  const getToken = (userId, token) => {
    // Calling getMeToken from Payment Helper to Generate ClientToken from Braintree
    getMeToken(userId, token).then((info) => {
      // console.log("Information: ", info);
      if (info.err || info.error) {
        setInfo({
          ...info,
          error: info.err ? info.err : info.error,
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  // Preload User's Primary Address
  const preload = () => {
    if (token) {
      getUsersPrimaryAddress(userId, token).then((data) => {
        if (data.err || data.error) {
          if (data.err) {
            setAddress(false);
          }
          // setError(data.err ? data.err : data.error);
          console.log(data.err ? data.err : data.error);
        } else {
          setAddress(data);
        }
      });
    }
  };

  // Show BrainTree Drop In UI
  const showBTDropIn = () => {
    return (
      <div>
        {products && products.length > 0 ? (
          info.clientToken !== null && token !== false ? (
            address === null || address === false ? (
              <>
                <div className="alert alert-danger">
                  You don't have any Addresses / Primary Address Saved! Please
                  add an Address first to complete payment!
                </div>
                <Link
                  to="/addresses/new"
                  className="btn btn-block btn-outline-info"
                >
                  Add a New Address
                </Link>
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col">
                    Test with these Cards:
                    <br />
                    American Express Card: 371449635398431
                    <br />
                    Master Card: 2223000048400011
                    <br />
                    Visa Card: 4009348888881881
                    <br />
                    Expiry Date: 12/21
                  </div>
                </div>
                <div>
                  <DropIn
                    options={{ authorization: info.clientToken }}
                    onInstance={(instance) => (info.instance = instance)}
                  />
                  <button
                    className="btn btn-success btn-block"
                    onClick={onPurchase}
                  >
                    Buy
                  </button>
                </div>
                <div className="row">
                  <div className="col" align="center">
                    <Address />
                  </div>
                </div>
              </>
            )
          ) : (
            // <h3 className="text-danger">Please Log In to Complete Payment!</h3>
            <div className="alert alert-danger">
              Please Log In to Complete Payment!
            </div>
          )
        ) : (
          <h3></h3>
        )}
      </div>
    );
  };

  // On Purchase, calculate bill and process to complete payment
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: true, loading: false });
          alert("Payment Success!");
          //   console.log(response);

          // Create Order
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            deliveryAddress: address._id,
          };

          createOrder(userId, token, orderData);

          // Empty Cart after Payment Success
          emptyCart(() => {
            // console.log("System Crashed while Cleaning up the Cart!");
          });

          // Update Global Cart Values
          setProductsInCart(checkCart());

          // Force Reload Cart Component after the Cart is Empty
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          alert("Payment Failed!");
        });
    });
  };

  // Returns total Amount
  const getAmount = () => {
    let amount = 0;
    products &&
      products.map((product) => {
        amount = amount + product.price * product.count;
      });

    return amount;
  };

  return (
    <div className="mt-4 mt-sm-0">
      <h3>You bill is: {getAmount()} $</h3>
      {showBTDropIn()}
    </div>
  );
};

export default Payment;
