import React from "react";

// Components
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import DashboardItems from "./DashboardItems";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  // Left Side Menu of Admin Dashboard
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              <i className="far fa-plus-square pr-2"></i> Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              <i className="fas fa-tasks pr-2"></i> Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              <i className="fas fa-box pr-2"></i> Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              <i className="fas fa-boxes pr-2"></i> Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              <i className="fa fa-clipboard pr-2"></i> Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  // Right Side Display Box of Admin Dashboard
  const adminRightSide = () => {
    return (
      <>
        <div className="row">
          <div className="col">
            <DashboardItems admin={true} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card mb-4">
              <h4 className="card-header">Admin Information</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="badge badge-success mr-2">Name:</span> {name}
                </li>
                <li className="list-group-item">
                  <span className="badge badge-success mr-2">Email:</span>{" "}
                  {email}
                </li>

                <li className="list-group-item">
                  <span className="badge badge-danger mr-2">Admin Area</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Base
      title="Admin Dashboard"
      description="Welcome to the Admin Area"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 my-1">
          {adminLeftSide()}
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12 my-1 mt-4 mt-md-1">
          {adminRightSide()}
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
