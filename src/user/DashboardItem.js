import React from "react";
import { useHistory } from "react-router-dom";

// Components and Methods
import { isAuthenticated } from "../auth/helper";

const DashboardItem = ({ title, body, icon, link = "#" }) => {
  // icon = icon + " align-middle";
  const history = useHistory();
  const admin = isAuthenticated().user.role === 1 ? true : false;

  return (
    <div
      className="col-lg-4 col-md-6 col-sm-6"
      onClick={() => {
        history.push(link);
      }}
    >
      <div
        className={
          admin === true ? "card border-white mb-3" : "card border-info mb-3"
        }
        style={{ background: "rgb(0,0,0,0)", cursor: "pointer" }}
      >
        {/* <div className="card-header">Header</div> */}
        <div
          className={
            admin === true ? "card-body text-white" : "card-body text-info"
          }
        >
          <div className="row align-items-center">
            <div className="col text-center h1">
              <i className={icon}></i>
            </div>
            <div className="col">
              <h5 className="card-title">{title}</h5>
              <p className={admin === true ? "d-none" : "card-text"}>{body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
