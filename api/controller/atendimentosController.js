const atendimentosService = require('../services/atendimentosService');

module.exports = {
  async getAll(req, res) {
    const result = await atendimentosService.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const item = await atendimentosService.getById(id);
    if (!item) return res.status(404).json({ message: 'Atendimento não encontrado' });
    res.json(item);
  },

  async create(req, res) {
    try {
      const created = await atendimentosService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const updated = await atendimentosService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Atendimento não encontrado' });
    res.json(updated);
  },

  async remove(req, res) {
    const id = Number(req.params.id);
    const ok = await atendimentosService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Atendimento não encontrado' });
    res.status(204).send();
  }
};