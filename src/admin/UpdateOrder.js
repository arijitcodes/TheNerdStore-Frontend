import React, { useEffect, useState } from "react";

// Components and Methods
import Base from "../core/Base";
import { getOrder } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { statusButton } from "./helper/orderHelper";

const UpdateOrder = ({ match }) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    preload();
  }, []);

  const { user, token } = isAuthenticated();

  // Pre-loads Order Data
  const preload = () => {
    getOrder(match.params.orderId, user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        setOrder(data);
        console.log(data);
      }
    });
  };

  // Order Details
  const orderDetails = () => (
    <>
      <div className="row">
        <div className="col">
          <ul className="list-group custom-transparent-list-info">
            <li className="list-group-item text-light h4">Order Details</li>
          </ul>
        </div>
      </div>
      <ul className="list-group custom-transparent-list-info">
        <li className="list-group-item text-light">
          <span className="text-muted mr-2">Order ID:</span> {order._id}
        </li>
        <li className="list-group-item text-light">
          <span className="text-muted mr-2">Amount: </span>$ {order.amount}
        </li>
        <li className="list-group-item text-light">
          <span className="text-muted mr-2">Transaction ID:</span>{" "}
          {order.transaction_id}
        </li>
        <li className="list-group-item text-light">
          <span className="text-muted mr-2">Order Date:</span>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </li>
      </ul>
    </>
  );

  //User Details
  const userDetails = () => (
    <>
      <div className="row">
        <div className="col">
          <ul className="list-group custom-transparent-list-info">
            <li className="list-group-item text-light h4 ">User Details</li>
          </ul>
        </div>
      </div>
      <ul className="list-group custom-transparent-list-info">
        <li className="list-group-item">
          <span className="text-muted mr-2">User ID:</span> {order.user._id}
        </li>
        <li className="list-group-item">
          <span className="text-muted mr-2">First Name:</span> {order.user.name}
        </li>
        <li className="list-group-item">
          <span className="text-muted mr-2">Last Name:</span>{" "}
          {order.user.lastName}
        </li>
      </ul>
    </>
  );

  // Products Ordered
  const productsOrdered = () => (
    <div className="row">
      <div className="col-12">
        <ul className="list-group custom-transparent-list-info">
          <li className="list-group-item text-light h4">
            Products Ordered ({order.products.length}):
          </li>
        </ul>
      </div>
      {order.products.map((product, index) => (
        <div className="col-md-6 col-sm-12 mt-2 mt-sm-0" key={index}>
          <ul className="list-group custom-transparent-list-info">
            <li className="list-group-item">
              <span className="text-muted mr-2">Product Name:</span>
              {product.name}
            </li>
            <li className="list-group-item">
              <span className="text-muted mr-2">Price:</span>$ {product.price}{" "}
              <span className="text-muted ml-1">/ Product</span>
            </li>
            <li className="list-group-item">
              <span className="text-muted mr-2">Items Bought:</span>
              {product.count}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <Base title="Update Order" description="Update an Order">
      {order.user ? (
        <>
          <h4>
            Update Order #
            <span className="text-info">{order && order._id}</span>
          </h4>

          <div className="row justify-content-center my-4">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col" align="center">
                  <ul className="list-group custom-transparent-list-info">
                    <li className="list-group-item text-light h4">
                      <div className="row">
                        <div className="col">
                          Order Status: {statusButton(order.status)}
                        </div>
                        <div className="col"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="row justify-content-center my-4">
                <div className="col">Order Status:</div>
                <div className="col">Action:</div>
              </div> */}
              <div className="row justify-content-center my-4">
                <div className="col">{orderDetails()}</div>
                <div className="col mt-4 mt-sm-0">{userDetails()}</div>
              </div>
              <div className="row justify-content-center my-4">
                <div className="col">{productsOrdered()}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-info">Loading...</div>
      )}
    </Base>
  );
};

export default UpdateOrder;
