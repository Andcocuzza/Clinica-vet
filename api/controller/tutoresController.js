const tutoresService = require('../services/tutoresService');

module.exports = {
  async getAll(req, res) {
    const result = await tutoresService.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const tutor = await tutoresService.getById(id);
    if (!tutor) return res.status(404).json({ message: 'Tutor não encontrado' });
    res.json(tutor);
  },

  async create(req, res) {
    try {
      const created = await tutoresService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const updated = await tutoresService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Tutor não encontrado' });
    res.json(updated);
  },

  async remove(req, res) {
    const id = Number(req.params.id);
    const ok = await tutoresService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Tutor não encontrado' });
    res.status(204).send();
  }
};