console.log("loaded");

const category = new URLSearchParams(window.location.search).get("category");
const url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
let allData;

document.querySelectorAll(".filterbuttons button").forEach((btn) => {
  btn.addEventListener("click", filterKlik);
});

function filterKlik(evt) {
  showFiltered(evt.currentTarget.dataset.gender);
}

function showFiltered(filter) {
  if (filter == "All") {
    showProducts(allData);
  } else {
    const filteredProductArr = allData.filter((product) => product.gender === filter);
    showProducts(filteredProductArr);
  }
  console.log("showFiltered", filter);
  console.log(allData.filter((product) => product.gender === filter));
}

getData(url);

// getData("https://kea-alt-del.dk/t7/api/products/");
const productContainer = document.querySelector("#product_list_container");
function getData(url) {
  fetch(url).then((res) =>
    res.json().then((data) => {
      allData = data;
      showProducts(allData);
    })
  );
}

function showProducts(products) {
  console.log("products", products);
  productContainer.innerHTML = "";

  products.forEach((product) => {
    console.log("productdisplayname", product.productdisplayname);

    let soldOutClass = "";
    if (product.soldout === 1) {
      soldOutClass = "udsolgt";
    }

    productContainer.innerHTML += ` 
    <article class="product_card ${product.soldout ? "soldOut" : ""} ${product.discount ? "discount" : ""}">
    <div class="imageContainer">
                <a class="productbtn" href="product.html?id=${product.id}"><img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}"></a>
                <p>Out of stock</p>
                </div>
                <h2>${product.productdisplayname}</h2>
           <p class="price">
        DKK <span>${product.price}</span>,-
      </p>
      <div class="discounted_container">
        <p>
            Now DKK <span>${Math.round(product.price - (product.price * product.discount) / 100)}</span>,-
        </p>
        <p>
          <span>${product.discount}</span> %
        </p>
      </div>
    </article>`;
  });
}
