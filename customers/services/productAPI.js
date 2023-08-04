function apiGetProducts(searchValue) {
  return axios({
    url: "https://64bc07b67b33a35a4446f2ec.mockapi.io/products",
    method: "GET",
    params: {
      type: searchValue || undefined,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64bc07b67b33a35a4446f2ec.mockapi.io/products/${productId}`,
    method: "GET",
  });
}




function apiPostProduct(product) {
  return axios({
    url: "https://64bc07b67b33a35a4446f2ec.mockapi.io/products",
    method: "POST",
    data: product,
  });
}

function apiPutProduct(productId, newProduct) {
  return axios({
    url: `https://64bc07b67b33a35a4446f2ec.mockapi.io/products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProductById(productId) {
  return axios({
    url: `https://64bc07b67b33a35a4446f2ec.mockapi.io/products/${productId}`,
    method: "DELETE",
  });
}
