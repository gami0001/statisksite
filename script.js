console.log("product loadet");

const id = new URLSearchParams(window.location.search).get("id");

const productUrl = `https://kea-alt-del.dk/t7/api/products/${id}`;
const productcontainer = document.querySelector("#productcontainer");

console.log("product", productUrl);

function getData() {
  fetch(productUrl).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  console.log("shows data er", data);

  productcontainer.innerHTML = `
    <section class="product_container">
            <article class="product_one">
                <div class="product_img">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="${data.productdisplayname}">
      </div>
     </article>
            <article class="product_info">
        <h1>${data.productdisplayname}</h1>
        <h2>${data.price},-</h2>

          <ul>
                    <li>Super quality</li>
                    <li>Athlete aprroved</li>
                    <li>Durable</li>
                    <li>4.5 stars on TrustPilot</li>
                    <li>Free return</li>
                </ul>


                <div class="size_picker">
                    <label><input type="radio" name="size" value="S" checked> S</label>
                    <label><input type="radio" name="size" value="M"> M</label>
                    <label><input type="radio" name="size" value="L"> L</label>
                </div>
                <div class="cta">
                    <div class="cta_btn">
                        <h3>ADD TO CART</h3>
                    </div>
                    <div class="cta_btn">
                        <h3>BUY IT NOW</h3>
                    </div>
                    </div>
    </article>
    </section>
  `;
}

getData();
