'use strict'

const TipoEvento = require('../modelos/tipoEvento.model');

function registrarTipoEvento(req, res) {
    var tipoEventoModel = new TipoEvento();
    var params = req.body;

    if (params.tipoEvento) {
        tipoEventoModel.tipoEvento = params.tipoEvento;

        TipoEvento.find({
            $or: [
                { tipoEvento: tipoEventoModel.tipoEvento }
            ]
        }).exec((err, tipoEventoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

            if (tipoEventoEncontrado && tipoEventoEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: 'El Tipo de Evento ya existe' })
            } else {
                tipoEventoModel.save((err, tipoEventoGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el Tipo de Evento' })

                    if (tipoEventoGuardado) {
                        res.status(200).send(tipoEventoGuardado)
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el Tipo de Evento' })
                    }
                })
            }
        })
    }
}

module.exports = {
    registrarTipoEvento
}