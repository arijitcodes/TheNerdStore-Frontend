import React from "react";

// Components
import Base from "../core/Base";
import DashboardItem from "./DashboardItem";

const UserDashBoard = () => {
  return (
    <Base title="User Dashboard" description="Dashboard">
      <div className="row">
        <div className="col container">
          <div className="row">
            <DashboardItem
              title="Profile"
              body="Your Profile"
              icon="fas fa-user"
              link="/profile"
            />

            <DashboardItem
              title="Cart"
              body="Check your Cart"
              icon="fas fa-shopping-cart"
              link="/cart"
            />

            <DashboardItem
              title="Orders"
              body="Check your Orders"
              icon="fas fa-boxes"
              link="/orders"
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
