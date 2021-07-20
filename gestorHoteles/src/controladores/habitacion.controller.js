'use strict'

const Habitacion = require('../modelos/habitaciones.model');
const Hotel = require('../modelos/hoteles.model');

function registrarHabitacion(req, res) {
    var habitacionModel = new Habitacion();
    var params = req.body;
    var disponible = 'true';

    if (params.numeroHabitacion && params.clase && params.tamaño && params.precio && params.idHotel && params.idServicio && params.disponible) {
        habitacionModel.numeroHabitacion = params.numeroHabitacion;
        habitacionModel.clase = params.clase;
        habitacionModel.tamaño = params.tamaño;
        habitacionModel.precio = params.precio;
        habitacionModel.idHotel = params.idHotel;
        habitacionModel.idServicio = params.idServicio;
        habitacionModel.disponible = disponible;


        Habitacion.find({
            $or: [
                { numeroHabitacion: habitacionModel.numeroHabitacion }
            ]
        }).exec((err, habitacionEncontrada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

            if (habitacionEncontrada && habitacionEncontrada.length >= 1) {
                return res.status(500).send({ mensaje: 'La Habitacion ya existe' })
            } else {
                habitacionModel.save((err, habitacionGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar la Habitacion' })

                    if (habitacionGuardada) {
                        res.status(200).send(habitacionGuardada)
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar la Habitacion' })
                    }
                })
            }
        })
    }
}


function listarHabitacionesHotel(req, res) {
    var idHotel = req.params.idHotel;

    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Habitacion.find({ idHotel: idHotel }).populate('idHotel', 'nombre descripcion telefono direccion').exec((err, habitacionesHotelEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de las Habitaciones de Hotel' });
        if (!habitacionesHotelEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las Habitaciones' });
        return res.status(200).send({ habitacionesHotelEncontradas });
    })
}

function listarHabitacionId(req, res) {
    var idHabitacion = req.params.idHabitacion;

    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Habitacion.findById(idHabitacion).populate('idHotel', 'nombre descripcion telefono direccion').exec((err, habitacionEcontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la Habitacion' });
        if (!habitacionEcontrada) return res.status(500).send({ mensaje: 'Error al obtener la Habitacion' });
        return res.status(200).send({ habitacionEcontrada });
    })

}

function listarServicios(req, res) {
    var idHabitacion = req.params.idHabitacion;

    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Habitacion.findById(idHabitacion).populate('idServicio', 'televisor dobleCama internet tina desayuno miniBar').exec((err, servicioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la Habitacion' });
        if (!servicioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la Habitacion' });
        return res.status(200).send({ servicioEncontrado });
    })

}

function listarHabitacionesDisponibles(req, res) {

    if (req.user.rol != "ROL_ADMIN_HOTEL") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    var idAdmin = req.user.sub;
    Hotel.findOne({ idAdminHotel: idAdmin }, (err, hotelesEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion numero 1' });
        if (!hotelesEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los Hoteles' });

        if (hotelesEncontrados) {
            var hotelId = hotelesEncontrados._id;
            var estado = true;
            Habitacion.find({ disponible: estado, idHotel: hotelId }).populate('idServicio', 'televisor dobleCama internet tina desayuno miniBar').populate('idHotel', 'nombre').exec((err, habitacionesEncontradas) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!habitacionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las Habitaciones' });
                return res.status(200).send({ habitacionesEncontradas });
            })
        }
    })


}

module.exports = {
    registrarHabitacion,
    listarHabitacionesHotel,
    listarHabitacionesDisponibles,
    listarHabitacionId,
    listarServicios
}