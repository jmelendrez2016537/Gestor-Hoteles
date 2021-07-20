'use strict'

const express = require("express");
const adminControlador = require('../controladores/admin.controller');

var md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.post('/login', adminControlador.login);
api.get('/buscarAdminId', md_autenticacion.ensureAuth, adminControlador.buscarAdminId);

module.exports = api;