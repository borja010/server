module.exports = function (ejecutar_consulta) {
	var movil = {
		obtenerClientes: function (req, res) {
			var consulta = "SELECT c.codigo_cliente, CONCAT(nombres,' ', apellido1, ' ', apellido2) nombres, COALESCE((select sum(monto) from credito where cliente = c.codigo_cliente),0) saldo  FROM cliente c WHERE c.existe = true";
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
			var consulta = "INSERT INTO entrada_salida(fecha, empleado, entrada_salida, hora) VALUES (NOW(), $1, $2, NOW()) RETURNING *";
			var parametros = [req.body.empleado, req.body.tipo_transaccion];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarDigital: function (req, res) {
			var consulta = "INSERT INTO digital(galones, monetario, empleado, bomba_manguera, tipo_combustible, fecha, hora) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)";
			var parametros = [req.body.galones, req.body.monetario, req.body.empleado, req.body.bomba_manguera, req.body.tipo_combustible];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		insertarAnaloga: function (req, res) {
			var consulta = "INSERT INTO analoga(mecanicas, precio_unitario, empleado, bomba_manguera, tipo_combustible, fecha, hora) VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)";
			var parametros = [req.body.galones, req.body.monetario, req.body.empleado, req.body.mecanica, req.body.bomba_manguera, req.body.tipo_combustible];
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