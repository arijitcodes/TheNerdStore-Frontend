import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [items, setItems] = useState([]);

  const { user, token } = isAuthenticated();

  const searchText = useRef("");

  useEffect(() => {
    preload();
  }, []);

  // Preload Products
  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.err || data.error) {
          console.log(data.err ? data.err : data.error);
        } else {
          setProducts(data);
          setItems(data);
        }
      })
      .catch((error) => console.log(error));
  };

  // deleteThisProduct - Delete a Product
  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        preload(); // Loading preload again to reload data and react component
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
      tempFiltered = products.filter((product) => {
        const regexp = new RegExp(`${e.target.value}`, "gi");
        return (
          // order._id.match(regexp) ||
          product.name.match(regexp)
        );
      });

      setFiltered(tempFiltered);
      setItems(tempFiltered);
      // console.log("Filtered: ", filtered);
    } else {
      // Clear Filter
      setFiltered(tempFiltered);
      setItems(products);
      // console.log("Filtered Cleared: ", filtered);
    }
  };

  return (
    <Base title="Manage Products" description="Manage your products here">
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
              placeholder="Search by Product Name..."
              className="form-control transparent text-light"
              style={{ background: "rgb(0,0,0,0)" }}
              ref={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <h2 className="mt-2 mb-4">All products ({products.length}) :</h2>
      <div className="row">
        <div className="col-12">
          {/* <h2 className="text-center text-white my-3">
            Total {products.length} products
          </h2> */}

          {/* {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })} */}

          <div className="row justify-content-center">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <table className="table table-responsive-sm table-hover table-dark table-striped">
                <caption>List of Products</caption>{" "}
                <thead>
                  <tr className="text-center">
                    <th scope="col" className="border border-info h4">
                      Products
                    </th>
                    <th scope="col" className="border border-info h4">
                      Stock
                    </th>
                    <th scope="col" className="border border-info h4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((product, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-info align-middle">
                          {product.name}
                        </td>
                        <td className="border border-info align-middle">
                          {product.stock > 0 ? (
                            product.stock
                          ) : (
                            <span className="btn btn-danger">
                              {product.stock}
                            </span>
                          )}
                        </td>
                        <td className="border border-info align-middle">
                          <Link
                            className="btn btn-success btn-sm rounded m-1"
                            to={`/admin/product/update/${product._id}`}
                          >
                            Update{" "}
                            <i className="far fa-edit d-none d-sm-inline" />
                          </Link>
                          <Link
                            onClick={() => {
                              deleteThisProduct(product._id);
                            }}
                            className="btn btn-danger btn-sm rounded m-1"
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
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
