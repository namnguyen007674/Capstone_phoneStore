getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
const productList = []
// Display Product
function display(products) {
  const html = products.reduce((result, value, index) => {
    const product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.frontCamera,
      value.backCamera,
      value.image,
      value.description,
      value.type
    );
    productList.push(product)
    return (
      result +
      `
      <div class="col-xl-3 col-sm-12 col-md-6 col-lg-4">
            <div class="product__item">
              <div class="card">
                <div class="card__image w-50 mx-auto pt-3">
                <img id="product-image" src="${product.image}" class="card-img-top" alt="..." />
                </div>
                <div class="card__body">
                  <div class="card__text">
                    <h5 id="product-name" class="card__title text-center">${product.name}</h5>
                    <h2 id="product-price" class="fs-4 card__price">
                      <span>$</span>
                      <span id="number__price">${product.price}</span>
                    </h2>
                    <span class="card__type">${product.type}</span>
                    <p class="card__desc mt-3">
                      Description:
                      <span class="span__detail">${product.description}</span>
                    </p>
                  </div>
                  <div class="card__icon d-flex justify-content-between">
                    <div class="card__star">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <p>In stock</p>
                  </div>
                  <div class="card__btn">
                    <a onclick="addCartItem('${product.id}')" class="btn btn-primary">
                      <i class="fa-solid fa-cart-shopping"></i>
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `
    );
  }, "");

  document.getElementById("product__list").innerHTML = html;
}




function selectProduct() {
  const mySelect = document.getElementById("mySelect").value;

  apiGetProducts(mySelect)
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}