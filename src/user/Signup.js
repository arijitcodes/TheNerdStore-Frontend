import React from "react";
import { Link } from "react-router-dom";

// Components
import Base from "../core/Base";

const Signup = () => {
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input className="form-control" type="text" name="" />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" name="" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" name="" />
            </div>
            <button className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for Sign Up">
      {signUpForm()}
    </Base>
  );
};

export default Signup;
