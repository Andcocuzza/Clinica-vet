const examesRepository = require('../repository/examesRepository');

module.exports = {
  async getAll() {
    return examesRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return examesRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.atendimento_id || !data.tipo_exame) {
      throw new Error('Campos "atendimento_id" e "tipo_exame" são obrigatórios');
    }
    return examesRepository.create({
      atendimento_id: data.atendimento_id,
      tipo_exame: data.tipo_exame,
      resultado: data.resultado ?? null
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return examesRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return examesRepository.remove(id);
  }
};