'use strict'

const Hotel = require('../modelos/hoteles.model');

function registrarHotel(req, res) {
    var hotelModel = new Hotel();
    var params = req.body;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    if (params.nombre && params.descripcion && params.telefono && params.direccion && params.idAdminHotel) {
        hotelModel.nombre = params.nombre;
        hotelModel.descripcion = params.descripcion;
        hotelModel.telefono = params.telefono;
        hotelModel.direccion = params.direccion;
        hotelModel.idAdminHotel = params.idAdminHotel;

        Hotel.find({
            $or: [
                { nombre: hotelModel.nombre },
                { telefono: hotelModel.telefono },
                { direccion: hotelModel.direccion }
            ]
        }).exec((err, hotelEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

            if (hotelEncontrado && hotelEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: 'El Hotel ya existe' })
            } else {
                hotelModel.save((err, hotelGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el Hotel' })

                    if (hotelGuardado) {
                        res.status(200).send(hotelGuardado)
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el Hotel' })
                    }
                })
            }
        })
    }
}

function agregarEventosHotel(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findByIdAndUpdate(idHotel, { $push: { eventos: { idEvento: params.idEvento } } }, { new: true }, (err, eventoAgregrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del evento' });
        if (!eventoAgregrado) return res.status(500).send({ mensaje: 'Error al agregar el Evento del Hotel' });
        return res.status(200).send({ eventoAgregrado });
    })
}
/*
function agregarHabitacionesHotel(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;

    Hotel.findByIdAndUpdate(idHotel, { $push: { habitaciones: { idHabitacion: params.idHabitacion } } }, { new: true }, (err, eventoAgregrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del evento' });
        if (!eventoAgregrado) return res.status(500).send({ mensaje: 'Error al agregar el Evento del Hotel' });
        return res.status(200).send({ eventoAgregrado });
    })
}*/

function editarHotel(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findByIdAndUpdate(idHotel, params, { new: true }, (err, hotelActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!hotelActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar al Hotel' });
        return res.status(200).send({ hotelActualizado });
    })
}

function eliminarHotel(req, res) {
    var idHotel = req.params.idHotel;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findByIdAndDelete(idHotel, (err, hotelEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if (!hotelEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el Hotel' });

        return res.status(200).send({ usuarioEliminado });
    })
}

function editarEventoHotel(req, res) {
    var hotelId = req.params.idHotel;
    var eventosId = req.params.idEvento;
    var params = req.body;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findOneAndUpdate({ _id: hotelId, "eventos._id": eventosId }, { "eventos.$.idEvento": params.evento }, { new: true, useFindAndModify: false }, (err, eventoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Evento' });
        if (!eventoEditado) return res.status(500).send({ mensaje: 'No se ha podido editar este Evento' });
        return res.status(200).send({ eventoEditado })
    })
}

function eliminarEventoHotel(req, res) {
    var eventosId = req.params.idEvento;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findOneAndUpdate({ "eventos._id": eventosId }, { $pull: { eventos: { _id: eventosId } } }, { new: true, useFindAndModify: false }, (err, eventoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Evento' });
        if (!eventoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el Evento' });

        return res.status(200).send({ eventoEliminado })
    })
}

function listarEvento(req, res) {
    var hotelId = req.params.idHotel;
    var eventoId = req.params.idEvento;
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findOne({ _id: hotelId, "eventos._id": eventoId }, { "eventos.$": 1 }, (err, eventoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Hotel' });
        if (!eventoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Evento' });
        return res.status(200).send({ eventoEncontrado })
    })
}

//---------Generales--------------
function listarHoteles(req, res) {
    Hotel.find((err, hotelesEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de encontrar Hoteles' })
        if (!hotelesEncontrados) return res.status(500).send({ mensaje: 'Error en la consulta de Hoteles' })
        return res.status(200).send({ hotelesEncontrados })
    })
}


function listarHotelID(req, res) {
    var idHotel = req.params.idHotel;
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findById(idHotel).populate('idAdminHotel', 'nombre').populate('eventos', 'evento descripcion').exec((err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Hotel' })
        if (!hotelEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Hotel' })
        return res.status(200).send({ hotelEncontrado })
    })
}

function listarEventosHotel(req, res) {
    var idHotel = req.params.idHotel;
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No tiene los permisos requeridos' });
    }
    Hotel.findById(idHotel).populate('eventos.idEvento', 'evento descripcion').exec((err, eventosHotelesEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los Evento de Hotel' })
        if (!eventosHotelesEncontrados) return res.status(500).send({ mensaje: 'Error en obtener los Eventos de Hotel' })
        return res.status(200).send({ eventosHotelesEncontrados })
    })
}

//---------Generales--------------
function listarHotelNombre(req, res) {
    var bodyNombreHotel = req.body.nombre;


    Hotel.aggregate([{
        $project: {
            nombre: 1,
            descripcion: 1,
            telefono: 1,
            direccion: 1,
            idAdminHotel: 1
        }
    }, {
        $match: { "nombre": { $regex: bodyNombreHotel, $options: 'i' } }
    }]).exec((err, ok) => {
        console.log(err);
        return res.status(200).send({ ok })
    })
}





module.exports = {
    registrarHotel,
    agregarEventosHotel,
    listarHoteles,
    listarHotelID,
    listarEventosHotel,
    listarHotelNombre,
    editarHotel,
    eliminarHotel,
    editarEventoHotel,
    eliminarEventoHotel,
    listarEvento
}