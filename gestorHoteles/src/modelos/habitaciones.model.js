const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HabitacionSchema = Schema({
    numeroHabitacion: String,
    clase: String,
    tamaño: String,
    precio: String,
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hoteles' },
    idServicio: { type: Schema.Types.ObjectId, ref: 'Servicios' },
    disponible: Boolean

})

module.exports = mongoose.model('Habitaciones', HabitacionSchema);