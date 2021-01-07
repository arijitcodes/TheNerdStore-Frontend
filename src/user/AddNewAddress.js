import React, { useEffect, useState } from "react";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAddressTypes, createAddress } from "./helper/userapicalls";

const AddNewAddress = () => {
  const [address, setAddress] = useState({
    title: "",
    type: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    landmark: "",
    zipcode: "",
    user: isAuthenticated().user._id ? isAuthenticated().user._id : null,
  });
  const [addressTypes, setAddressTypes] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  // Preload Address Types
  const preload = () => {
    getAddressTypes().then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        setAddressTypes(data);
      }
    });
  };

  // On Change
  const onChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // On Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      address.title == "" ||
      address.type == "" ||
      address.address == "" ||
      address.city == "" ||
      address.district == "" ||
      address.state == "" ||
      address.country == "" ||
      address.zipcode == ""
    ) {
      setError("Please fill up all the required fields!");
      removeError(2000);
      return;
    } else {
      // setting user
      setAddress({
        ...address,
        user: user._id,
      });
    }

    // Creating Address
    createAddress(user._id, token, address).then((data) => {
      if (data.err || data.error) {
        setError(data.err ? data.err : data.error);
        removeError();
      } else {
        // Clearing State and Form Values
        setAddress({
          ...address,
          title: "",
          type: "",
          address: "",
          city: "",
          district: "",
          state: "",
          country: "",
          landmark: "",
          zipcode: "",
        });

        // Setting Success
        setSuccess(true);
        removeSuccess();
      }
    });
  };

  // Add New Address Form
  const addressForm = () => (
    <form>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label>Address Title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Address Title"
              value={address.title}
              onChange={onChange}
            />
          </div>
          <div className="col">
            <label>Address Type *</label>
            <select
              name="type"
              className="form-control"
              value={address.type}
              onChange={onChange}
            >
              <option value="">Choose One...</option>
              {addressTypes &&
                addressTypes.map((addressType, index) => (
                  <option key={index} value={addressType}>
                    {addressType}
                  </option>
                ))}
            </select>
            {/* <input
              type="text"
              name="type"
              className="form-control"
              placeholder="Address Type"
              value={address.type}
              onChange={onChange}
            /> */}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Address *</label>
        <input
          type="text"
          name="address"
          className="form-control"
          placeholder="Address"
          value={address.address}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mt-md-0">
            <label>City *</label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="City"
              value={address.city}
              onChange={onChange}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mt-md-0">
            <label>District *</label>
            <input
              type="text"
              name="district"
              className="form-control"
              placeholder="District"
              value={address.district}
              onChange={onChange}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mt-md-0">
            <label>State *</label>
            <input
              type="text"
              name="state"
              className="form-control"
              placeholder="State"
              value={address.state}
              onChange={onChange}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mt-md-0">
            <label>Country *</label>
            <input
              type="text"
              name="country"
              className="form-control"
              placeholder="Country"
              value={address.country}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-6">
            <label>
              Landmark <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              name="landmark"
              className="form-control"
              placeholder="Landmark"
              value={address.landmark}
              onChange={onChange}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <label>P.I.N / Zip Code *</label>
            <input
              type="text"
              name="zipcode"
              className="form-control"
              placeholder="P.I.N / Zip Code"
              value={address.zipcode}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <button
          type="submit"
          className="btn btn-block btn-outline-success my-2"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
      {/* {JSON.stringify(address)} */}
    </form>
  );

  // Remove Error after 3 Seconds (If time in MS is not provided)
  const removeError = (timeout = 3000) => {
    setTimeout(() => {
      setError(false);
    }, timeout);
  };

  // Error Message
  const errorMessage = () => {
    if (error !== false) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  // Remove Success Message after 3 Seconds (If time in MS is not provided)
  const removeSuccess = (timeout = 3000) => {
    setTimeout(() => {
      setSuccess(false);
    }, timeout);
  };

  // Error Message
  const successMessage = () => {
    if (success === true) {
      return (
        <div className="alert alert-success">Address Created Successfully!</div>
      );
    }
  };

  return (
    <Base
      title="Add a New Address"
      description="Add a New Address in your Address book"
    >
      <div className="row my-3">
        <div className="col" align="center">
          <h4>Add an Address</h4>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12" align="center">
          {errorMessage()}
          {successMessage()}
        </div>
        <div className="col-lg-10 col-md-8 col-sm-12 offset-lg-1 offset-md-2">
          {addressForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddNewAddress;
