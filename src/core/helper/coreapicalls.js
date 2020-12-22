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
