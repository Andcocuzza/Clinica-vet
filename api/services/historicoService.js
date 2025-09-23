const historicoRepository = require('../repository/historicoRepository');

module.exports = {
  async getAll() {
    return historicoRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return historicoRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.animal_id || !data.servico_id) {
      throw new Error('Campos "animal_id" e "servico_id" são obrigatórios');
    }
    return historicoRepository.create({
      animal_id: data.animal_id,
      servico_id: data.servico_id,
      data_servico: data.data_servico ?? null
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return historicoRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return historicoRepository.remove(id);
  }
};