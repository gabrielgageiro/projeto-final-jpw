var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-pcyqe.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useUnifiedTopology: true });

var clienteSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "nome é obrigatório"], index: true },
    telefone: { type: String },
    cpf: { type: String }
}, {timestamp: true});

mongoose.model('Cliente', clienteSchema);

module.exports = {Mongoose: mongoose, ClienteSchema: clienteSchema};