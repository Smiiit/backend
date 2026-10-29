import { getPool } from "./database.js";

try {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT
      DB_NAME() AS databaseName,
      GETDATE() AS serverTime
  `);

  console.log("Database connection successful.");
  console.log(result.recordset);
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exitCode = 1;
}
