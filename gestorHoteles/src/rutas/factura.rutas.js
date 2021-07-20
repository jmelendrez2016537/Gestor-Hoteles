'use strict'

const express = require("express");
const factuarControlador = require('../controladores/factura.controller');

var md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.post('/registrarFactura', md_autenticacion.ensureAuth, factuarControlador.registrarFactura);

module.exports = api;