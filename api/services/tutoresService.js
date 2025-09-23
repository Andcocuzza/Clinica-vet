const tutoresRepository = require('../repository/tutoresRepository');

module.exports = {
  async getAll() {
    return tutoresRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return tutoresRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.nome) {
      throw new Error('Campo "nome" é obrigatório');
    }
    return tutoresRepository.create({
      nome: data.nome,
      telefone: data.telefone || null,
      email: data.email || null
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return tutoresRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return tutoresRepository.remove(id);
  }
};