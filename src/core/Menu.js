import React from "react";
import { Link, withRouter } from "react-router-dom";

// Components
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <>
    {/* <div className="row">
    <div className="col-12"> */}
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <Link to="/" className="nav-link pl-0" style={currentTab(history, "/")}>
        <h4 className="my-auto text-white">
          <i className="fas fa-laptop-code rounded p-2 mr-2 bg-info"></i>
          The NerdStore
        </h4>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* <ul className="nav nav-tabs bg-dark"> */}
        <ul className="navbar-nav ml-auto my-auto">
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              <i className="fas fa-home pr-1"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              <i className="fas fa-shopping-cart pr-1"></i> Cart
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                <i className="fas fa-chalkboard pr-1"></i> Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                <i className="fas fa-chalkboard pr-1"></i> Dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  <i className="fas fa-user-plus pr-1"></i> Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  <i className="fas fa-sign-in-alt pr-1"></i> Sign In
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              {/* <Link
            style={currentTab(history, "/signout")}
            className="nav-link"
            to="/signout"
          >
            Signout
          </Link> */}
              <span
                className="nav-link text-warning"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout <i className="fas fa-sign-out-alt"></i>
              </span>
            </li>
          )}
          <li className="nav-item nav-link text-white d-none d-md-block">|</li>
          <li className="nav-item">
            <a
              href="https://github.com/ArijitCodes"
              target="_blank"
              className="nav-link text-white"
            >
              <i className="fab fa-github"></i> GitHub{" "}
              <i className="fas fa-external-link-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    {/* </div>
  </div>  */}
  </>
);

export default withRouter(Menu);
