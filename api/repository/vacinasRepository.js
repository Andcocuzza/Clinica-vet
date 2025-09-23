const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `
      SELECT
        v.id,
        v.atendimento_id,
        v.nome_vacina,
        v.proxima_dose,
        a.data_atendimento,
        ani.nome AS animal_nome
      FROM vacinas v
      LEFT JOIN atendimentos a ON v.atendimento_id = a.id
      LEFT JOIN animais ani ON a.animal_id = ani.id
      ORDER BY v.id DESC
    `;
    return await query(sql);
  },

  async getById(id) {
    const sql = `
      SELECT
        v.id,
        v.atendimento_id,
        v.nome_vacina,
        v.proxima_dose,
        a.data_atendimento,
        ani.nome AS animal_nome
      FROM vacinas v
      LEFT JOIN atendimentos a ON v.atendimento_id = a.id
      LEFT JOIN animais ani ON a.animal_id = ani.id
      WHERE v.id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create({ atendimento_id, nome_vacina, proxima_dose }) {
    const sql = `
      INSERT INTO vacinas (atendimento_id, nome_vacina, proxima_dose)
      VALUES (?, ?, ?)
    `;
    const result = await query(sql, [atendimento_id, nome_vacina, proxima_dose ?? null]);
    return await this.getById(result.insertId);
  },

  async update(id, { atendimento_id, nome_vacina, proxima_dose }) {
    const fields = [];
    const params = [];

    if (atendimento_id !== undefined) { fields.push('atendimento_id = ?'); params.push(atendimento_id); }
    if (nome_vacina !== undefined) { fields.push('nome_vacina = ?'); params.push(nome_vacina); }
    if (proxima_dose !== undefined) { fields.push('proxima_dose = ?'); params.push(proxima_dose); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `
      UPDATE vacinas
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM vacinas WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};