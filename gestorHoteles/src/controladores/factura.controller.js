'use strict'

const Factura = require('../modelos/facturas.model');
//const Reservacion = require('../modelos/reservaciones.model');

/*function restaDeFechas(req, res) {
    Reservacion.find((err, reservacionEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error al obtener los datos de reservacion' })
        if (reservacionEncontrada) {
            console.log(reservacionEncontrada.fechaReservada.diffDate(reservacionEncontrada.fechaFinal, 'days'), 'dias hospedados')
        }
    })
}*/

//var dias = restaDeFechas();

function registrarFactura(req, res) {
    var facturaModel = new Factura();
    var params = req.body;
    if (req.user.rol != "ROL_ADMIN_HOTEL") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }

    if (params.fechaEmision && params.extras && params.idReservacion) {
        facturaModel.fechaEmision = params.fechaEmision;
        facturaModel.extras = params.extras;
        //facturaModel.diasHospedados = dias;
        facturaModel.idReservacion = params.idReservacion;
        facturaModel.idHotel = params.idHotel;
        facturaModel.idHabitacion = params.idHabitacion;
        facturaModel.idServicio = params.idServicio;


        facturaModel.save((err, facturaGuardada) => {
            if (err) return res.status(500).send({ mensaje: 'Error al guardar la Factura' })

            if (facturaGuardada) {
                res.status(200).send(facturaGuardada)
            } else {
                res.status(404).send({ mensaje: 'No se ha podido registrar la Factura' })
            }
        })
    }
}



module.exports = {
    registrarFactura
}


//console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');