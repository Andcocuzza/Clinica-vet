const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `SELECT id, descricao, valor FROM servicos ORDER BY id DESC`;
    return await query(sql);
  },

  async getById(id) {
    const sql = `SELECT id, descricao, valor FROM servicos WHERE id = ? LIMIT 1`;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create({ descricao, valor }) {
    const sql = `INSERT INTO servicos (descricao, valor) VALUES (?, ?)`;
    const result = await query(sql, [descricao, valor]);
    return await this.getById(result.insertId);
  },

  async update(id, { descricao, valor }) {
    const fields = [];
    const params = [];

    if (descricao !== undefined) { fields.push('descricao = ?'); params.push(descricao); }
    if (valor !== undefined) { fields.push('valor = ?'); params.push(valor); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `UPDATE servicos SET ${fields.join(', ')} WHERE id = ?`;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM servicos WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};