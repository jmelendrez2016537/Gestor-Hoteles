'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'IN6BM_2016537';

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ mensaje: 'La peticion no tiene la cabezara de Autorizacion' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                mensaje: 'El Token ha expirado'
            });
        }
    } catch (error) {
        return res.status(404).send({
            mensaje: 'El Token no es valido'
        });
    }

    req.user = payload;
    next();
}