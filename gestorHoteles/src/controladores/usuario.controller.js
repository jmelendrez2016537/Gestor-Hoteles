'use strict'

const Usuario = require('../modelos/usuario.model');
const bcrypt = require("bcrypt-nodejs");
//const jwt = require('../servicios/jwt');

function registrarUsuario(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;

    if (params.usuario && params.email && params.password) {
        usuarioModel.nombre = params.nombre;
        usuarioModel.email = params.email;
        usuarioModel.usuario = params.usuario;
        usuarioModel.rol = 'ROL_USUARIO';

        Usuario.find({
            $or: [
                { usuario: usuarioModel.usuario },
                { email: usuarioModel.email }
            ]
        }).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El Usuario ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })

                        if (usuarioGuardado) {
                            res.status(200).send(usuarioGuardado)
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el Usuario' })
                        }
                    })
                })
            }
        })
    }
}

function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var params = req.body;
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    delete params.password;

    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar al Usuario' });
        return res.status(200).send({ usuarioActualizado });
    })
}

function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if (!usuarioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el usuario.' });

        return res.status(200).send({ usuarioEliminado });
    })
}

function listarUsuarios(req, res) {
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Usuario.aggregate([{
            $project: {
                _id: 1,
                nombre: 1,
                email: 1,
                usuario: 1,
                rol: 1
            }
        }, {
            $match: {
                "rol": { $regex: 'ROL_USUARIO', $options: 'i' }
            }
        }

    ]).exec((err, ok) => {
        console.log(err);
        return res.status(200).send({ ok })
    })
}

function buscarUsuarioID(req, res) {

    var idUsuario = req.user.sub;
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Usuario' })
        return res.status(200).send({ usuarioEncontrado })
    })
}

module.exports = {
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
    listarUsuarios,
    buscarUsuarioID
}