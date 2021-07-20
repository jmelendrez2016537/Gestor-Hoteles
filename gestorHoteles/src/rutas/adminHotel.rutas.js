'use strict'

const express = require("express");
const adminHotelControlador = require('../controladores/adminHotel.controller');

//var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarAdminHotel', adminHotelControlador.registrarAdminHotel);

module.exports = api;