'use strict'

const Usuario = require('../modelos/usuario.model');
const bcrypt = require("bcrypt-nodejs");
const jwt = require('../servicios/jwt');

function registrarAdmin(req, res) {
    var adminModel = new Usuario();
    var nombre = "Jonadab";
    var email = "jonadab@gmail.com"
    var usuario = "Admin";
    var password = "123456";
    var rol = "ROL_ADMIN";

    adminModel.nombre = nombre;
    adminModel.email = email;
    adminModel.usuario = usuario;
    adminModel.password = password;
    adminModel.rol = rol;

    Usuario.find({
        $or: [{ usuario: adminModel.usuario }]
    }).exec((err, adminEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Administrador' })

        if (adminEncontrado && adminEncontrado.length >= 1) {
            return console.log('El administrador ya existe');
        } else {
            bcrypt.hash(password, null, null, (err, passwordEncriptada) => {
                adminModel.password = passwordEncriptada;

                adminModel.save((err, adminGuardado) => {
                    if (err) return console.log('Error al guardar el Administrador');

                    if (adminGuardado) {
                        console.log(adminGuardado);
                    } else {
                        console.log('No se ha podido registrar al Administrador');
                    }
                })
            })
        }
    })
}

function login(req, res) {
    var params = req.body;

    Usuario.findOne({ usuario: params.usuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passCorrecta) => {
                if (passCorrecta) {
                    if (params.obtenerToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        });
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado })
                    }
                } else {
                    return res.status(404).send({ mensaje: 'El usuario no se ha podido identificar' })
                }
            })
        } else {
            return res.status(404).send({ mensaje: 'El usuario no ha podido ingresar' })
        }
    })
}

function buscarAdminId(req, res) {

    var idUsuario = req.user.sub;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Usuario.findById(idUsuario, (err, adminEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })
        if (!adminEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Usuario' })
        return res.status(200).send({ adminEncontrado })
    })
}

module.exports = {
    registrarAdmin,
    login,
    buscarAdminId
}