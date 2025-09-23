const servicosRepository = require('../repository/servicosRepository');

module.exports = {
  async getAll() {
    return servicosRepository.getAll();
  },

  async getById(id) {
    if (!Number.isFinite(id)) return null;
    return servicosRepository.getById(id);
  },

  async create(data) {
    if (!data || !data.descricao || data.valor === undefined) {
      throw new Error('Campos "descricao" e "valor" são obrigatórios');
    }
    return servicosRepository.create({
      descricao: data.descricao,
      valor: data.valor
    });
  },

  async update(id, data) {
    if (!Number.isFinite(id)) return null;
    return servicosRepository.update(id, data);
  },

  async remove(id) {
    if (!Number.isFinite(id)) return false;
    return servicosRepository.remove(id);
  }
};