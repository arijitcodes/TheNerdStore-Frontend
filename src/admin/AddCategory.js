import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components & Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const AddCategory = () => {
  const [name, setName] = useState("initialState");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const categoryForm = () => {
    return (
      <>
        <form>
          <div className="form-group">
            <p className="lead">Enter the Category</p>
            <input
              type="text"
              className="form-control my-3"
              autoFocus
              required
              placeholder="Category"
            />
            <button className="btn btn-outline-info">Create Category</button>
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
        description="You can create a New Product Category here"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-2">{categoryForm()}</div>
        </div>
      </Base>
    </div>
  );
};

export default AddCategory;
