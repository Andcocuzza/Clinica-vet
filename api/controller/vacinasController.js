const vacinasService = require('../services/vacinasService');

module.exports = {
  async getAll(req, res) {
    const result = await vacinasService.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const item = await vacinasService.getById(id);
    if (!item) return res.status(404).json({ message: 'Vacina não encontrada' });
    res.json(item);
  },

  async create(req, res) {
    try {
      const created = await vacinasService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const updated = await vacinasService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Vacina não encontrada' });
    res.json(updated);
  },

  async remove(req, res) {
    const id = Number(req.params.id);
    const ok = await vacinasService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Vacina não encontrada' });
    res.status(204).send();
  }
};