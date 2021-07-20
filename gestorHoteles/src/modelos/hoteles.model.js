const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    descripcion: String,
    telefono: String,
    direccion: String,
    eventos: [{
        idEvento: { type: Schema.Types.ObjectId, ref: 'Eventos' }
    }],
    usuarios: [{
        idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
    }],
    idAdminHotel: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Hoteles', HotelSchema)