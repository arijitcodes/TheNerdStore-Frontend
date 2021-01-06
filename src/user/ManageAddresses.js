import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteAddress, getAllAddress } from "./helper/userapicalls";

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  // Preload Addresses of the user in State
  const preload = () => {
    setLoading(true);
    getAllAddress(user._id, token).then((data) => {
      if (data.err || data.error) {
        alert("Error!");
        setError("Error Occured! Couldn't load your addresses!");
        setLoading(false);
      } else {
        setAddresses(data);
        setLoading(false);
      }
    });
  };

  // Display All Addresses
  const displayAddresses = () => (
    <>
      <div className="row">
        <div className="col-md-6 col-sm-7">
          <h3>Manage Addresses ({addresses && addresses.length}):</h3>
        </div>
        <div className="col-md-6 col-sm-5" align="right">
          <Link to="/newaddress" className="btn btn-outline-info">
            Add a new Address
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {/* <div className="col-sm-10 offset-sm-1"> */}
            {addresses &&
              addresses.map((address, index) => (
                <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
                  <div
                    class="card border-info my-3"
                    style={{ background: "rgb(0,0,0,0)" }}
                  >
                    <div class="card-header">
                      Address Type:{" "}
                      <span className="text-info mx-2">{address.type}</span>
                      {address.primary && " | Primary Address |"}
                    </div>
                    <div class="card-body">
                      <div className="row align-items-center">
                        <div className="col-12 text-center">
                          <h6 class="card-title lead">
                            <span className="text-muted">Address Title:</span>{" "}
                            {address.title}
                          </h6>
                        </div>

                        <div
                          className="col-lg-8 col-md-8 col-sm-8"
                          align="left"
                        >
                          {/* <div className="col">
                        <div className="row"> */}
                          {/* <div className="col"> */}
                          <div class="card-text" align="left">
                            {/* <div className="row">
                            <div
                              className="col-sm-4 col text-muted"
                              align="right"
                            >
                              Primary:{" "}
                            </div>
                            <div className="col-sm-8 col">
                              {address.primary === true ? "true" : "false"}
                            </div>
                          </div> */}
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                Address:{" "}
                              </div>
                              <div className="col-sm-8 col">
                                {address.address}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                City:{" "}
                              </div>
                              <div className="col-sm-8 col">{address.city}</div>
                            </div>
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                District:{" "}
                              </div>
                              <div className="col-sm-8 col">
                                {address.district}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                State:{" "}
                              </div>
                              <div className="col-sm-8 col">
                                {address.state}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                Country:{" "}
                              </div>
                              <div className="col-sm-8 col">
                                {address.country}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                Landmark:{" "}
                              </div>
                              <div className="col-sm-8 col">
                                {address.landmark}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-sm-4 col text-muted"
                                align="right"
                              >
                                Zipcode:{" "}
                              </div>
                              <div className="col-sm-8 col">
                                {address.zipcode}
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                          {/* </div>
                      </div> */}
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 mt-4 mt-md-0">
                          <button
                            className={
                              address.primary
                                ? "d-none"
                                : "btn btn-outline-info btn-block mb-4"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setAsPrimaryAddress(address._id);
                            }}
                          >
                            Set As Primary
                          </button>

                          <button className="btn btn-outline-success btn-block mt-2">
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-block mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteThisAddress(address._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );

  // Delete This Address
  const deleteThisAddress = (addressId) => {
    deleteAddress(user._id, token, addressId).then((data) => {
      if (data.err || data.error) {
        setError(data.err ? data.err : data.error);
      } else {
        setSuccess("Address has been deleted successfully!");
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        preload();
      }
    });
  };

  // Set as A primary
  const setAsPrimaryAddress = (addressId) => {
    alert(addressId);
  };

  // Success Message
  const successMessage = () =>
    success && <div className="alert alert-success">{success}</div>;

  // Error Message
  const errorMessage = () => {
    error && <div className="alert alert-danger">{error}</div>;
  };

  return (
    <Base
      title="Manage Addresses"
      description="Manage all of your saved addresses"
    >
      {successMessage()}
      {errorMessage()}

      {loading && (
        <div className="alert alert-info" align="center">
          Loading...
        </div>
      )}
      {!loading && !error && (!addresses || addresses.length <= 0) && (
        <div className="row">
          <div className="col-sm-6 col offset-sm-3">
            <div className="alert alert-info" align="center">
              No Addresses Found!
            </div>
            <Link to="/newaddress" className="btn btn-block btn-outline-info">
              Add A New Address
            </Link>
          </div>
        </div>
      )}
      {loading === false && addresses && displayAddresses()}
    </Base>
  );
};

export default ManageAddresses;
