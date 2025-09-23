const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `
      SELECT a.id, a.tipo, a.data_atendimento, a.descricao,
             ani.nome AS animal_nome, t.nome AS tutor_nome, ani.id AS animal_id
      FROM atendimentos a
      JOIN animais ani ON a.animal_id = ani.id
      JOIN tutores t ON ani.tutor_id = t.id
      ORDER BY a.data_atendimento DESC
    `;
    return await query(sql);
  },

  async getById(id) {
    const sql = `
      SELECT a.id, a.tipo, a.data_atendimento, a.descricao,
             ani.nome AS animal_nome, t.nome AS tutor_nome, ani.id AS animal_id
      FROM atendimentos a
      JOIN animais ani ON a.animal_id = ani.id
      JOIN tutores t ON ani.tutor_id = t.id
      WHERE a.id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create({ animal_id, data_atendimento, tipo, descricao }) {
    const sql = `
      INSERT INTO atendimentos (animal_id, data_atendimento, tipo, descricao)
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(sql, [animal_id, data_atendimento, tipo, descricao]);
    return await this.getById(result.insertId);
  },

  async update(id, { animal_id, data_atendimento, tipo, descricao }) {
    const fields = [];
    const params = [];

    if (animal_id !== undefined) { fields.push('animal_id = ?'); params.push(animal_id); }
    if (data_atendimento !== undefined) { fields.push('data_atendimento = ?'); params.push(data_atendimento); }
    if (tipo !== undefined) { fields.push('tipo = ?'); params.push(tipo); }
    if (descricao !== undefined) { fields.push('descricao = ?'); params.push(descricao); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `
      UPDATE atendimentos
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM atendimentos WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};