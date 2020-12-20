import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

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

  return (
    <Base
      title="Manage Categories"
      description="Manage all of your categories here"
    >
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
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
          <table class="table table-responsive-sm table-hover table-dark table-striped">
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
              {categories &&
                categories.map((category, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-info">{category.name}</td>
                    <td className="border border-info">
                      <Link
                        className="btn btn-success btn-sm"
                        to={`/admin/category/update/${category._id}`}
                      >
                        Update
                      </Link>
                      <span className="mx-1"></span>
                      <Link
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                        className="btn btn-danger btn-sm"
                        to="#!"
                      >
                        Delete
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
