import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

// Components & Methods
import { emptyCart, loadCart } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
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

  // Show BrainTree Drop In UI
  const showBTDropIn = () => {
    return (
      <div>
        {products && products.length > 0 ? (
          info.clientToken !== null && token !== false ? (
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
          ) : (
            <h3>Please Log In to Complete Payment!</h3>
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

          // TODO: Empty Card
          // Force Reload
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
        amount = amount + product.price;
      });

    return amount;
  };

  return (
    <div>
      <h3>You bill is: {getAmount()} $</h3>
      {showBTDropIn()}
    </div>
  );
};

export default Payment;
