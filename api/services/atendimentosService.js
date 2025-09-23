const atendimentosRepository = require('../repository/atendimentosRepository');

module.exports = {
  async getAll() {
    return atendimentosRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return atendimentosRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.animal_id || !data.tipo || !data.data_atendimento) {
      throw new Error('Campos "animal_id", "tipo" e "data_atendimento" são obrigatórios');
    }
    return atendimentosRepository.create({
      animal_id: data.animal_id,
      data_atendimento: data.data_atendimento,
      tipo: data.tipo,
      descricao: data.descricao || null
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return atendimentosRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return atendimentosRepository.remove(id);
  }
};