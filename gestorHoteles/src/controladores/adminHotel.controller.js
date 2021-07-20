'use strict'

const Usuario = require('../modelos/usuario.model');
const bcrypt = require("bcrypt-nodejs");
const jwt = require('../servicios/jwt');

function registrarAdminHotel(req, res) {
    var adminHotelModel = new Usuario();
    var params = req.body;

    if (params.usuario && params.email && params.password) {
        adminHotelModel.nombre = params.nombre;
        adminHotelModel.email = params.email;
        adminHotelModel.usuario = params.usuario;
        adminHotelModel.rol = 'ROL_ADMIN_HOTEL';

        Usuario.find({
            $or: [
                { usuario: adminHotelModel.usuario },
                { email: adminHotelModel.email }
            ]
        }).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Administrador' })

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El Administrador ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    adminHotelModel.password = passwordEncriptada;

                    adminHotelModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el Administrador' })

                        if (usuarioGuardado) {
                            res.status(200).send(usuarioGuardado)
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el Administrador' })
                        }
                    })
                })
            }
        })
    }
}


module.exports = {
    registrarAdminHotel
}