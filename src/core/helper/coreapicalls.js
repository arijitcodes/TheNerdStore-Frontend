import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      alert("Error: " + error);
      console.log(error);
      return [{ error: "error" }];
    });
};

export const getOrders = (userId, token) => {
  return fetch(`${API}/orders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => console.log(error));
};
