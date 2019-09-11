const express = require('express');
const app = express();
const servidor = require('http').Server(app);
const bodyParser = require('body-parser');
var cors = require('cors');
var manejador = require('./routes/manejador.js')();
const { google } = require('googleapis');
const fs = require('fs');

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

subirImagen = function(){
	const drive = google.drive({ version: "v3" });
	var fileMetadata = {
		'name': "prueba"
	};
	var media = {
		mimeType: 'image/jpeg',
		body: fs.createReadStream("./uploads/file")
	};
	drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: 'id'
	}, (err, file) => {
		if (err) {
			console.log(err);
		} 
	});
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.all('/api/seguro/*', validarToken);
app.use('/api/', require('./routes'));

servidor.listen(8080, function () {
	subirImagen();
	console.log("Servidor iniciado en el puerto 8080");
});
