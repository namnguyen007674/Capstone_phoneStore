// Shopping Cart
let cart = [];

// Add CartItem
function addCartItem(itemId) {
  const search = cart.find((value) => value.id === itemId);
  const searchProduct = productList.find((value) => value.id === itemId);
  if (search === undefined) {
    const cartItem = {
      id: itemId,
      name: searchProduct.name,
      price:searchProduct.price,
      image:searchProduct.image,
      quantity: 1,
    };
    cart.push(cartItem);
  } else {
    search.quantity += 1;
  }
  // Count Item
  countCartItem(cart);
  // Display Item
  // totalAmount(cart);
  displayCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Count Item
function countCartItem(cart) {
  const count = cart.reduce((result, value) => {
    return result + value.quantity;
  }, 0);
  document.getElementById("cartAmount").innerHTML = count;
}
init();
// Get ItemInLocal
function init() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((value) => {
    const cartItem = {
      id: value.id,
      name: value.name,
      price: +value.price,
      image: value.image,
      quantity: 1,
    };
    return cartItem;
  });

  // Display Item
  displayCart(cart);
  // Count Item
  countCartItem(cart);
}

function displayCart(product) {
  const html = product.reduce((result, value) => {
    let search = product.find((x) => x.id === value.id) || [];
    return (
      result +
      `
        <div id="cart__item" class="cart__item d-flex">
          <div class="cart__img w-25">
            <img class="w-100" src="${value.image}" alt="" />
          </div>
          <div class="cart__desc pb-3">
            <h5 class="fs-6 mb-3">${value.name}</h5>
            <div class="button__card d-flex fs-5 align-items-center">
                <i class="fa-solid fa-minus" onclick="decrement('${
                  value.id
                }')"></i>
                <div id="${value.id}" class="quatity px-3">${
        search.quantity === undefined ? 0 : search.quantity
      }</div>
                <i class="fa-solid fa-plus" onclick="increment('${
                  value.id
                }')"></i>
            </div>
            <div class="product__price fw-bold fs-5">$${
              value.price * search.quantity
            }</div>
            <a class="removeItem" onclick="removeCartItem('${
              value.id
            }')" class="text-danger">Remove</a>
          </div>
        </div>
        `
    );
  }, "");
  totalAmount(cart);
  document.getElementById("cart__content").innerHTML = html;
  if (cart.length === 0) {
    resetPrice();
  }
}
// Tăng CartItem
function increment(id) {
  let search = cart.find((value) => value.id === id);
  if (search.id === id) {
    search.quantity += 1;
  }
  update(id);
  // totalAmount(cart);
  displayCart(cart);
  countCartItem(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Giảm CartItem
function decrement(id) {
  let search = cart.find((value) => value.id === id);
  if (search === undefined) return;
  if (search.quantity === 0) return;
  if (search.id === id) {
    search.quantity -= 1;
  }
  update(id);
  deleteCartItem(cart);
  countCartItem(cart);
  // totalAmount(cart);
  displayCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Delete CartItem If quantity === 0
function deleteCartItem(carts) {
  cart = cart.filter((value) => value.quantity !== 0);
}

// Update Item
function update(id) {
  let search = cart.find((value) => value.id === id);
  document.getElementById(id).innerHTML = +search.quantity;
  // totalAmount(cart);
}

// Remove CartItem
function removeCartItem(id) {
  cart = cart.filter((value) => value.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  // totalAmount(cart);
  displayCart(cart);
  countCartItem(cart);
}

function totalAmount(cart) {
  if (cart.length !== 0) {
    let amount = cart.reduce((result, value) => {
      let search = cart.find((x) => x.id === value.id) || [];
      return result + search.quantity * search.price;
    }, 0);
    document.getElementById("subtotal").innerHTML = `$${amount}`;
    document.getElementById("total__price").innerHTML = `$${amount}`;
  } else return;
}

// reresetPrice()
function resetPrice() {
  document.getElementById("subtotal").innerHTML = `$0`;
  document.getElementById("total__price").innerHTML = `$0`;
}

// Clear cart

function clearCart() {
  cart = [];
  displayCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
