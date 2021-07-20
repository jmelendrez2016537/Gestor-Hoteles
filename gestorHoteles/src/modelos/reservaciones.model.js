const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservacionSchema = Schema({
    fechaReservada: Date,
    fechaFinal: Date,
    numPersonas: String,
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hoteles' },
    idHabitacion: { type: Schema.Types.ObjectId, ref: 'Habitaciones' },
    idServicio: { type: Schema.Types.ObjectId, ref: 'Servicios' },
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Reservaciones', ReservacionSchema)