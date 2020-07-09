var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb+srv://admin:admin@cluster0-pcyqe.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useUnifiedTopology: true });

var profissionalSchema = new mongoose.Schema({
    nome: {type: String, required: [true, "nome é obrigatório"], unique: true, index: true}
}, {timestamp: true});

profissionalSchema.plugin(uniqueValidator, { message: 'Profissional já cadastrado'});

mongoose.model('Profissional', profissionalSchema);

module.exports = {Mongoose: mongoose, ProfissionalSchema: profissionalSchema};