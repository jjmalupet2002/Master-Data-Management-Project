const db = require('../config/db');

const Product = {
  async create(product) {
    const [result] = await db.execute(
      'INSERT INTO products (product_code, product_name, price, quantity, category, supplier_name, source) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [product.product_code, product.product_name, product.price, product.quantity, product.category, product.supplier_name, product.source]
    );
    return { id: result.insertId, ...product };
  },

  async findAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, product) {
    const [result] = await db.execute(
      'UPDATE products SET product_code = ?, product_name = ?, price = ?, quantity = ?, category = ?, supplier_name = ?, source = ? WHERE id = ?',
      [product.product_code, product.product_name, product.price, product.quantity, product.category, product.supplier_name, product.source, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Product;