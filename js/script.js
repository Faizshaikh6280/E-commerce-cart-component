const btns = document.querySelectorAll(".add");
const itemContainer = document.querySelector(".cart-summary");
const subTotal = document.querySelector(".subtotal");
const tax = document.querySelector(".tax");
const totalPrice = document.querySelector(".price.total");
const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 223,
    image: "plate__french-fries.png",
    alt: "French Fries",
    count: 1,
    inCart: false,
  },
  {
    name: "Salmon and Vegetables",
    price: 512,
    image: "plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 1,
    inCart: false,
  },
  {
    name: "Spaghetti with Meat Sauce",
    price: 782,
    image: "plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 1,
    inCart: false,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 599,
    image: "plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 1,
    inCart: false,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 698,
    image: "plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 1,
    inCart: false,
  },
  {
    name: "Fish Sticks and Fries",
    price: 634,
    image: "plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 1,
    inCart: false,
  },
];
// Cart Array
const cart = [];

// Item needs to be find.
let item;
// To find recipeItem in array.(Helper Function)
const findRecipe = function (recipeName) {
  const recipe = menuItems.find((item) => item.name === recipeName);
  const index = menuItems.indexOf(recipe);
  menuItems[index].inCart = true;
  return recipe;
};
// To find recipeItem index in array.(Helper function)
const findRecipeIndexInCart = function (recipeName) {
  const recipeIndex = cart.findIndex((item) => item.name === recipeName);
  return recipeIndex;
};
// To find total subtotal
const calcTotal = function () {
  const sumOfSubTotal = cart.reduce((sum, cur) => sum + cur.subTotal, 0);
  subTotal.textContent = `$${sumOfSubTotal.toFixed(2)}`;
  tax.textContent = `$${(0.108 * sumOfSubTotal).toFixed(2)}`;
  totalPrice.textContent = `$${(0.108 * sumOfSubTotal + sumOfSubTotal).toFixed(
    2
  )}`;
};
// to display empty cart message.
const displayEmptyCartMsg = function () {
  const markup = `
  <div class="emptyCartMsg">
   <p>Your Cart is <span>Empty.</span> Add food to your cart😋</p>
  </div> 
  `;
  itemContainer.insertAdjacentHTML("afterbegin", markup);
};
const displayPlate = function () {
  const markup = ` <li>
    <div class="plate">
      <img
        src="images/${item.image}"
        alt="${item.alt}"
        class="plate"
      />
      <div class="quantity">${item.count}</div>
    </div>
    <div class="content">
      <p class="menu-item">${item.name}</p>
      <p class="price">$${item.price / 100}</p>
    </div>
    <div class="quantity__wrapper">
      <button class="decrease btn--update-servings" data-update-to ="${
        item.count - 1
      }">
        <img src="images/chevron.svg" />
      </button>
      <div class="quantity ">${item.count}</div>
      <button class="increase btn--update-servings" data-update-to ="${
        item.count + 1
      }">
        <img src="images/chevron.svg" />
      </button>
    </div>  
    <div class="subtotal">$${((item.price / 100) * item.count).toFixed(2)}</div>
  </li>
    `;
  itemContainer.insertAdjacentHTML("beforeend", markup);
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const itemName =
      e.target.parentElement.querySelector(".menu-item").textContent;
    // checking if item is already in cart or not.
    if (btn.classList.contains("in-cart")) {
      alert("Already In Your Cart 😉");
      return;
    }
    item = findRecipe(itemName);

    // Changing button look.
    btn.textContent = "";
    btn.classList.add("in-cart");
    const img = ` <img src="images/check.svg" alt="Check" />
      In Cart`;
    btn.insertAdjacentHTML("afterbegin", img);
    // pushing item into cart array.
    item.button = btn;
    cart.push(item);
    // displaying item on the DOM
    displayPlate();
    // updating subtotal on the DOM
    item.subTotal = (item.count * item.price) / 100;
    // updating total price on DOM
    calcTotal();
    if (
      cart.length > 0 &&
      itemContainer.firstElementChild.classList.contains("emptyCartMsg")
    )
      itemContainer.querySelector(".emptyCartMsg").remove();
  });
});

// Listning event for increse and deccrese
itemContainer.addEventListener("click", function (e) {
  const selectedItem = e.target
    .closest("li")
    .querySelector(".content")
    .querySelector(".menu-item").textContent;

  const btn = e.target.closest(".btn--update-servings");
  if (!btn) return;
  const { updateTo } = btn.dataset;
  const item = cart.find((el) => el.name === selectedItem);
  if (+updateTo > 0) item.count = +updateTo;
  if (+updateTo <= 0) {
    const itemName = e.target
      .closest("li")
      .querySelector(".content")
      .querySelector(".menu-item").textContent;
    const item = findRecipe(itemName);
    const itemIndex = findRecipeIndexInCart(itemName);
    // Changing button back to normal look in menu list.
    item.inCart = false;
    if (item.button.classList.contains("in-cart")) {
      item.button.classList.remove("in-cart");
      item.button.textContent = "Add to Cart";
    }

    // removing item form cart.
    e.target.closest("li").classList.add("removeAnimation");
    setTimeout(function () {
      e.target.closest("li").remove();
    }, 500);
    cart.splice(itemIndex, 1);
  }

  // Setting no. of servings on the DOM.
  e.target
    .closest("li")
    .querySelector(".plate")
    .querySelector(".quantity").textContent = item.count;

  e.target
    .closest("li")
    .querySelector(".quantity__wrapper")
    .querySelector(".quantity").textContent = item.count;

  // updating subTotal
  e.target.closest("li").querySelector(".subtotal").textContent = `$${
    (item.count * item.price) / 100
  }`;
  // updating subtotal in cart array.
  item.subTotal = (item.count * item.price) / 100;
  // updating Total price on the DOM
  calcTotal();
  // updating button's dataset attribute.
  if (btn.classList.contains("increase")) {
    btn.dataset.updateTo = +updateTo + 1;
    const opBtn = e.target
      .closest(".quantity__wrapper")
      .querySelector(".decrease");
    opBtn.dataset.updateTo = +btn.dataset.updateTo - 2;
  }
  if (btn.classList.contains("decrease") && +updateTo >= 0) {
    btn.dataset.updateTo = +updateTo - 1;
    const opBtn = e.target
      .closest(".quantity__wrapper")
      .querySelector(".increase");
    opBtn.dataset.updateTo = +btn.dataset.updateTo + 2;
  }
  // console.log(cart.length);
  if (cart.length < 1) displayEmptyCartMsg();
});
displayEmptyCartMsg();
