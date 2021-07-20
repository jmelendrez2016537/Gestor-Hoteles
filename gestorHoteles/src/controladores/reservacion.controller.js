'use strict'

const Reservacion = require('../modelos/reservaciones.model');
const Hotel = require('../modelos/hoteles.model');
const Habitacion = require('../modelos/habitaciones.model');

function registrarReservacion(req, res) {
    var reservacionModel = new Reservacion();
    var params = req.body;

    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }

    var idDisponible = params.idHabitacion;
    Habitacion.findById(idDisponible, (err, habitacionEncontrada) => {
        if (err) {
            return res.status(500).send({ message: "Error al encontrar la Habitacion" });
        } else {
            if (habitacionEncontrada.disponible != true) {
                return res.status(500).send({ mensaje: "Esta habitacion ya no esta disponible" });
            }



            if (params.fechaReservada && params.fechaFinal && params.numPersonas && params.idHotel && params.idHabitacion && params.idServicio) {
                reservacionModel.fechaReservada = params.fechaReservada;
                reservacionModel.fechaFinal = params.fechaFinal;
                reservacionModel.numPersonas = params.numPersonas;
                reservacionModel.idHotel = params.idHotel;
                reservacionModel.idHabitacion = params.idHabitacion;
                reservacionModel.idServicio = params.idServicio;
                reservacionModel.idUsuario = req.user.sub;


                reservacionModel.save((err, reservacionGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar la Reservacion' })

                    if (reservacionGuardada) {
                        res.status(200).send(reservacionGuardada)

                        var idHotel = reservacionModel.idHotel;
                        var params = req.user.sub;

                        Hotel.findByIdAndUpdate(idHotel, { $push: { usuarios: { idUsuario: params } } }, { new: true }, (err, usuarioAgregado) => {
                            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' });
                            if (!usuarioAgregado) return res.status(500).send({ mensaje: 'Error al agregar el Usuario' });
                            console.log(usuarioAgregado);
                        })

                        var idHabitacion = reservacionModel.idHabitacion;
                        var estado = false;

                        Habitacion.findById(idHabitacion, (err, habitacionEncontrada) => {
                            if (err) {
                                return res.status(500).send({ message: "Error al encontrar la Habitacion" });
                            } else {
                                //res.status(403).send({ habitacionEncontrada });


                                Habitacion.findOneAndUpdate({ _id: habitacionEncontrada._id, numeroHabitacion: habitacionEncontrada.numeroHabitacion, clase: habitacionEncontrada.clase, tamaño: habitacionEncontrada.tamaño, precio: habitacionEncontrada.precio }, { disponible: estado }, { new: true, useFindAndModify: false }, (err, estadoAgregado) => {
                                    if (err) {
                                        console.log("Error al editar el estado");
                                    } else if (estadoAgregado) {
                                        console.log("Estado editado exitosamente");
                                    } else {
                                        return res.status(404).send({ message: "No se edito el estado" });
                                    }
                                })
                            }
                        })
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar la Reservacion' })
                    }
                })
            }


        }
    })


}

function listarReservacionesHotel(req, res) {
    var idHotel = req.params.idHotel;
    if (req.user.rol != "ROL_ADMIN_HOTEL") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Reservacion.find({ idHotel: idHotel }).populate('idHotel', 'nombre descripcion').exec((err, reservacionesHotelEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de las Reservaciones de Hotel' });
        if (!reservacionesHotelEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las Reservaciones' });
        return res.status(200).send({ reservacionesHotelEncontradas });
    })
}


// no funcionciona, solucionar consulta
function hotelMasSolicitado(req, res) {

    Reservacion.findOne().populate('idHotel', 'nombre').exec((err, hotelesEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los Hoteles' });
        if (!hotelesEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los Hoteles' });
        //res.status(200).send({ hotelesEncontrados });
        console.log(hotelesEncontrados.idHotel);
        cout(hotelesEncontrados.idHotel);
        Reservacion.findById(hotelesEncontrados.idHotel).exec((err, hotelEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los Hoteles' });
            if (!hotelEncontrado) return res.status(500).send({ mensaje: 'Error al obtener los Hoteles' });
            res.status(200).send({ hotelEncontrado });

        })


    })
}

module.exports = {
    registrarReservacion,
    listarReservacionesHotel,
    hotelMasSolicitado
}