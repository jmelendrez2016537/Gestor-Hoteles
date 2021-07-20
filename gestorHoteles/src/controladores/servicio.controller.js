'use strict'

const Servicio = require('../modelos/servicios.model');

function registrarServicio(req, res) {
    var servicioModel = new Servicio();
    var params = req.body;

    if (params.televisor && params.dobleCama && params.internet && params.tina && params.desayuno && params.miniBar) {
        servicioModel.televisor = params.televisor;
        servicioModel.dobleCama = params.dobleCama;
        servicioModel.internet = params.internet;
        servicioModel.tina = params.tina;
        servicioModel.desayuno = params.desayuno;
        servicioModel.miniBar = params.miniBar;

        servicioModel.save((err, servicioGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'Error al guardar el Servicio' })

            if (servicioGuardado) {
                res.status(200).send(servicioGuardado)
            } else {
                res.status(404).send({ mensaje: 'No se ha podido registrar el Servicio' })
            }
        })
    }
}

module.exports = {
    registrarServicio
}