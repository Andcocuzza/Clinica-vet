const animaisService = require('../services/animaisService');

module.exports = {
  async getAll(req, res) {
    const result = await animaisService.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const animal = await animaisService.getById(id);
    if (!animal) return res.status(404).json({ message: 'Animal não encontrado' });
    res.json(animal);
  },

  async create(req, res) {
    const data = req.body;
    const created = await animaisService.create(data);
    res.status(201).json(created);
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await animaisService.update(id, data);
    if (!updated) return res.status(404).json({ message: 'Animal não encontrado' });
    res.json(updated);
  },

  async remove(req, res) {
    const id = Number(req.params.id);
    const ok = await animaisService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Animal não encontrado' });
    res.status(204).send();
  }
};