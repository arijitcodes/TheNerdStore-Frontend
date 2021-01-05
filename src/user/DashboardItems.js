import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";

// Components
import DashboardItem from "./DashboardItem";

const DashboardItems = () => {
  const [isAdmin, setIsAdmin] = useState(
    isAuthenticated().user.role === 1 ? true : false
  );

  return (
    <div className="row">
      <div className="col-12 h-100">
        <div className="row">
          <DashboardItem
            title="Profile"
            body="Profile"
            icon="far fa-user"
            link="/profile"
          />

          {!isAdmin && (
            <DashboardItem
              title="Cart"
              body="Check your Cart"
              icon="fas fa-shopping-cart"
              link="/cart"
            />
          )}

          <DashboardItem
            title="Orders"
            body="Check your Orders"
            icon="fas fa-boxes"
            link="/orders"
          />

          <DashboardItem
            title="Addresses"
            body="Check your Addresses"
            icon="far fa-address-book"
            link="/addresses"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardItems;
