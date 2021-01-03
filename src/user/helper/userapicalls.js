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
