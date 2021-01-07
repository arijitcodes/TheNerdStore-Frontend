import React, { useEffect, useState } from "react";

// Components and Methods
import Base from "./Base";
import { isAuthenticated } from "../auth/helper";
import { getOrders } from "./helper/coreapicalls";
import { statusButton } from "../admin/helper/orderHelper";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  // Preload all Orders Data of User in the Orders State
  const preload = () => {
    getOrders(user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
        setLoading(false);
      } else {
        setOrders(data);
        // console.log(data);
        setLoading(false);
      }
    });
  };

  // Loading Message
  const loadingMessage = () => (
    <div className="alert alert-info" align="center">
      <h3>Loading...</h3>
    </div>
  );

  // Orders
  const displayOrders = () => (
    <>
      <div className="row">
        <div className="col-12">
          {orders.map((order, index) => (
            <div className="row" key={index}>
              <div className="col-sm-10 offset-sm-1">
                <div
                  class="card border-info my-3"
                  style={{ background: "rgb(0,0,0,0)" }}
                >
                  <div class="card-header">
                    Order <span className="text-info">#{order._id}</span>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="col">
                          <h5 class="card-title">
                            Order Status: {statusButton(order.status)}
                          </h5>
                          <p class="card-text">
                            <span className="text-muted">Order Date:</span>{" "}
                            {new Date(order.createdAt).toLocaleString()} <br />
                            <span className="text-muted">Total: $</span>{" "}
                            {order.amount}
                            <br />
                            <span className="text-muted">
                              Transaction ID:
                            </span>{" "}
                            {order.transaction_id}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12 mt-4 mt-md-0">
                        <div className="row">
                          <div className="col">
                            <h5 class="card-title">
                              Item(s) Ordered: {order.products.length}
                            </h5>
                          </div>
                        </div>
                        <div className="row">
                          {order.products.map((product, index) => (
                            <div className="col-lg-6 col-md-12" key={index}>
                              <div
                                className="card border-light my-2 mx-1"
                                style={{ background: "rgb(0,0,0,0)" }}
                              >
                                {/* <div class="card-header"></div> */}
                                <div class="card-body">
                                  <h5 class="card-title">{product.name}</h5>
                                  <p class="card-text">
                                    <span className="text-muted">Price:</span>{" "}
                                    {product.price}
                                    <br />
                                    <span className="text-muted">
                                      Items Bought:
                                    </span>{" "}
                                    {product.count}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <Base title="Orders" description="Check all of your orders">
      <h3>Your Orders ({orders && orders.length}):</h3>
      {loading === true ? (
        loadingMessage()
      ) : orders.length > 0 ? (
        displayOrders()
      ) : (
        <div className="alert alert-warning" align="center">
          <h4>No Orders Found!</h4>
        </div>
      )}
    </Base>
  );
};

export default Orders;
