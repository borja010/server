const MongoClient = require('mongodb').MongoClient;
var config = require('./config');
const assert = require('assert');

module.exports = function(){
	var mongo = {
		verificarAdministrador: function(req, res){
            const client = new MongoClient(config.mongo);
            client.connect(function(err) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                const db = client.db(config.database);
                db.collection("administradores").findOne({usuario: req.body.usuario, contrasena: req.body.password}, (err, result) =>{
                  console.log(result);
                  client.close();
                });
              });
		},
	}
	return mongo;
}