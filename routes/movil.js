module.exports = function (ejecutar_consulta) {
	var movil = {
		obtenerClientes: function (req, res) {
			var consulta = "SELECT c.codigo_cliente, CONCAT(nombres,' ', apellido1, ' ', apellido2) nombres  FROM cliente c WHERE c.existe = true";
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
		insertarAnaloga: function (req, res) {
			var consulta = "INSERT INTO analoga(mecanicas, precio_unitario, empleado, manguera, fecha, hora) VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)";
			var parametros = [req.body.mecanica, req.body.precio_unitario, req.body.empleado, req.body.manguera];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarCredito: function (req, res) {
			var consulta = "INSERT INTO credito(tipo_transaccion, monto, descripcion, empleado, cliente, fecha, hora) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)";
			var parametros = [req.body.tipo_transaccion, req.body.monto, req.body.descripcion, req.body.empleado, req.body.cliente];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
	}
	return movil;
}