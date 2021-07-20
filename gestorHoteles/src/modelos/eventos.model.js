const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventoSchema = Schema({
    evento: String,
    descripcion: String,
    idTipoEvento: { type: Schema.Types.ObjectId, ref: 'TipoEvento' }
})

module.exports = mongoose.model('Eventos', EventoSchema);