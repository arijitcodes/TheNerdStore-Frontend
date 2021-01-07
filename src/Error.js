import React from "react";
import Base from "./core/Base";

const Error = () => {
  return (
    <Base title="Error 404" description="Error 404 - Not Found!">
      <div className="row">
        <div className="col">
          <div className="alert alert-danger" align="center">
            <h3>The page you are looking for, does not exist!</h3>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Error;
