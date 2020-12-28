import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [items, setItems] = useState([]);

  const { user, token } = isAuthenticated();

  const searchText = useRef("");

  useEffect(() => {
    preload();
  }, []);

  // Preload Products
  const preload = () => {
    getAllCategories()
      .then((data) => {
        if (data.err || data.error) {
          console.log(data.err ? data.err : data.error);
        } else {
          setCategories(data);
          setItems(data);
        }
      })
      .catch((error) => console.log(error));
  };

  // Delete this Category
  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        preload();
      }
    });
  };

  // Handle Search Field Input Change
  const handleSearchChange = (e) => {
    // console.log("Text: ", e.target.value);
    let tempFiltered = [];
    if (e.target.value !== "") {
      // Filter Orders

      // console.log(orders);
      tempFiltered = categories.filter((category) => {
        const regexp = new RegExp(`${e.target.value}`, "gi");
        return (
          // order._id.match(regexp) ||
          category.name.match(regexp)
        );
      });

      setFiltered(tempFiltered);
      setItems(tempFiltered);
      // console.log("Filtered: ", filtered);
    } else {
      // Clear Filter
      setFiltered(tempFiltered);
      setItems(categories);
      // console.log("Filtered Cleared: ", filtered);
    }
  };

  return (
    <Base
      title="Manage Categories"
      description="Manage all of your categories here"
    >
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
        </div>
        <div className="col-md-6 col-sm-12 mt-2 mt-md-0" align="right">
          <div className="col-md-8 col-sm-12">
            <input
              type="text"
              placeholder="Search by Category Name..."
              className="form-control transparent text-light"
              style={{ background: "rgb(0,0,0,0)" }}
              ref={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <h2 className="mt-2 mb-4">All Categories ({categories.length}) :</h2>
      <div className="row">
        <div className="col-12">
          {/* <h2 className="text-center text-white my-3">
            Total {categories.length} categories
          </h2> */}
          {/* {categories &&
            categories.map((category, index) => (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))} */}
          {/*  */}

          {/*  */}
          {/*  */}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12 col-xs-12">
          <table className="table table-responsive-sm table-hover table-dark table-striped">
            <caption>List of Categories</caption>{" "}
            <thead>
              <tr className="text-center">
                <th scope="col" className="border border-info h4">
                  Categories
                </th>
                <th scope="col" className="border border-info h4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((category, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-info">{category.name}</td>
                    <td className="border border-info">
                      <Link
                        className="btn btn-success btn-sm rounded"
                        to={`/admin/category/update/${category._id}`}
                      >
                        Update <i className="far fa-edit d-none d-sm-inline" />
                      </Link>
                      <span className="mx-1"></span>
                      <Link
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                        className="btn btn-danger btn-sm rounded"
                        to="#!"
                      >
                        Delete{" "}
                        <i className="far fa-trash-alt d-none d-sm-inline" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
