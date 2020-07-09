const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const servicosRouter = require('./routes/servico-route');
const profissionalRouter = require('./routes/profissional-route');
const clienteRouter = require('./routes/cliente-route');
const usuarioRouter = require('./routes/usuario-route');
const horarioRouter = require('./routes/horario-route');
const path = require('path');

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Make sure it comes back as json

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../front/index.html"));
});

app.use("/servicos", servicosRouter);
app.use("/clientes", clienteRouter);
app.use("/horarios", horarioRouter);
app.use("/usuarios", usuarioRouter);
app.use("/profissionais", profissionalRouter);
app.use("/login", servicosRouter);

app.listen(3000, function () {
  console.log('Servidor rodando na porta ' + 3000);
});