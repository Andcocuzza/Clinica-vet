const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `
      SELECT
        h.id,
        h.animal_id,
        h.servico_id,
        h.data_servico,
        a.nome AS animal_nome,
        s.descricao AS servico_descricao
      FROM historico h
      LEFT JOIN animais a ON h.animal_id = a.id
      LEFT JOIN servicos s ON h.servico_id = s.id
      ORDER BY h.id DESC
    `;
    return await query(sql);
  },

  async getById(id) {
    const sql = `
      SELECT
        h.id,
        h.animal_id,
        h.servico_id,
        h.data_servico,
        a.nome AS animal_nome,
        s.descricao AS servico_descricao
      FROM historico h
      LEFT JOIN animais a ON h.animal_id = a.id
      LEFT JOIN servicos s ON h.servico_id = s.id
      WHERE h.id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create({ animal_id, servico_id, data_servico }) {
    const sql = `
      INSERT INTO historico (animal_id, servico_id, data_servico)
      VALUES (?, ?, ?)
    `;
    const result = await query(sql, [animal_id, servico_id, data_servico ?? new Date()]);
    return await this.getById(result.insertId);
  },

  async update(id, { animal_id, servico_id, data_servico }) {
    const fields = [];
    const params = [];

    if (animal_id !== undefined) { fields.push('animal_id = ?'); params.push(animal_id); }
    if (servico_id !== undefined) { fields.push('servico_id = ?'); params.push(servico_id); }
    if (data_servico !== undefined) { fields.push('data_servico = ?'); params.push(data_servico); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `
      UPDATE historico
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM historico WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};