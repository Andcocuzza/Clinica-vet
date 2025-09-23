const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `
      SELECT
        e.id,
        e.atendimento_id,
        e.tipo_exame,
        e.resultado,
        a.data_atendimento,
        ani.nome AS animal_nome
      FROM exames e
      LEFT JOIN atendimentos a ON e.atendimento_id = a.id
      LEFT JOIN animais ani ON a.animal_id = ani.id
      ORDER BY e.id DESC
    `;
    return await query(sql);
  },

  async getById(id) {
    const sql = `
      SELECT
        e.id,
        e.atendimento_id,
        e.tipo_exame,
        e.resultado,
        a.data_atendimento,
        ani.nome AS animal_nome
      FROM exames e
      LEFT JOIN atendimentos a ON e.atendimento_id = a.id
      LEFT JOIN animais ani ON a.animal_id = ani.id
      WHERE e.id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create({ atendimento_id, tipo_exame, resultado }) {
    const sql = `
      INSERT INTO exames (atendimento_id, tipo_exame, resultado)
      VALUES (?, ?, ?)
    `;
    const result = await query(sql, [atendimento_id, tipo_exame, resultado ?? null]);
    return await this.getById(result.insertId);
  },

  async update(id, { atendimento_id, tipo_exame, resultado }) {
    const fields = [];
    const params = [];

    if (atendimento_id !== undefined) { fields.push('atendimento_id = ?'); params.push(atendimento_id); }
    if (tipo_exame !== undefined) { fields.push('tipo_exame = ?'); params.push(tipo_exame); }
    if (resultado !== undefined) { fields.push('resultado = ?'); params.push(resultado); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `
      UPDATE exames
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM exames WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};