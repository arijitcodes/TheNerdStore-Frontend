import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getACategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  // useEffect
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  // Preload - Load the Category
  const preload = (categoryId) => {
    setError(false);
    setSuccess(false);
    getACategory(categoryId)
      .then((data) => {
        if (data.err || data.error) {
          setError(data.err ? data.err : data.error);
        } else {
          setError(false);
          setCategory(data.name);
        }
      })
      .catch((error) => console.log(error));
  };

  // Handle Form Input Change
  const handleChange = (event) => {
    setError(false);
    setSuccess(false);
    setCategory(event.target.value);
  };

  // On Form Submit
  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    // Update Category
    updateCategory(match.params.categoryId, user._id, token, { name: category })
      .then((data) => {
        if (data.err || data.error) {
          setError(data.err ? data.err : data.error);
        } else {
          setCategory(data.name);
          setSuccess(true);
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  // Success Message
  const successMessage = () => {
    if (success)
      return (
        <div className="alert alert-success">
          {category} updated Successfully!
        </div>
      );
  };

  // Error Message
  const errorMessage = () => {
    if (error)
      return (
        <div className="alert alert-danger">
          Failed to update {category}!<p>Error: {error}</p>
        </div>
      );
  };

  // Category Input Form
  const categoryForm = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <p className="lead mt-2">Update the Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={category}
            autoFocus
            required
            placeholder="Category"
          />

          <button type="submit" className="btn btn-outline-info">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update Category"
      description="Update the categroy here"
      className="container bg-info p-4"
    >
      <div className="">
        <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-2 my-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
