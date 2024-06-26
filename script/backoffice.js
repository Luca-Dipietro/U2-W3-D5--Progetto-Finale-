const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
const method = id ? "PUT" : "POST";
const apiUrl = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjQwNTdmMzA0NjAwMWFlNTlmOTAiLCJpYXQiOjE3MTI5MTEzNjUsImV4cCI6MTcxNDEyMDk2NX0.2QNVHayPzH1dligIY2xNdymn-behdCm9cR1vCdHQnzo";

const alertcontainer = document.querySelector(".alert-container");

window.addEventListener("DOMContentLoaded", () => {
  const productForm = document.querySelector("#productForm");
  productForm.addEventListener("submit", handleSubmit);

  const btnSubmit = document.querySelector("button[type='submit']");
  const deleteBtn = document.getElementById("deleteBtn");
  const subtitle = document.getElementById("subtitle");

  if (id) {
    subtitle.innerText = "— Modify Products";
    btnSubmit.classList.remove("btn-primary");
    btnSubmit.classList.add("btn-success");
    btnSubmit.innerText = "Modify";
    deleteBtn.addEventListener("click", handleDelete);
    deleteBtn.classList.remove("d-none");

    fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
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
      .then((productToModify) => {
        const { name, description, brand, imageUrl, price } = productToModify;

        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch((error) => console.log(error));
  } else {
    subtitle.innerText = "— Adds Product";
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(apiUrl, {
    method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
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
    .then((createdProduct) => {
      if (id) {
        alertcontainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Products: ${createdProduct.name} modified successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      } else {
        alertcontainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Products: ${createdProduct.name} created successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
        event.target.reset();
      }
    })
    .catch((error) => console.log(error));
};

const handleDelete = () => {
  const hasConfirmed = confirm("Do you want to delete the product?");

  if (hasConfirmed) {
    fetch(apiUrl, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Error in fetch");
        }
      })
      .then((deleteProduct) => {
        alertcontainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Products: ${deleteProduct.name} elimanted successfully!
          <button class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="returnBackOffice()"></button>
        </div>
      `;
      })
      .catch((error) => console.log(error));
  }
};

const returnBackOffice = function () {
  window.location.href = "backoffice.html";
};
