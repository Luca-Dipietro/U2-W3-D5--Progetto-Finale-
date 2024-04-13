const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjQwNTdmMzA0NjAwMWFlNTlmOTAiLCJpYXQiOjE3MTI5MTEzNjUsImV4cCI6MTcxNDEyMDk2NX0.2QNVHayPzH1dligIY2xNdymn-behdCm9cR1vCdHQnzo";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("_id");

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetails");
  fetch(apiUrl + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Error in fetch");
      }
    })
    .then((product) => {
      const { name, description, brand, imageUrl, price } = product;
      container.innerHTML = `<img src="${imageUrl}" class="card-img-top product-image" alt="${name}">
       <div class="card-body">
        <h5 class="card-title text-center">${name}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text">Brand: ${brand}</p>
        <p class="card-text">Price: $ ${price}</p>
      </div>`;
    })
    .catch((error) => console.error("Error fetching product details:", error));
});
