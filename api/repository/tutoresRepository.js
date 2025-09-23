const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `
      SELECT id, nome, telefone, email
      FROM tutores
      ORDER BY id DESC
    `;
    return await query(sql);
  },

  async getById(id) {
    const sql = `
      SELECT id, nome, telefone, email
      FROM tutores
      WHERE id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const sql = `
      INSERT INTO tutores (nome, telefone, email)
      VALUES (?, ?, ?)
    `;
    const params = [
      data.nome,
      data.telefone || null,
      data.email || null
    ];
    const result = await query(sql, params);
    return await this.getById(result.insertId);
  },

  async update(id, data) {
    const fields = [];
    const params = [];

    if (data.nome !== undefined) { fields.push('nome = ?'); params.push(data.nome); }
    if (data.telefone !== undefined) { fields.push('telefone = ?'); params.push(data.telefone); }
    if (data.email !== undefined) { fields.push('email = ?'); params.push(data.email); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `
      UPDATE tutores
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM tutores WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};