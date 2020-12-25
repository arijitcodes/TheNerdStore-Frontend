import React, { useEffect, useState } from "react";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  // Pre-load All Orders in Orders State
  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const statusButton = (status) => {
    switch (status.toLowerCase()) {
      case "recieved":
        return "warning";
        break;

      case "processing":
      case "shipped":
        return "info";
        break;

      case "delivered":
        return "success";
        break;

      case "cancelled":
        return "danger";
        break;

      default:
        return "info";
        break;
    }
  };

  // Orders Display Table
  const ordersTable = () => (
    <div className="row justify-content-center">
      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <table className="table table-responsive-sm table-sm table-hover table-dark table-striped">
          <caption>List of All Orders</caption>{" "}
          <thead>
            <tr className="text-center">
              <th scope="col" className="border border-info h4">
                Orders
              </th>
              <th scope="col" className="border border-info h4">
                User
              </th>
              <th scope="col" className="border border-info h4">
                Date
              </th>
              <th scope="col" className="border border-info h4">
                Status
              </th>
              <th scope="col" className="border border-info h4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-info align-middle">
                    {order._id}
                  </td>
                  <td className="border border-info align-middle">
                    {order.user.name + " " + order.user.lastName}
                  </td>
                  <td className="border border-info align-middle">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-info align-middle">
                    <span
                      className={`btn btn-sm rounded btn-outline-${statusButton(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-info align-middle">
                    <Link
                      className="btn btn-success btn-sm m-1"
                      to={`/admin/order/update/${order._id}`}
                    >
                      Update
                    </Link>
                    {/* <Link
                      onClick={() => {
                        //deleteThisProduct(product._id);
                      }}
                      className="btn btn-danger btn-sm m-1"
                      to="#!"
                    >
                      Delete
                    </Link> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
    </div>
  );

  return (
    <Base title="Manage Orders" description="Manage all of your Orders here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mt-2 mb-4">All Orders ({orders.length}) :</h2>
      <div className="row">
        <div className="col-12">{ordersTable()}</div>
      </div>
    </Base>
  );
};

export default ManageOrders;
