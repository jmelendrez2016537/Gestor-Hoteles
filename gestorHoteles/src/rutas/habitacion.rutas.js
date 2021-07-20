'use strict'

const express = require("express");
const habitacionControlador = require('../controladores/habitacion.controller');

var md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.post('/registrarHabitacion', md_autenticacion.ensureAuth, habitacionControlador.registrarHabitacion);
api.get('/listarHabitacionesHotel/:idHotel', md_autenticacion.ensureAuth, habitacionControlador.listarHabitacionesHotel);
api.get('/listarHabitacionesDisponibles', md_autenticacion.ensureAuth, habitacionControlador.listarHabitacionesDisponibles);
api.get('/listarHabitacionId/:idHabitacion', md_autenticacion.ensureAuth, habitacionControlador.listarHabitacionId);
api.get('/listarServicios/:idHabitacion', md_autenticacion.ensureAuth, habitacionControlador.listarServicios);


module.exports = api;