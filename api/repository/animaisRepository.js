const { query } = require('../db');

module.exports = {
  async getAll() {
    const sql = `
      SELECT a.id, a.nome, a.especie, a.raca, a.idade, a.tutor_id AS tutorId,
             t.nome AS tutor_nome
      FROM animais a
      LEFT JOIN tutores t ON a.tutor_id = t.id
      ORDER BY a.id DESC
    `;
    return await query(sql);
  },
  
  async getById(id) {
    const sql = `
      SELECT a.id, a.nome, a.especie, a.raca, a.idade, a.tutor_id AS tutorId,
             t.nome AS tutor_nome
      FROM animais a
      LEFT JOIN tutores t ON a.tutor_id = t.id
      WHERE a.id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async create(data) {
    if (!data || !data.nome || !data.especie || !data.raca || data.idade === undefined || data.tutorId === undefined) {
      throw new Error('Campos "nome", "especie", "raca", "idade" e "tutor_id" são obrigatórios');
    }

    const sql = `
      INSERT INTO animais (nome, especie, raca, idade, tutor_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [data.nome, data.especie, data.raca, data.idade, data.tutorId];

    const result = await query(sql, params);

    return await this.getById(result.insertId);
  },

  async update(id, data) {
    const fields = [];
    const params = [];

    if (data.nome !== undefined) { fields.push('nome = ?'); params.push(data.nome); }
    if (data.especie !== undefined) { fields.push('especie = ?'); params.push(data.especie); }
    if (data.raca !== undefined) { fields.push('raca = ?'); params.push(data.raca); }
    if (data.idade !== undefined) { fields.push('idade = ?'); params.push(data.idade); }
    if (data.sexo !== undefined) { fields.push('sexo = ?'); params.push(data.sexo); }
    if (data.tutorId !== undefined) { fields.push('tutor_id = ?'); params.push(data.tutorId); }

    if (fields.length === 0) return await this.getById(id);

    const sql = `
      UPDATE animais
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(id);

    const result = await query(sql, params);
    if (result.affectedRows === 0) return null;
    return await this.getById(id);
  },

  async remove(id) {
    const sql = `DELETE FROM animais WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
};