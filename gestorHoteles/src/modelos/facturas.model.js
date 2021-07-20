const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
    fechaEmision: Date,
    extras: String,
    diasHospedados: String,
    idReservacion: { type: Schema.Types.ObjectId, ref: 'Reservaciones' }
})

module.exports = mongoose.model('Faturas', FacturaSchema)