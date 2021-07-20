'use strict'

const express = require("express");
const servicioControlador = require('../controladores/servicio.controller')


var api = express.Router();
api.post('/registrarServicio', servicioControlador.registrarServicio);

module.exports = api;