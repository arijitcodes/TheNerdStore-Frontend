import React, { useEffect, useRef, useState } from "react";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { statusButton } from "./helper/orderHelper";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [items, setItems] = useState([]);

  const { user, token } = isAuthenticated();

  const searchText = useRef("");

  useEffect(() => {
    preload();
    /* console.log("Reloaded");
    console.log("Filter after Realod: ", filtered);
    if (filtered.length > 0) {
      setItems(filtered);
    } else {
      preload();
      setItems(orders);
    } */
  }, []);

  // Pre-load All Orders in Orders State
  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        setOrders(data);
        setItems(data);
      }
    });
  };

  // Set Status Display Button's Outline Color Property based on Status Value
  /* const statusButton = (status) => {
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
  }; */

  // Orders Display Table
  const ordersTable = () => (
    <div className="row justify-content-center">
      <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
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
            {items &&
              items.map((order, index) => (
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
                    {/* <span
                      className={`btn btn-sm rounded btn-outline-${statusButton(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span> */}
                    {statusButton(order.status)}
                  </td>
                  <td className="border border-info align-middle">
                    {/* <Link
                      className="btn btn-success btn-sm m-1"
                      to={`/admin/order/update/${order._id}`}
                    >
                      Update
                    </Link> */}
                    <Link
                      className="btn btn-success rounded m-1"
                      to={`/admin/order/update/${order._id}`}
                    >
                      <span>
                        Update <i className="far fa-edit d-none d-md-inline" />
                      </span>
                    </Link>
                    {/* <Link
                      onClick={() => {
                        //deleteThisProduct(product._id);
                      }}
                      className="btn btn-danger btn-sm m-1"
                      to="#!"
                    >
                      Delete <i className="far fa-trash-alt d-none d-sm-inline" />
                    </Link> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
    </div>
  );

  // Handle Search Field Input Change
  const handleSearchChange = (e) => {
    // console.log("Text: ", e.target.value);
    let tempFiltered = [];
    if (e.target.value !== "") {
      // Filter Orders

      // console.log(orders);
      tempFiltered = orders.filter((order) => {
        const regexp = new RegExp(`${e.target.value}`, "gi");
        return (
          // order._id.match(regexp) ||
          order.user.name.match(regexp) ||
          order.user.lastName.match(regexp) ||
          order._id.match(regexp) ||
          order.createdAt.match(regexp)
        );
      });

      setFiltered(tempFiltered);
      setItems(tempFiltered);
      console.log("Filtered: ", filtered);
    } else {
      // Clear Filter
      setFiltered(tempFiltered);
      setItems(orders);
      // console.log("Filtered Cleared: ", filtered);
    }
  };

  return (
    <Base title="Manage Orders" description="Manage all of your Orders here">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
        </div>
        <div className="col-md-6 col-sm-12 mt-2 mt-md-0" align="right">
          <div className="col-md-8 col-sm-12">
            <input
              type="text"
              placeholder="Search by Order ID/User/Date(YYYY-MM-DD)..."
              className="form-control transparent text-light"
              style={{ background: "rgb(0,0,0,0)" }}
              ref={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <h2 className="mt-2 mb-4">Manage all Orders ({orders.length}) :</h2>
      <div className="row">
        <div className="col-12">{ordersTable()}</div>
      </div>
    </Base>
  );
};

export default ManageOrders;
