import * as productRepo from "../repositories/product.repository.js";

export async function getProducts() {
  return productRepo.getAllProducts();
}

export async function getProductsWhere(WHERE) {
  if (!WHERE) {
    const error = new Error("Where condition not found.");
    error.statusCode = 404;
    throw error;
  }

  return productRepo.getProductsWhere(WHERE);
}

export async function getProduct(id) {
  const product = await productRepo.getProductById(id);

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  return product;
}

export async function addProduct(data) {
  return productRepo.createProduct(data);
}
