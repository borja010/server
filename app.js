const express = require('express');
const app = express();
const servidor = require('http').Server(app);
const bodyParser = require('body-parser');
var cors = require('cors');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(bodyParser.json());
app.use('/', require('./routes'));

servidor.listen(8080, function(){
	console.log("Servidor iniciado en el puerto 8080");
});