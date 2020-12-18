import React from "react";
import "../styles.css";

// Components
import Base from "./Base";

const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to My Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
