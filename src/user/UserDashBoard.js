import React from "react";

// Components
import Base from "../core/Base";
import DashboardItems from "./DashboardItems";

const UserDashBoard = () => {
  return (
    <Base title="User Dashboard" description="Dashboard">
      <div className="row">
        <div className="col container">
          <DashboardItems />
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
