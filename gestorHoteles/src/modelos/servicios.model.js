const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
    televisor: String,
    dobleCama: String,
    internet: String,
    tina: String,
    desayuno: String,
    miniBar: String
})

module.exports = mongoose.model('Servicios', ServicioSchema)