import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components & Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  // On Change Method
  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  // On Submit Method
  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    // Backend Req Call Function - from adminapicall.js
    createCategory(user._id, token, { name }).then((data) => {
      if (data.err || data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  // Success Message
  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">New Category Created Successfully!</h4>
      );
    }
  };

  // Error Message
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create new category!</h4>;
    }
  };

  // Category Input Form
  const categoryForm = () => {
    return (
      <>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <p className="lead">Enter the Category</p>
            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange}
              value={name}
              autoFocus
              required
              placeholder="Category"
            />
            <button type="submit" className="btn btn-outline-info">
              Create Category
            </button>
          </div>
        </form>

        <div className="mt-5">
          <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
            Admin Home
          </Link>
        </div>
      </>
    );
  };

  return (
    <div>
      <Base
        title="Create Category"
        description="Create a New Product Category"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-2">
            {successMessage()}
            {errorMessage()}
            {categoryForm()}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default AddCategory;
