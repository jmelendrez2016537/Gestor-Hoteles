const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoEventoSchema = Schema({
    tipoEvento: String
})

module.exports = mongoose.model('TipoEvento', TipoEventoSchema)