import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Base from "../core/Base";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    error: "",
    success: false,
  });

  const { name, lastName, email, password, password2, error, success } = values;

  // Handle form fields value change
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // On Form Submit
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if (values.password !== values.password2) {
      setValues({
        ...values,
        error: "Passwords do not match! Please type the passwords carefully!",
      });
      setTimeout(() => {
        setValues({
          ...values,
          error: "",
        });
      }, 3000);
      return;
    }
    signup({ name, lastName, email, password })
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
              <div className="row">
                <div className="col">
                  <label className="text-light">First Name</label>
                  <input
                    className="form-control"
                    onChange={handleChange("name")}
                    type="text"
                    value={name}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col">
                  <label className="text-light">Last Name</label>
                  <input
                    className="form-control"
                    onChange={handleChange("lastName")}
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="You Email"
                required
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label className="text-light">Password</label>
                  <input
                    className="form-control"
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="col">
                  <label className="text-light">Enter Password Again</label>
                  <input
                    className="form-control"
                    onChange={handleChange("password2")}
                    type="password"
                    value={password2}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
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
    <Base title="Sign Up" description="Create a New account">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
