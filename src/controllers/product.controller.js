import * as productServices from "../services/product.service.js";

export async function getProducts(req, res) {
  const products = await productServices.getProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
}

export async function getProductsWhere(req, res) {
  const WHERE = req?.body.WHERE;

  console.log("\n req \n", WHERE);

  const products = await productServices.getProductsWhere(WHERE);

  res.status(200).json({
    success: true,
    data: products,
  });
}

export async function getProductById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid Produc ID.",
    });
  }

  const products = await productServices.getProduct(id);

  res.status(200).json({
    success: true,
    data: products,
  });
}

export async function createProduct(req, res) {
  const product = await productServices.addProduct(req.validatedBody);

  res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
}
