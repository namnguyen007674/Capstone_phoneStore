

let isSubmitted = false

// Lấy tất cả product từ API mới nhất
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

function addProduct() {
  isSubmitted = true
  const product = validate();
  if (!product) {
    return;
  }

  apiPostProduct(product)
    .then((response) => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      // $("#exampleModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
  
  resetModal()
}

function deleteProduct(productId) {
  apiDeleteProductById(productId)
    .then((response) => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function seclectProduct(productId) {
  resetModal()
  //Hiển thị modal
  document.querySelector(".modal-footer").innerHTML = `
  <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button class="btn btn-success" onclick="updateProduct('${productId}')">Update</button>
  `;
  apiGetProductById(productId)
    .then((response) => {
      const product = response.data;

      document.getElementById("phone-name").value = product.name;
      document.getElementById("price").value = product.price;
      document.getElementById("screen").value = product.screen;
      document.getElementById("front-cam").value = product.frontCamera;
      document.getElementById("back-cam").value = product.backCamera;
      document.getElementById("img-link").value = product.image;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(productId) {

  isSubmitted = true
  const product = validate();
  if (!product) {
    return;
  }
  apiPutProduct(productId, product)
    .then((response) => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  
  resetModal()
}

function resetModal() {
  isSubmitted = false
  document.getElementById("phone-name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("front-cam").value = "";
  document.getElementById("back-cam").value = "";
  document.getElementById("img-link").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";

  document.getElementById("spanName").innerHTML = "";
  document.getElementById("spanPrice").innerHTML = "";
  document.getElementById("spanScreen").innerHTML = "";
  document.getElementById("spanFont").innerHTML = "";
  document.getElementById("spanBack").innerHTML = "";
  document.getElementById("spanImg").innerHTML = "";
  document.getElementById("spanDes").innerHTML = "";
  document.getElementById("spanBrand").innerHTML = "";
}

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

    return (
      result +
      `<tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}$</td>
        <td><img src="${product.image}" height="100px" width="100px" /></td>
        <td>${product.description}</td>
        <td>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="seclectProduct('${
            product.id
          }')" class="btn btn-success">Xem</button>
          <button onclick="deleteProduct('${
            product.id
          }')" class = "btn btn-warning">Xoá</button>
        </td>
      </tr>`
    );
  }, "");

  document.getElementById("tableDanhSach").innerHTML = html;
}

// Kiểm tra thông tin
function validate() {
  const name = document.getElementById("phone-name").value;
  const price = document.getElementById("price").value;
  const screen = document.getElementById("screen").value;
  const frontCamera = document.getElementById("front-cam").value;
  const backCamera = document.getElementById("back-cam").value;
  const image = document.getElementById("img-link").value;
  const description = document.getElementById("description").value;
  const type = document.getElementById("brand").value;

  const product = {
    name,
    price: +price,
    screen,
    frontCamera,
    backCamera,
    image,
    description,
    type,
  };

  let isValid = true;

  const spanName = document.getElementById("spanName");
  if (!isRequired(name)) {
    //Chuỗi rỗng
    isValid = false;
    spanName.innerHTML = `(*)This field can't be empty`;
  }

  const spanPrice = document.getElementById("spanPrice");
  if (!isRequired(price)) {
    //Chuỗi rỗng
    isValid = false;
    spanPrice.innerHTML = ` (*)This field can't be empty`;
  } else if (!isNum(+price)) {
    isValid = false;
    spanPrice.innerHTML = `(*)This field must be numbers`;
  }

  let spanScreen = document.getElementById("spanScreen");
  if (!isRequired(screen)) {
    isValid = false;
    spanScreen.innerHTML = `(*)This field can't be empty`;
  }

  let spanFont = document.getElementById("spanFont");
  if (!isRequired(frontCamera)) {
    isValid = false;
    spanFont.innerHTML = `(*)This field can't be empty`;
  }

  let spanBack = document.getElementById("spanBack");
  if (!isRequired(backCamera)) {
    isValid = false;
    spanBack.innerHTML = `(*)This field can't be empty`;
  }
  let spanImg = document.getElementById("spanImg");
  if (!isRequired(image)) {
    isValid = false;
    spanImg.innerHTML = ` (*)This field can't be empty`;
  }

  let spanDes = document.getElementById("spanDes");
  if (!isRequired(description)) {
    isValid = false;
    spanDes.innerHTML = `(*)This field can't be empty`;
  }

  let spanBrand = document.getElementById("spanBrand");

  if (!isRequired(type)) {
    isValid = false;
    spanBrand.innerHTML = ` (*)This field can't be empty`;
  }

  if (isValid) {
    return product;
  }
  return undefined;
}


//Kiểm tra chuỗi rỗng
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

// Kiểm tra không được là số
function isNum(value) {
  if (isNaN(value)) {
    return false;
  }
  return true;
}

//===========DOM============
// Tạo button
document.getElementById("btnAddCard").onclick = () => {
  resetModal();
  document.querySelector(".modal-footer").innerHTML = `
  <button
  class="btn btn-secondary"
  data-bs-dismiss="modal"
>
  Close
</button>
<button id="btn-add" onclick="addProduct()" class="btn btn-primary">Add Phone</button>
  `;
};

document.getElementById("search-input").onkeydown = (event) => {
  if (event.key !== "Enter") {
    return;
  }

  apiGetProducts(event.target.value)
    .then((response) => {
      display(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
};

//Active a
const a = document.querySelectorAll(".myCanvas a");
a.forEach((itemA) => {
  itemA.addEventListener("click", () => {
    document.querySelector(".myCanvas .active").classList.remove("active");
    itemA.classList.add("active");
  });
});

document.getElementById("btn-closeCanvas").onclick = function () {
  const aElements = document.querySelectorAll(".myCanvas a");
  aElements.forEach((itemA) => {
    itemA.classList.remove("active");
  });
  const aActive = document.getElementById("a-home");
  aActive.classList.add("active");
};


// Sự kiện oniput
document.getElementById("phone-name").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanName").innerHTML = ""
}else {
  document.getElementById("spanName").innerHTML = ` (*)This field can't be empty`
}
}

document.getElementById("price").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanPrice").innerHTML = ""
}else {
  document.getElementById("spanPrice").innerHTML = ` (*)This field can't be empty`
}
}
document.getElementById("screen").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanScreen").innerHTML = ""
}else {
  document.getElementById("spanScreen").innerHTML = ` (*)This field can't be empty`
}
}

document.getElementById("front-cam").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanFont").innerHTML = ""
}else {
  document.getElementById("spanFont").innerHTML = ` (*)This field can't be empty`
}
}

document.getElementById("back-cam").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanBack").innerHTML = ""
}else {
  document.getElementById("spanBack").innerHTML = ` (*)This field can't be empty`
}
}

document.getElementById("img-link").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanImg").innerHTML = ""
}else {
  document.getElementById("spanImg").innerHTML = ` (*)This field can't be empty`
}
}

document.getElementById("description").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanDes").innerHTML = ""
}else {
  document.getElementById("spanDes").innerHTML = ` (*)This field can't be empty`
}
}

document.getElementById("brand").oninput = (event) => {
  if(!isSubmitted){
    return
  }
if(isRequired(event.target.value)){
  document.getElementById("spanBrand").innerHTML = ""
}else {
  document.getElementById("spanBrand").innerHTML = ` (*)This field can't be empty`
}
}
