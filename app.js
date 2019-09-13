const express = require('express');
const app = express();
const servidor = require('http').Server(app);
const bodyParser = require('body-parser');
var cors = require('cors');
var manejador = require('./routes/manejador.js')();

var validarToken = async function (req, res, next) {

	if (!req.headers.authorization) {
		return res.status(401).send({ message: 'Se necesita token de autenticacion' });
	}
	var token = req.headers.authorization.split(' ')[1];
	try {
		if (await manejador.validarToken(token)) {
			next();
		} else {
			return res.status(401).send({ message: 'Token invalido' });
		}
	} catch (err) {
		return res.status(401).send({ message: 'Token invalido' });
	}
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.all('/api/seguro/*', validarToken);
app.use('/api/', require('./routes'));

servidor.listen(8080, function () {
	console.log("Servidor iniciado en el puerto 8080");
});
