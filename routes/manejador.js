const mongo = require('./mongo.js')();
const redis = require('redis');
const cliente = redis.createClient();
var jwt = require('jsonwebtoken');
var config = require('./config');

module.exports = function () {
    var manejador = {
        autenticar: async function (req, res) {
            if (req.body.origen === "frontend") {
                let usuario = await mongo.verificarAdministrador(req.body);
                if (usuario) {
                    var token = jwt.sign(usuario, config.secret);
                    cliente.set(usuario.usuario, token);
                    res.status(200).send({ estado: true, token: token });
                } else {
                    res.status(200).send({ estado: false, mensaje: 'Usuario invalido' });
                }
            } else if (req.body.origen === "movil") {
                let usuario = await mongo.verificarSupervisor(req.body);
                if (usuario) {
                    var token = jwt.sign(usuario, config.secret);
                    cliente.set(usuario.usuario, token);
                    res.status(200).send({ estado: true, token: token, codigo_usuario: usuario.codigo_usuario });
                } else {
                    res.status(200).send({ estado: false, mensaje: 'Usuario invalido' });
                }
            } else {
                res.status(200).send({ estado: false, mensaje: 'Origen invalido' });
            }
        },
        validarToken(token) {
            return new Promise((resolve) => {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err) {
                        resolve(false);
                    }
                    cliente.get(decoded.usuario, function (err, reply) {
                        if (err) {
                            resolve(false);
                        }
                        if (token === reply) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
                });
            });
        },
        verificarUsuario: function (req, res) {
            jwt.verify(req.body.token, config.secret, function (err, decoded) {
                if (err) {
                    res.status(401).send({ message: 'Error al consultar' });
                }
                if (decoded.rol === "admin") {
                    res.status(200).send({ autorizado: true });
                } else {
                    res.status(200).send({ autorizado: false });
                }
            });
        }
    }
    return manejador;
}