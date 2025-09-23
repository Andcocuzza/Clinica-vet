const vacinasRepository = require('../repository/vacinasRepository');

module.exports = {
  async getAll() {
    return vacinasRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return vacinasRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.atendimento_id || !data.nome_vacina) {
      throw new Error('Campos "atendimento_id" e "nome_vacina" são obrigatórios');
    }
    return vacinasRepository.create({
      atendimento_id: data.atendimento_id,
      nome_vacina: data.nome_vacina,
      proxima_dose: data.proxima_dose ?? null
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return vacinasRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return vacinasRepository.remove(id);
  }
};