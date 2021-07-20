'use strict'

const express = require("express");

const usuarioControlador = require('../controladores/usuario.controller');

var md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.post('/registrarUsuario', usuarioControlador.registrarUsuario);
api.put('/editarUsuario/:idUsuario', md_autenticacion.ensureAuth, usuarioControlador.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.ensureAuth, usuarioControlador.eliminarUsuario);
api.get('/listarUsuarios', md_autenticacion.ensureAuth, usuarioControlador.listarUsuarios);
api.get('/buscarUsuarioID', md_autenticacion.ensureAuth, usuarioControlador.buscarUsuarioID);

module.exports = api;