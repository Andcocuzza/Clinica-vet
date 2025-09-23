const express = require('express');
const cors = require('cors');
const animaisRoutes = require('./routes/animaisRoutes');
const tutoresRoutes = require('./routes/tutoresRoutes');
const atendimentosRoutes = require('./routes/atendimentosRoutes');
const examesRoutes = require('./routes/examesRoutes');
const vacinasRoutes = require('./routes/vacinasRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const servicosRoutes = require('./routes/servicosRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/animais', animaisRoutes);
app.use('/tutores', tutoresRoutes);
app.use('/atendimentos', atendimentosRoutes);
app.use('/exames', examesRoutes);
app.use('/vacinas', vacinasRoutes);
app.use('/historico', historicoRoutes);
app.use('/servicos', servicosRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});