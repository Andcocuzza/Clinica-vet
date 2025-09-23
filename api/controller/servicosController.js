const servicosService = require('../services/servicosService');

module.exports = {
  async getAll(req, res) {
    const result = await servicosService.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const item = await servicosService.getById(id);
    if (!item) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(item);
  },

  async create(req, res) {
    try {
      const created = await servicosService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const updated = await servicosService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(updated);
  },

  async remove(req, res) {
    const id = Number(req.params.id);
    const ok = await servicosService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.status(204).send();
  }
};