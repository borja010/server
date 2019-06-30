var fs = require('fs');

module.exports = function(){
	var settings = {
		obtenerTipoEmpleado: function(req, res){
			fs.readFile(__dirname + '/configuracion', 'utf8', function(err, data) {  
                if (err) throw err;
				var aux = JSON.parse(data);
				res.status(200).send(aux.tipo_empleado);
            });
		},
		obtenerTipoCombustible: function(req, res){
			fs.readFile(__dirname + '/configuracion', 'utf8', function(err, data) {  
                if (err) throw err;
				var aux = JSON.parse(data);
				res.status(200).send(aux.tipo_combustible);
            });
		},
		obtenerTotalBombaManguera: function(req, res){
			fs.readFile(__dirname + '/configuracion', 'utf8', function(err, data) {  
                if (err) throw err;
				var aux = JSON.parse(data);
				res.status(200).send({total_bomba_manguera: aux.total_bomba_manguera});
            });
		},
	}
	return settings;
}