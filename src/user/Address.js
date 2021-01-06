import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components and Methods
import { isAuthenticated } from "../auth/helper";
import { getUsersPrimaryAddress } from "./helper/userapicalls";

const Address = () => {
  const [address, setAddress] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    preload();
  }, []);

  const { user, token } = isAuthenticated();

  // Preload Address of User
  const preload = () => {
    getUsersPrimaryAddress(user._id, token).then((data) => {
      //   console.log("Data: ", data);
      if (data.err || data.error) {
        if (data.err) {
          setAddress(false);
        }
        setError(data.err ? data.err : data.error);
        // console.log(data.err ? data.err : data.error);
      } else {
        setAddress(data);
      }
    });
  };

  // Add Primary Address
  const addPrimaryAddress = () => (
    <>
      {error && error}
      <Link to="/addresses/new" className="btn btn-block btn-outline-info my-2">
        Add A Primary Address
      </Link>
    </>
  );

  // Show Primary Address
  const showPrimaryAddress = () => (
    <div className="col py-3" style={{ border: "1px solid white" }}>
      <div className="row align-items-center">
        <div className="col">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              Title:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.title}
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              Type:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.type}
            </div>
          </div>
          <div className="row align-items-center my-1">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              Address:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.address}
            </div>
          </div>
          <div className="row align-items-center my-1">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              City:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.city}
            </div>
          </div>
          <div className="row align-items-center my-1">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              District:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.district}
            </div>
          </div>
          <div className="row align-items-center my-1">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              State:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.state}
            </div>
          </div>
          <div className="row align-items-center my-1">
            <div className="col-lg-4 col-md-5 col-sm-4 col" align="right">
              ZIP Code:
            </div>
            <div className="col-lg-8 col-md-7 col-sm-8 col" align="left">
              {address.zipcode}
            </div>
          </div>
        </div>
        {/* <div className="col">{address.address}</div> */}
      </div>
    </div>
  );

  return (
    <>
      <div className="row">
        <div className="col my-3">
          <div className="col p-3" style={{ border: "1px solid white" }}>
            Your Primary Address
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col" style={{ overflow: "hidden" }}>
          {/* {error !== false ? error : address.title} */}
          {error !== false && address === false && addPrimaryAddress()}
          {address !== false && showPrimaryAddress()}
        </div>
      </div>
    </>
  );
};

export default Address;
