const db = require('../config/db');

const RejectedRecord = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM rejected_records');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM rejected_records WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, data) => {
    // This allows updating any field in the rejected record to correct it
    const fields = Object.keys(data);
    const values = Object.values(data);
    const fieldPlaceholders = fields.map(field => `${field} = ?`).join(', ');

    if (fields.length === 0) {
        return false;
    }

    const sql = `UPDATE rejected_records SET ${fieldPlaceholders} WHERE id = ?`;
    values.push(id);

    const [result] = await db.query(sql, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM rejected_records WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = RejectedRecord;
