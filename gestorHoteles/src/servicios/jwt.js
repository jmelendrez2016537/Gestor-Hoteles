'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'IN6BM_2016537';

exports.createToken = function(usuario) {
    let payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        usuario: usuario.usuario,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}