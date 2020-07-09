var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-pcyqe.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useUnifiedTopology: true });

var servicoSchema = new mongoose.Schema({
    nome: {type: String, required: [true, "Nome é obrigatório"], unique: true},
    valor: {type: String, required: [true, "Valor é obrigatório"], unique: true},
    descricao: {type: String},

}, {timestamp: true});

mongoose.model('Servico', servicoSchema);

module.exports = {Mongoose: mongoose, ServicoSchema: servicoSchema};