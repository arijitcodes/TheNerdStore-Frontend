import React, { useEffect, useState } from "react";

// Components and Methods
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUser, updateUserForm } from "./helper/userapicalls";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    photo: null,
    purchases: [],
    loading: false,
    error: false,
    success: false,
  });
  const [edit, setEdit] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  // Preload User Data
  const preload = () => {
    setUserData({ ...userData, loading: true });
    getUser(user._id, token).then((data) => {
      if (data.err || data.error) {
        console.log(data.err ? data.err : data.error);
      } else {
        setUserData({
          ...userData,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          mobile: data.mobile ? data.mobile : "",
          photo: data.photo ? data.photo : null,
          purchases: data.purchases,
        });
        // console.log(data);
      }
    });
    setUserData({ ...userData, loading: false });
  };

  // Loading Message
  const loadingMessage = () => (
    <div className="alert alert-primary" align="center">
      <h3>Loading...</h3>
    </div>
  );

  // Error Message
  const errorMessage = () => {
    if (userData.error) {
      return (
        <div className="col-10 offset-1 alert alert-danger" align="center">
          {userData.error}
        </div>
      );
    }
  };

  // Success Message
  const successMessage = () => {
    if (userData.success) {
      return (
        <div className="col-10 offset-1 alert alert-success" align="center">
          User Updated Successfully!
        </div>
      );
    }
  };

  // Handle Form Value Change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = () => {
    const userFormData = {
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
    };

    updateUserForm(user._id, token, userFormData).then((data) => {
      if (data.err || data.error) {
        // console.log(data.err ? data.err : data.error);
        setUserData({
          ...userData,
          error: data.err ? data.err : data.error,
          success: false,
        });
      } else {
        setUserData({
          ...userData,
          error: false,
          success: true,
        });

        // Setting Edit as False
        setEdit(false);

        // Clearing Success Message
        setTimeout(() => {
          setUserData({
            ...userData,
            success: false,
          });
        }, 3000);
      }
    });
  };

  // Buttons
  const displayButtons = () => {
    if (edit) {
      return (
        <>
          <button
            type="submit"
            className="btn btn-block rounded btn-outline-success"
            onClick={(e) => {
              e.preventDefault();
              // setEdit(false);
              // preload();
              handleSubmit();
            }}
          >
            Update Profile
          </button>
          <button
            type="submit"
            className="btn btn-block rounded btn-outline-warning"
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-block rounded btn-outline-danger"
            onClick={(e) => {
              e.preventDefault();
              setEdit(false);
              preload();
            }}
          >
            Cancel
          </button>
        </>
      );
    } else {
      return (
        <button
          type="submit"
          className="btn btn-block rounded btn-outline-info"
          onClick={(e) => {
            e.preventDefault();
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      );
    }
  };

  // Reset UserData State
  const handleReset = () => {
    setUserData({
      ...userData,
      name: "",
      lastName: "",
      email: "",
      mobile: "",
    });
  };

  // User DP Section
  const userDPSection = () => (
    <div
      className="row"
      // style={{ border: "1px solid green" }}
    >
      <div
        className="col mx-auto align-middle"
        // style={{ border: "1px solid blue" }}
      >
        <div className="row my-2">
          <div className="col">
            <i
              className="far fa-user-circle"
              style={{ fontSize: "150px", color: "#c9c9c9" }}
            ></i>
          </div>
        </div>
        <div className="row my-2">
          <div className="col">Change Photo</div>
        </div>
      </div>
    </div>
  );

  // Middle User Form Section
  const middleUserFormSection = () => (
    <div className="row">
      <div className="col m-4">
        <form>
          <div
            className="form-group col-10 offset-1"
            // style={{ border: "solid 1px yellow" }}
          >
            <label htmlFor="name">First Name: </label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="name"
              value={userData.name}
              disabled={edit === true ? false : true}
              style={{ background: !edit && "rgb(0,0,0,0)" }}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="form-group col-10 offset-1"
            // style={{ border: "solid 1px yellow" }}
          >
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={userData.lastName}
              disabled={edit === true ? false : true}
              style={{ background: !edit && "rgb(0,0,0,0)" }}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="form-group col-10 offset-1"
            // style={{ border: "solid 1px yellow" }}
          >
            <label htmlFor="fName">Your Email: </label>
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              name="email"
              value={userData.email}
              disabled={edit === true ? false : true}
              style={{ background: !edit && "rgb(0,0,0,0)" }}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="form-group col-10 offset-1"
            // style={{ border: "solid 1px yellow" }}
          >
            <label htmlFor="fName">Mobile: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Mobile Number"
              name="mobile"
              value={userData.mobile}
              disabled={edit === true ? false : true}
              style={{ background: !edit && "rgb(0,0,0,0)" }}
              onChange={handleChange}
            />
          </div>
          <div
            className="form-group col-10 offset-1"
            // style={{ border: "solid 1px yellow" }}
          >
            {displayButtons()}
          </div>
        </form>
      </div>
    </div>
  );

  // Right Side Column
  const rightSideColumn = () => (
    <>
      {/*  */}
      {/* Check Your Orders */}
      <div
        className="row h-100 align-items-center justify-content-center my-2"
        // style={{ border: "solid 1px green" }}
      >
        <div className="col">
          <div
            className="card border-info"
            style={{ background: "rgb(0,0,0,0)", cursor: "pointer" }}
          >
            {/* <div className="card-header">Header</div> */}
            <div className="card-body text-info">
              <div className="row align-items-center">
                <div className="col text-center h1">
                  <i className="fas fa-boxes"></i>
                </div>
                <div className="col" align="center">
                  <h5 className="card-title">Check Your Orders</h5>
                  {/* <p className={admin === true ? "d-none" : "d-none"}>
                          Your Orders
                        </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      {/* Addresses */}
      <div
        className="row align-items-center my-2"
        // style={{ border: "solid 1px green" }}
      >
        <div className="col" align="center">
          <div className="row">
            <div className="col">Your Addresses</div>
          </div>
          <div className="row">
            <div className="col-12">Address1</div>
            <div className="col-12">Address2</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Base title="Profile" description="Your Profile">
      {userData.loading === true ? (
        loadingMessage()
      ) : (
        <>
          {successMessage()}
          {errorMessage()}
          <div
            className="row align-items-center"
            style={{ border: "1px solid yellow" }}
          >
            {/*  */}
            {/* User DP */}
            <div
              className="col-md-3 col-sm-4 col-xs-12 my-2 h-100"
              align="center"
              // style={{ border: "1px solid red" }}
            >
              {userDPSection()}
            </div>

            {/* User Info Form Body */}
            <div
              className="col-md-6 col-sm-8 col-xs-12 my-2"
              // style={{ border: "1px solid red" }}
            >
              {middleUserFormSection()}
            </div>

            {/* Right Side Bar */}
            <div
              className="col-md-3 col-sm-12 col-xs-12 my-2"
              // style={{ border: "1px solid red" }}
            >
              {rightSideColumn()}
            </div>
          </div>
        </>
      )}
    </Base>
  );
};

export default Profile;
