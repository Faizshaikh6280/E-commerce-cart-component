class RecipeView {
  _parentElement = document.querySelector(".cart-summary");
  _menu = document.querySelector("ul.menu");
  _data;
  _btn;
  _emptyMsg = "Your cart is empty. Add food to your cart ";
  render(data, update = false) {
    // if (this._data.inCart) return;
    this._data = data;
    const markup = this._generateMarkup();
    if (!this._btn.classList.contains("in-cart") || update) {
      // this._parentElement.textContent = "";
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    } else {
      alert("Already in Your Cart. Please check Your Cart !");
    }
    if (!update) this._changeButton();
  }
  getSubTotal() {
    return (this._data.price / 100) * this._data.count;
  }

  _changeButton(change = true) {
    if (this._data.inCart) {
      if (change) this._btn.classList.add("in-cart");
      else {
        console.log(this._btn);
        this._btn.classList.remove("in-cart");
        this._data.inCart = false;
      }
      this._btn.innerHTML = "";
      const markup = change
        ? ` <img src="images/check.svg" alt="Check" />
      In Cart`
        : "Add to Cart";
      this._btn.insertAdjacentHTML("afterbegin", markup);
    }
  }

  renderEmptyCartMsg(isEmpty, emptyMsg = this._emptyMsg) {
    if (isEmpty) {
      const markup = `
    <div class="errMsg">
          <p>${emptyMsg}😋</p>
        </div>`;
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".btn--update-servings");
        if (!btn) return;
        const { updateTo } = btn.dataset;
        const item = e.target
          .closest("li")
          .querySelector(".content")
          .querySelector(".menu-item").textContent;
        e.target.closest("li").remove();
        if (+updateTo >= 0) handler(+updateTo, item);
        if (+updateTo < 0) this._changeButton(false);
      }.bind(this)
    );
  }

  addHandleRender(handler) {
    this._menu.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains("add")) {
          const item = e.target.parentNode.querySelector(".menu-item");
          this._btn = e.target.parentNode.querySelector(".add");
          handler(item.textContent);
          // handler(handler,subtotal);
        }
      }.bind(this)
    );
  }
  //   _clear(){
  //     this._parentElement.textContent = '';
  //   }
  _generateMarkup() {
    return `
        <li>
        <div class="plate">
          <img
            src="images/${this._data.image}"
            alt="${this._data.alt}"
            class="plate"
          />
          <div class="quantity">${this._data.count}</div>
        </div>
        <div class="content">
          <p class="menu-item">${this._data.name}</p>
          <p class="price">$${this._data.price / 100}</p>
        </div>
        <div class="quantity__wrapper">
          <button class="decrease btn--update-servings" data-update-to ="${
            this._data.count - 1
          }">
            <img src="images/chevron.svg" />
          </button>
          <div class="quantity ">${this._data.count}</div>
          <button class="increase btn--update-servings" data-update-to ="${
            this._data.count + 1
          }">
            <img src="images/chevron.svg" />
          </button>
        </div>  
        <div class="subtotal">$${(
          (this._data.price / 100) *
          this._data.count
        ).toFixed(2)}</div>
      </li>
   `;
  }
}
export default new RecipeView();
