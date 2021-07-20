'use strict'

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const resgistroAdmin = require('./src/controladores/admin.controller');

const usuario_ruta = require('./src/rutas/usuario.rutas');
const admin_ruta = require('./src/rutas/admin.rutas');
const adminHotel_ruta = require('./src/rutas/adminHotel.rutas');
const tipoEvento_ruta = require('./src/rutas/tipoEvento.rutas');
const evento_ruta = require('./src/rutas/evento.rutas');
const hotel_ruta = require('./src/rutas/hotel.rutas');
const servicio_ruta = require('./src/rutas/servicio.rutas');
const habitacion_ruta = require('./src/rutas/habitacion.rutas');
const reservacion_ruta = require('./src/rutas/reservacion.rutas');
const factura_ruta = require('./src/rutas/factura.rutas');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

resgistroAdmin.registrarAdmin();
app.use('/api', usuario_ruta);
app.use('/api', admin_ruta);
app.use('/api', adminHotel_ruta);
app.use('/api', tipoEvento_ruta);
app.use('/api', evento_ruta);
app.use('/api', hotel_ruta);
app.use('/api', servicio_ruta);
app.use('/api', habitacion_ruta);
app.use('/api', reservacion_ruta);
app.use('/api', factura_ruta);

module.exports = app;