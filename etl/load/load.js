const mysql = require('mysql2/promise');

async function load({ cleaned, rejected }) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2002',
      database: 'master_data_db',
    });

    console.log('Connected to the database.');
    await connection.beginTransaction();
    console.log('Database transaction started.');

    // 1. Load rejected records
    if (rejected.length > 0) {
      const rejectedValues = rejected.map(record => [
        record.ProductID || null,
        record.ProductName || null,
        record.Price || null,
        record.Quantity || null,
        record.Category || null,
        record.supplier_name || null,
        record.source || null,
        record.reason || null
      ]);
      await connection.query(
        'INSERT INTO rejected_records (product_code, product_name, price, quantity, category, supplier_name, source, reason) VALUES ?',
        [rejectedValues]
      );
      console.log(`Loaded ${rejected.length} records into the 'rejected_records' table.`);
    }

    // 2. Load cleaned products
    if (cleaned.length > 0) {
      const cleanedValues = cleaned.map(product => [
        product.product_code,
        product.product_name,
        product.price,
        product.quantity,
        product.category,
        product.supplier_name || null,
        product.source
      ]);
      await connection.query(
        'INSERT INTO products (product_code, product_name, price, quantity, category, supplier_name, source) VALUES ?',
        [cleanedValues]
      );
      console.log(`Loaded ${cleaned.length} products into the 'products' table.`);
    }

    await connection.commit();
    console.log('Database transaction committed successfully.');

  } catch (error) {
    if (connection) {
      await connection.rollback();
      console.error('Database transaction rolled back due to an error.');
    }
    console.error('Error loading data into the database:', error);
    // Re-throw the error to notify the runner that the process failed
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

module.exports = load;