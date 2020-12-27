import React from "react";

// Components
import DashboardItem from "./DashboardItem";

const DashboardItems = ({ admin }) => {
  return (
    <div className="row">
      <DashboardItem
        title="Profile"
        body="Your Profile"
        icon="fas fa-user"
        link="/profile"
        admin={admin}
      />

      <DashboardItem
        title="Cart"
        body="Check your Cart"
        icon="fas fa-shopping-cart"
        link="/cart"
        admin={admin}
      />

      <DashboardItem
        title="Orders"
        body="Check your Orders"
        icon="fas fa-boxes"
        link="/orders"
        admin={admin}
      />
    </div>
  );
};

export default DashboardItems;
