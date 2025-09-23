const animaisRepository = require('../repository/animaisRepository');

module.exports = {
  async getAll() {
    return animaisRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return animaisRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.nome) {
      throw new Error('Campo "nome" é obrigatório');
    }
    return animaisRepository.create({
      nome: data.nome,
      especie: data.especie || null,
      raca: data.raca || null,
      idade: data.idade || null,
      tutorId: data.tutorId || null
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return animaisRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return animaisRepository.remove(id);
  }
};