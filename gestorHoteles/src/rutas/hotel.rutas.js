'use strict'

const express = require("express");
const hotelControlador = require('../controladores/hotel.controller');

var md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.post('/registrarHotel', md_autenticacion.ensureAuth, hotelControlador.registrarHotel);
api.put('/agregarEventosHotel/:idHotel', md_autenticacion.ensureAuth, hotelControlador.agregarEventosHotel);
api.get('/listarHoteles', md_autenticacion.ensureAuth, hotelControlador.listarHoteles);
api.get('/listarHotelID/:idHotel', md_autenticacion.ensureAuth, hotelControlador.listarHotelID);
api.get('/listarEventosHotel/:idHotel', md_autenticacion.ensureAuth, hotelControlador.listarEventosHotel);
api.get('/listarHotelNombre', hotelControlador.listarHotelNombre);
api.put('/editarHotel/:idHotel', md_autenticacion.ensureAuth, hotelControlador.editarHotel);
api.delete('/eliminarHotel/:idHotel', md_autenticacion.ensureAuth, hotelControlador.eliminarHotel);
api.put('/editarEventoHotel/:idHotel/:idEvento', md_autenticacion.ensureAuth, hotelControlador.editarEventoHotel);
api.delete('/eliminarEventoHotel/:idEvento', md_autenticacion.ensureAuth, hotelControlador.eliminarEventoHotel);
api.get('/listarEvento/:idHotel/:idEvento', md_autenticacion.ensureAuth, hotelControlador.listarEvento);

module.exports = api;