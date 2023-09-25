const cont = document.getElementById("container");
const c1 = document.getElementById("c1");
const cart = document.getElementById("cart");
const btn = document.getElementById("btn");
const searchbox = document.getElementById("searchbox");

const url = fetch("https://fakestoreapi.com/products");

//start of the my cart
let cartItems = [];
let totalItems = 0;
let totalPrice = 0;
const deliveryCharge = 20;
const taxRate = 0.18;

function updateCart() {
  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cartcont");

  const cartInfo = document.createElement("div");
  cartInfo.classList.add("cart-info");

  totalItems = cartItems.length;

  cartItems.forEach((item) => {
    totalPrice += item.price;
  });

  const totalTax = totalPrice * taxRate;
  const total = totalPrice + deliveryCharge + totalTax;

  cartInfo.innerHTML = `
    <p>Total Items: ${totalItems}</p>
    <p>Total Price: $${totalPrice.toFixed(2)}</p>
    <p>Delivery Charge: $${deliveryCharge.toFixed(2)}</p>
    <p>Total Tax: $${totalTax.toFixed(2)}</p>
    <p>Total Amount to Pay: $${total.toFixed(2)}</p>
  `;

  const buyNowButton = document.createElement("button");
  buyNowButton.classList.add("buy-now");
  buyNowButton.innerText = "Buy Now";

  cartContainer.appendChild(cartInfo);
  cartContainer.appendChild(buyNowButton);

  cart.innerHTML = "";
  cart.appendChild(cartContainer);
}

//end of my cart

//implementation of search func

let result = [];

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchbox.value.toLowerCase();
  const filteredValues = result.filter((ele) =>
    ele.title.toLowerCase().includes(searchValue)
  );

  c1.innerHTML = "";
  filteredValues.forEach((ele) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const img = document.createElement("img");
    img.classList.add("img");

    const title = document.createElement("h3");
    title.classList.add("title");

    const cat = document.createElement("p");
    cat.classList.add("cat");

    const rating = document.createElement("p");
    rating.classList.add("rating");

    const cnt = document.createElement("p");
    cnt.classList.add("cnt");

    const price = document.createElement("p");
    price.classList.add("price");

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.innerText = "Add to Cart";

    img.src = ele.image;
    title.innerText = ele.title;
    cat.innerText = "Category: " + ele.category;
    rating.innerText = "Ratings: " + ele.rating.rate;
    cnt.innerText = "People Rated: " + ele.rating.count;
    price.innerText = "Price: $" + ele.price;

    productDiv.appendChild(img);
    productDiv.appendChild(title);
    productDiv.appendChild(cat);
    productDiv.appendChild(rating);
    productDiv.appendChild(cnt);
    productDiv.appendChild(price);
    productDiv.appendChild(addToCartButton);

    addToCartButton.addEventListener("click", () => {
      cartItems.push(ele);
      updateCart();
    });

    c1.appendChild(productDiv);
  });

  searchbox.value = "";
});

//end of search implementation

//start of the card creation
url
  .then((res) => res.json())
  .then((data) => {
    result = data;
    console.log(result);

    result.forEach((ele) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const img = document.createElement("img");
      img.classList.add("img");

      const title = document.createElement("h3");
      title.classList.add("title");

      const cat = document.createElement("p");
      cat.classList.add("cat");

      const rating = document.createElement("p");
      rating.classList.add("rating");

      const cnt = document.createElement("p");
      cnt.classList.add("cnt");

      const price = document.createElement("p");
      price.classList.add("price");

      const addToCartButton = document.createElement("button");
      addToCartButton.classList.add("add-to-cart");
      addToCartButton.innerText = "Add to Cart";

      img.src = ele.image;
      title.innerText = ele.title;
      cat.innerText = "Category: " + ele.category;
      rating.innerText = "Ratings: " + ele.rating.rate;
      cnt.innerText = "People Rated: " + ele.rating.count;
      price.innerText = "Price: $" + ele.price;

      productDiv.appendChild(img);
      productDiv.appendChild(title);
      productDiv.appendChild(cat);
      productDiv.appendChild(rating);
      productDiv.appendChild(cnt);
      productDiv.appendChild(price);
      productDiv.appendChild(addToCartButton);

      addToCartButton.addEventListener("click", () => {
        cartItems.push(ele);
        updateCart();
      });

      c1.appendChild(productDiv);
    });
  });

//end of the cart creation
