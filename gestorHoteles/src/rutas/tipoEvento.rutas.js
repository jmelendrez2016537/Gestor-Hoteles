'use strict'

const express = require("express");
const tipoEventoControlador = require('../controladores/tipoEvento.controller');


var api = express.Router();
api.post('/registrarTipoEvento', tipoEventoControlador.registrarTipoEvento);

module.exports = api;