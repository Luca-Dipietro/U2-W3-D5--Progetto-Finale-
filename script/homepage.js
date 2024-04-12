const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjQwNTdmMzA0NjAwMWFlNTlmOTAiLCJpYXQiOjE3MTI5MTEzNjUsImV4cCI6MTcxNDEyMDk2NX0.2QNVHayPzH1dligIY2xNdymn-behdCm9cR1vCdHQnzo";

const productListContainer = document.getElementById("productList");

fetch(apiUrl, {
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
  .then((data) => {
    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-3", "mb-4");

      productCard.innerHTML = `
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Brand: ${product.brand}</p>
            <p class="card-text">Price: $ ${product.price}</p>
            <button class="btn btn-primary" onclick="viewProductDetail('${product._id}')">More</button>
            <button class="btn btn-secondary" onclick="editProduct('${product._id}')">Modify</button>
          </div>
        </div>
      `;

      productListContainer.appendChild(productCard);
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

function viewProductDetail(productId) {
  window.location.href = `details.html?_id=${productId}`;
}

function editProduct(productId) {
  window.location.href = `backoffice.html?_id=${productId}`;
}