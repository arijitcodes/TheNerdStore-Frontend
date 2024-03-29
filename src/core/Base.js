import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "Title",
  description = "Description",
  className = "bg-dark text-white p-2",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center m-0 py-4">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <hr className="border border-light" />
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-custom text-white text-center py-2">
          If you got any questions, feel free to reach out.
          <button className="btn btn-sm btn-dark ml-3">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">A BootCamp E-Commerce Project</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
