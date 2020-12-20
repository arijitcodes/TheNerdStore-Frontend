import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import {
  getAllCategories,
  getAProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getARedirect: false,
    formData: "",
  });
  const [redirect, setRedirect] = useState(false);

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getARedirect,
    formData,
  } = values;

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  // Preload values of Categories to display in form select option
  const preload = (productId) => {
    getAProduct(productId).then((data) => {
      if (data.err || data.error) {
        setValues({ ...values, error: data.err ? data.err : data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  // Preload Categories
  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.err || data.error) {
        setValues({ ...values, error: data.err ? data.err : data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  // On Submit Method
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    // UPDATE PRoducts
    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.err || data.error) {
          setValues({ ...values, error: data.err });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setRedirect(true);
    }, 2000);
  };

  // Handle Change Method
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // Success Message
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      {createdProduct} was Updated Successfully!
    </div>
  );

  // Error Message
  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      Failed to Update {createdProduct}!
    </div>
  );

  // Create Product Form
  const createProductForm = () => (
    <form>
      <span>Update photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
          required
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          required
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          required
        >
          <option>Select</option>
          {categories &&
            categories.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
          required
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-info mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product"
      description="Add a New Product here."
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          {redirect && <Redirect to="/admin/products" />}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
