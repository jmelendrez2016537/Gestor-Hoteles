'use strict'

const express = require("express");
const reservacionControlador = require('../controladores/reservacion.controller')

var md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.post('/registrarReservacion', md_autenticacion.ensureAuth, reservacionControlador.registrarReservacion);
api.get('/listarReservacionesHotel/:idHotel', md_autenticacion.ensureAuth, reservacionControlador.listarReservacionesHotel);
api.get('/hotelMasSolicitado', reservacionControlador.hotelMasSolicitado);

module.exports = api;