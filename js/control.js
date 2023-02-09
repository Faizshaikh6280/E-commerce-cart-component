import * as model from "./model.js";
import recipeView from "./view.js";

const controlRecipe = function (recipeName) {
  // Rendring Selected Recipe;
  recipeView.render(model.findRecipe(recipeName));
  // getting subTotal from UI
  // model.calcTotal(recipeView.getSubTotal());
};
const controlServings = function (newCount, itemName) {
  // 1. update serings in the state
  model.updateServings(newCount, itemName);
  // 2. updating item
  recipeView.render(model.findRecipe(itemName), true);
};
// Publish Subscriber Pattern
const init = function () {
  recipeView.addHandleRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();

// ["load"].forEach((ev) =>
//   document.addEventListener(
//     ev,
//     recipeView.renderEmptyCartMsg(model.checkEmptyCart())
//   )
// );
