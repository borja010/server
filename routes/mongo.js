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
          db.collection("administradores").findOne({ usuario: login.usuario }, (err, resultado) => {
            client.close();
            if (resultado) {
              bcrypt.compare(login.password, resultado.contrasena, function (err, res) {
                if (err) {
                  resolve(null);
                }
                if (res) {
                  resolve({ usuario: resultado.usuario, codigo_usuario: resultado.codigo_usuario, rol: "admin" });
                } else {
                  resolve(null);
                }
              });
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
          db.collection("usuarios").findOne({ usuario: login.usuario }, (err, resultado) => {
            client.close();
            if (resultado) {
              bcrypt.compare(login.password, resultado.contrasena, function (err, res) {
                if (err) {
                  resolve(null);
                }
                if (res) {
                  resolve({ usuario: resultado.usuario, codigo_usuario: resultado.codigo_usuario, rol: "supervisor" });
                } else {
                  resolve(null);
                }
              });
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
          db.collection("administradores").findOne({ usuario: req.body.usuario }, (err, resultado) => {
            if (resultado && resultado.codigo_usuario != req.body.codigoUsuario) {
              res.status(200).send({ estado: 2, mensaje: "Nombre de usuario ya existe" });
            } else {
              db.collection("administradores").update({ codigo_usuario: req.body.codigoUsuario }, { codigo_usuario: req.body.codigoUsuario, usuario: req.body.usuario, contrasena: bcrypt.hashSync(req.body.password, config.salt) }, { upsert: true }, (err, resultado) => {
                if (err) {
                  res.status(200).send({ estado: -1, mensaje: "Error al guardar usuario" });
                }
                if (resultado) {
                  res.status(200).send({ estado: 1, mensaje: "Usuario actualizado correctamente" });
                } else {
                  res.status(200).send({ estado: -1, mensaje: "Error al guardar usuario" });
                }
              });
            }
          });
        } else if (req.body.tipoAcceso === 'supervisor') {
          db.collection("usuarios").findOne({ usuario: req.body.usuario }, (err, resultado) => {
            if (resultado && resultado.codigo_usuario != req.body.codigoUsuario) {
              res.status(200).send({ estado: 2, mensaje: "Nombre de usuario ya existe" });
            } else {
              db.collection("usuarios").update({ codigo_usuario: req.body.codigoUsuario }, { codigo_usuario: req.body.codigoUsuario, usuario: req.body.usuario, contrasena: bcrypt.hashSync(req.body.password, config.salt) }, { upsert: true }, (err, resultado) => {
                if (err) {
                  res.status(200).send({ estado: -1, mensaje: "Error al guardar usuario" });
                }
                if (resultado) {
                  res.status(200).send({ estado: 1, mensaje: "Usuario actualizado correctamente" });
                } else {
                  res.status(200).send({ estado: -1, mensaje: "Error al guardar usuario" });
                }
              });
            }
          });
        }
      });
    },
    obtenerUsuario: function (req, res) {
      const client = new MongoClient(config.mongo, { useNewUrlParser: true });
      client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(config.database);
        if (req.body.tipoAcceso === 'admin') {
          db.collection("administradores").findOne({ codigo_usuario: req.body.codigoUsuario }, (err, resultado) => {
            if (err) {
              client.close();
              res.status(200).send({ estado: -1, mensaje: "Error al consultar usuario" });
            }
            if (resultado) {
              res.status(200).send({ estado: 1, usuario: resultado.usuario });
            } else {
              res.status(200).send({ estado: -1, mensaje: "Error usuario no encontrado" });
            }
          });
        } else if (req.body.tipoAcceso === 'supervisor') {
          db.collection("usuarios").findOne({ codigo_usuario: req.body.codigoUsuario }, (err, resultado) => {
            if (err) {
              client.close();
              res.status(200).send({ estado: -1, mensaje: "Error al consultar usuario" });
            }
            if (resultado) {
              res.status(200).send({ estado: 1, usuario: resultado.usuario });
            } else {
              res.status(200).send({ estado: -1, mensaje: "Error usuario no encontrado" });
            }
          });
        }
      });
    }
  }
  return mongo;
}