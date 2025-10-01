console.log("loaded");

const category = new URLSearchParams(window.location.search).get("category");
const url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

getData(url);

getData("https://kea-alt-del.dk/t7/api/products/");
const productContainer = document.querySelector("#product_list_container");
function getData(url) {
  fetch(url).then((res) => res.json().then((data) => showProducts(data)));
}

function showProducts(products) {
  console.log("products", products);
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
