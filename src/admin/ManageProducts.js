import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

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

  return (
    <Base title="Manage Products" description="Manage your products here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
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
              <table class="table table-responsive-sm table-hover table-dark table-striped">
                <caption>List of Products</caption>{" "}
                <thead>
                  <tr className="text-center">
                    <th scope="col" className="border border-info h4">
                      Products
                    </th>
                    <th scope="col" className="border border-info h4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-info">{product.name}</td>
                        <td className="border border-info">
                          <Link
                            className="btn btn-success btn-sm"
                            to={`/admin/product/update/${product._id}`}
                          >
                            Update
                          </Link>
                          <span className="mx-1"></span>
                          <Link
                            onClick={() => {
                              deleteThisProduct(product._id);
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
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
