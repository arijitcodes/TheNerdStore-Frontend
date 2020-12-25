import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import {
  getAllStatusOptions,
  getOrder,
  updateOrderStatus,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { statusButton } from "./helper/orderHelper";

const UpdateOrder = ({ match }) => {
  const [order, setOrder] = useState({});
  const [statusOptions, setStatusOptions] = useState([]);
  const [changedStatus, setChangedStatus] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    preload();
  }, []);

  const { user, token } = isAuthenticated();

  // Pre-loads Order Data
  const preload = () => {
    // Getting Order Data
    getOrder(match.params.orderId, user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        setOrder(data);
        // console.log(data);
      }
    });

    // Getting Available Status Options
    getAllStatusOptions(user._id, token).then((data) => {
      //   console.log(data);
      setStatusOptions(data);
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

  // Order Status
  const orderStatus = () => (
    <ul className="list-group custom-transparent-list-info">
      <li className="list-group-item text-light h4">
        <div className="row">
          <div className="col align-middle">
            Order Status: {statusButton(order.status)}
          </div>
          <div className="col">
            {/* {statusOptions &&
            statusOptions.map((status) => status + " ")} */}
            <div className="row">
              {/* <div className="col">Change Status: </div> */}
              <div className="col">
                <form>
                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-0 pb-0">
                      <select
                        className="form-control"
                        value={changedStatus}
                        onChange={(e) => {
                          setChangedStatus(e.target.value);
                        }}
                        required
                      >
                        <option>Select Status</option>
                        {statusOptions &&
                          statusOptions.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-0 pb-0 ">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-sm btn-outline-success mt-2 mt-md-0"
                      >
                        Change Order Status
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );

  // On Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrderStatus(order._id, user._id, token, changedStatus).then(
      (data) => {
        if (data.err || data.error) {
          console.log(data.err ? data.err : data.error);
        } else {
          setChangedStatus("");
          preload();
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }
      }
    );
  };

  // Success Message
  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-success">
          Order Status Updated Successfully!
        </div>
      );
    }
  };

  return (
    <Base title="Update Order" description="Update an Order">
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
          <Link className="btn btn-info ml-3" to={`/admin/orders`}>
            <span className="">Manage Orders</span>
          </Link>
        </div>
      </div>
      {order.user ? (
        <>
          <h4>
            Update Order #
            <span className="text-info">{order && order._id}</span>
          </h4>
          {successMessage()}
          <div className="row justify-content-center my-4">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col" align="center">
                  {orderStatus()}
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
