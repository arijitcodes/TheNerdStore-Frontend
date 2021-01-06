const { API } = require("../../backend");

// get User Call
export const getUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Update User
export const updateUserForm = (userId, token, userFormData) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userFormData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Update User's Photo
export const updateUserPhoto = (userId, token, formData) => {
  return fetch(`${API}/user/photo/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//
// Address Calls

// Get all available Address Types
export const getAddressTypes = () => {
  return fetch(`${API}/address/types`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Get User's Primary Address
export const getUsersPrimaryAddress = (userId, token) => {
  return fetch(`${API}/address/primary/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Get All Address of a Logged In User
export const getAllAddress = (userId, token) => {
  return fetch(`${API}/address/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Create an Address
export const createAddress = (userId, token, data) => {
  return fetch(`${API}/address/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Delete An Address
export const deleteAddress = (userId, token, addressId) => {
  return fetch(`${API}/address/${addressId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Set an Address as primary
export const setPrimaryAddress = (userId, token, addressId) => {
  return fetch(`${API}/address/primary/${addressId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Get An Address from Id
export const getAnAddress = (userId, token, addressId) => {
  return fetch(`${API}/address/${addressId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Update Address
export const updateAddress = (userId, token, addressId, data) => {
  return fetch(`${API}/address/${addressId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
