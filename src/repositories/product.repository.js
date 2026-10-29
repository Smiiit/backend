import { getPool, sql } from "../config/database.js";

export async function getAllProducts() {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT *
    FROM dbo.Products
    ORDER BY id DESC
  `);

  return result.recordset;
}

export async function getProductsWhere(WHERE) {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT *
    FROM dbo.Products 
    WHERE ${WHERE}
    ORDER BY id DESC
  `);

  return result.recordset;
}

export async function getProductById(id) {
  const pool = await getPool();

  const result = await pool.request().input("id", sql.Int, id).query(`
      SELECT *
      FROM dbo.Products
      WHERE id = @id
    `);

  return result.recordset[0] ?? null;
}

export async function createProduct(product) {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("product_name", sql.NVarChar(100), product.product_name)
    .input("product_desc", sql.NVarChar(255), product.product_desc).query(`
      INSERT INTO dbo.Products (product_name, product_desc)
      OUTPUT INSERTED.id, INSERTED.product_name, INSERTED.product_desc
      VALUES (@product_name, @product_desc)
    `);

  return result.recordset[0];
}
