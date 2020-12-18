import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Base from "../core/Base";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  // Handle form fields value change
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // On Form Submit
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.err || data.error) {
          setValues({
            ...values,
            error: data.err ? data.err : data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // Success Message
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully! Please{" "}
            <Link to="/signin">Log In Here</Link>
          </div>
        </div>
      </div>
    );
  };

  // Error Message
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  // Signup Form
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
                required
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for Sign Up">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
