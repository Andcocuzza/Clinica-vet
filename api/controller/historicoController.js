const historicoService = require('../services/historicoService');

module.exports = {
  async getAll(req, res) {
    const result = await historicoService.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const item = await historicoService.getById(id);
    if (!item) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json(item);
  },

  async create(req, res) {
    try {
      const created = await historicoService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const updated = await historicoService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json(updated);
  },

  async remove(req, res) {
    const id = Number(req.params.id);
    const ok = await historicoService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.status(204).send();
  }
};