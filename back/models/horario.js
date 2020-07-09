var mongoose = require('mongoose');
var db = require('../data/db');
mongoose.connect('mongodb+srv://admin:admin@cluster0-pcyqe.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useUnifiedTopology: true });

var horarioSchema = new mongoose.Schema({
    dataHora: { type: Date, required: [true, "Horário é obrigatório"]},
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    servico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico'
    },
    profissional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissional'
    }
}, {timestamp: true});

mongoose.model('Horario', horarioSchema);

module.exports = {Mongoose: mongoose, HorarioSchema: horarioSchema};