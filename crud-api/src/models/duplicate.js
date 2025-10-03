const db = require('../config/db');

const Duplicate = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM duplicates WHERE resolved = false');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM duplicates WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, data) => {
    const { resolved } = data;
    const [result] = await db.query('UPDATE duplicates SET resolved = ? WHERE id = ?', [resolved, id]);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM duplicates WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Duplicate;
