'use strict'

const Evento = require('../modelos/eventos.model');

function registrarEvento(req, res) {
    var eventoModel = new Evento();
    var params = req.body;

    if (params.evento && params.descripcion && params.idTipoEvento) {
        eventoModel.evento = params.evento;
        eventoModel.descripcion = params.descripcion;
        eventoModel.idTipoEvento = params.idTipoEvento;

        Evento.find({
            $or: [
                { evento: eventoModel.evento }
            ]
        }).exec((err, eventoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

            if (eventoEncontrado && eventoEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: 'El Evento ya existe' })
            } else {
                eventoModel.save((err, eventoGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el Evento' })

                    if (eventoGuardado) {
                        res.status(200).send(eventoGuardado)
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el Evento' })
                    }
                })
            }
        })
    }
}

module.exports = {
    registrarEvento
}