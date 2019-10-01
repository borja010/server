module.exports = function (ejecutar_consulta) {

	function insertRecursivo(index, query, params, res) {
		if (index < params.length) {
			ejecutar_consulta.exec(query, params[index], function (data) {
				index++;
				insertRecursivo(index, query, params, res)
			});
		}
		else {
			res.status(200).send(true);
		}
	}

	var movil = {
		obtenerClientes: function (req, res) {
			var consulta = "SELECT c.codigo_cliente, CONCAT(c.nombres,' ', c.apellido1, ' ', c.apellido2) nombres  FROM cliente c WHERE c.existe = true";
			var parametros = [];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		obtenerEmpleados: function (req, res) {
			var consulta = "SELECT codigo_empleado, CONCAT(nombres,' ', apellido1, ' ', apellido2) nombres FROM empleado WHERE existe = true";
			var parametros = [];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarEntradaSalida: function (req, res) {
			var consulta = "select insertar_entrada_salida($1,$2,$3)";
			var parametros = [req.body.empleado, req.body.supervisor, req.body.tipo_transaccion];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarDigital: function (req, res) {
			var consulta = "INSERT INTO digital(galones, monetario, empleado, manguera, fecha, hora) VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)";
			var parametros = [req.body.galones, req.body.monetario, req.body.empleado, req.body.manguera];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarDigitales: function (req, res) {
			var consulta = "INSERT INTO digital(galones, monetario, empleado, manguera, fecha, hora) VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)";
			var digitales = req.body.digitales;
			if (digitales.length > 0) {
				var salidas = [];
				digitales.forEach(element => {
					salidas.push([element.galones, element.monetario, req.body.empleado, element.codigo_manguera]);
				});
				insertRecursivo(0, consulta, salidas, res);
			}
		},
		insertarAnaloga: function (req, res) {
			var consulta = "INSERT INTO analoga(mecanicas, precio_unitario, empleado, manguera, fecha, hora) VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)";
			var parametros = [req.body.mecanica, req.body.precio_unitario, req.body.empleado, req.body.manguera];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarAnalogas: function (req, res) {
			var consulta = "INSERT INTO analoga(mecanicas, precio_unitario, empleado, manguera, fecha, hora) VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)";
			var analogas = req.body.analogas;
			if (analogas.length > 0) {
				var salidas = [];
				analogas.forEach(element => {
					salidas.push([element.mecanicas, element.precio, req.body.empleado, element.codigo_manguera]);
				});
				insertRecursivo(0, consulta, salidas, res);
			}
		},
		insertarVale: function (req, res) {
			var consulta = "select insertar_vale($1, $2, $3, $4, $5, $6)";
			var parametros = [req.body.numero, req.body.cliente, req.body.monto, req.body.empleado, req.body.descripcion, "Pendiente"];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarPago: function (req, res) {
			var consulta = "select insertar_pago($1, $2, $3, $4)";
			var parametros = [req.body.monto, req.body.vale, req.body.empleado, req.body.descripcion];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		obtenerVale: function (req, res) {
			var consulta = "select v.codigo_vale, v.monto, v.estado, (select sum(monto) from pago where vale = v.codigo_vale) pagos, concat(c.nombres,' ', c.apellido1, ' ', c.apellido2) nombres from vale v inner join cliente c on v.cliente = c.codigo_cliente where v.numero = $1";
			var parametros = [req.body.numero];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		}
	}
	return movil;
}