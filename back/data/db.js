var mongoose = require('mongoose');
var cliente = require('../models/cliente');
var profissional = require('../models/profissional');
var servico = require('../models/servico');
var usuario = require('../models/usuario');
var horario = require('../models/horario');

mongoose.connect('mongodb+srv://admin:admin@cluster0-pcyqe.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useUnifiedTopology: true });

module.exports = {Mongoose: mongoose};