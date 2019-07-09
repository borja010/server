const MongoClient = require('mongodb').MongoClient;
var config = require('./config');
const assert = require('assert');
const bcrypt = require('bcrypt');

module.exports = function () {
  var mongo = {
    verificarAdministrador: function (login) {
      return new Promise((resolve) => {
        const client = new MongoClient(config.mongo, { useNewUrlParser: true });
        client.connect(function (err) {
          assert.equal(null, err);
          const db = client.db(config.database);
          db.collection("administradores").findOne({ usuario: login.usuario, contrasena: login.password }, (err, resultado) => {
            client.close();
            if (resultado) {
              resolve({ usuario: resultado.usuario, rol: "admin" });
            } else {
              resolve(null);
            }
          });
        });
      })
    },
    verificarSupervisor: function (login) {
      return new Promise((resolve) => {
        const client = new MongoClient(config.mongo, { useNewUrlParser: true });
        client.connect(function (err) {
          assert.equal(null, err);
          const db = client.db(config.database);
          db.collection("usuarios").findOne({ usuario: login.usuario, contrasena: login.password }, (err, resultado) => {
            client.close();
            if (resultado) {
              resolve({ usuario: resultado.usuario, codigo_usuario: resultado.codigo_empleado, rol: "supervisor" });
            } else {
              resolve(null);
            }
          });
        });
      })
    },
    guardarUsuario: function (req, res) {
      const client = new MongoClient(config.mongo, { useNewUrlParser: true });
      client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(config.database);
        if (req.body.tipoAcceso === 'admin') {
          db.collection('administradores').findOne({ usuario: req.body.codigoEmpleado }, (err, resultado) => {
            if (resultado) {
              client.close();
              res.status(200).send({estado: -1, mensaje: "Usuario ya existe"});
            } else {
              db.collections('administradores').insertOne({ codigoEmpleado: req.body.codigoEmpleado, usuario: req.body.usuario, contrasena: bcrypt.hashSync(req.body.password, config.secret) }, (err, resultado) => {
                client.close();
                if (err) {
                  res.status(200).send({estado: -1, mensaje: "Error al guardar usuario"});
                }
                res.status(200).send({estado: 1, mensaje: "Usuario guardado exitosamente"});
              });
            }
          });
        } else if (req.body.tipoAcceso === 'supervisor') {
          db.collection('usuarios').findOne({ usuario: req.body.usuario }, (err, resultado) => {
            if (resultado) {
              client.close();
              res.status(200).send({estado: -1, mensaje: "Usuario ya existe"});
            } else {
              db.collections('usuarios').insertOne({ codigoEmpleado: req.body.codigoEmpleado, usuario: req.body.usuario, contrasena: bcrypt.hashSync(req.body.password, config.secret) }, (err, resultado) => {
                client.close();
                if (err) {
                  res.status(200).send({estado: -1, mensaje: "Error al guardar usuario"});
                }
                res.status(200).send({estado: 1, mensaje: "Usuario guardado exitosamente"});
              });
            }
          });
        }
      });
    }
  }
  return mongo;
}