const mysql = require('mysql2/promise');
const stringSimilarity = require('string-similarity');

async function deduplicate(cleanedProducts) {
  if (cleanedProducts.length === 0) {
    console.log('No products to deduplicate.');
    return;
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2002',
      database: 'master_data_db',
    });
    console.log('Deduplication: Connected to the database.');

    // 1. Get the newly inserted products with their IDs
    const productCodes = cleanedProducts.map(p => p.product_code);
    console.log(`Deduplication: Searching for ${productCodes.length} products in the database.`); // <-- ADDED LOG

    const [newProducts] = await connection.execute(
      'SELECT id, product_code, product_name FROM products WHERE product_code IN (?)',
      [productCodes]
    );

    console.log(`Deduplication: Found ${newProducts.length} products in the database.`); // <-- ADDED LOG

    if (newProducts.length < 2) {
        console.log('Not enough new products to compare for duplicates.');
        return;
    }

    // 2. Compare products against each other
    const duplicatesToInsert = [];
    for (let i = 0; i < newProducts.length; i++) {
      for (let j = i + 1; j < newProducts.length; j++) {
        const product1 = newProducts[i];
        const product2 = newProducts[j];

        const nameSimilarity = stringSimilarity.compareTwoStrings(
          product1.product_name,
          product2.product_name
        );

        if (nameSimilarity > 0.9) {
          duplicatesToInsert.push([
            product1.id,
            product2.id,
            nameSimilarity,
            'Name similarity'
          ]);
        }
      }
    }

    // 3. Insert identified duplicates
    if (duplicatesToInsert.length > 0) {
      await connection.query(
        'INSERT INTO duplicates (product_id_1, product_id_2, similarity_score, reason) VALUES ?',
        [duplicatesToInsert]
      );
      console.log(`Found and loaded ${duplicatesToInsert.length} potential duplicates.`);
    } else {
      console.log('No new duplicates found.');
    }

  } catch (error) {
    console.error('Error during deduplication process:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Deduplication: Database connection closed.');
    }
  }
}

module.exports = deduplicate;