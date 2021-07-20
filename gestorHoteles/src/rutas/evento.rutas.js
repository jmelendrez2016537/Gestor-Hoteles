'use strict'

const express = require("express");
const eventoControlador = require('../controladores/evento.controller');


var api = express.Router();
api.post('/registrarEvento', eventoControlador.registrarEvento);

module.exports = api;