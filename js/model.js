const state = {
  menuItems: [
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
  ],
  amount: [],
  cost: {
    subtotal: 0,
    tax: 0,
    total: 0,
  },
};

export const findRecipe = function (recipeName) {
  const recipe = state.menuItems.find((item) => item.name === recipeName);
  const index = state.menuItems.indexOf(recipe);
  state.menuItems[index].inCart = true;
  return recipe;
};
export const checkEmptyCart = function () {
  const isCartEmpty =
    state.menuItems.filter((item) => item.count < 1).length ===
    state.menuItems.length;
  return isCartEmpty;
};
export const calcTotal = function (subTotal) {
  state.amount.push(subTotal);
  state.cost.subtotal = state.amount.reduce((sum, el) => sum + el, 0);
  state.cost.tax = state.cost.subtotal * (2 / 100);
  state.cost.total = +(state.cost.tax + state.cost.subtotal).toFixed(2);
  console.log(state.amount);
  // console.log(state.cost.total);
};
export const updateServings = function (newCount, itemName) {
  const item = state.menuItems.find((item) => item.name === itemName);
  item.count = newCount;
};
