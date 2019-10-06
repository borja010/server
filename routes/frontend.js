module.exports = function (ejecutar_consulta) {
	var frontend = {
		obtenerClientesMovil: function (req, res) {
			var consulta = "SELECT c.codigo_cliente, CONCAT(c.nombres,' ', c.apellido1, ' ', c.apellido2) nombres  FROM cliente c WHERE c.existe = true";
			var parametros = [];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data);
			});
		},
		obtenerClientes: function (req, res) {
			var consulta = `SELECT codigo_cliente, nombres, CONCAT(apellido1, ' ', apellido2) apellidos, dpi, telefono, celular, nit, genero FROM cliente 
							WHERE existe = true AND (LOWER(nombres) LIKE COALESCE($1,nombres) OR LOWER(apellido1) LIKE COALESCE($1,apellido1) OR LOWER(apellido2) LIKE COALESCE($1,apellido2) OR LOWER(dpi) LIKE COALESCE($1,dpi))
							ORDER BY codigo_cliente ASC LIMIT $2 OFFSET $3`;
			var parametros = ["%" + req.body.busqueda.toLowerCase() + "%", req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerClientesTotal: function (req, res) {
			var consulta = `SELECT COUNT(1) FROM (SELECT codigo_cliente FROM cliente 
							WHERE existe = true AND (LOWER(nombres) LIKE COALESCE($1,nombres) OR LOWER(apellido1) LIKE COALESCE($1,apellido1) OR LOWER(apellido2) LIKE COALESCE($1,apellido2) OR LOWER(dpi) LIKE COALESCE($1,dpi)) 
							ORDER BY codigo_cliente ASC)a`;
			var parametros = ["%" + req.body.busqueda.toLowerCase() + "%"];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		insertarCliente: function (req, res) {
			var consulta = "select insertar_cliente($1,$2,$3,$4,$5,$6,$7,$8)";
			var parametros = [req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.telefono, req.body.celular, req.body.nit, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		modificarCliente: function (req, res) {
			var consulta = "select modificar_cliente($1,$2,$3,$4,$5,$6,$7,$8,$9)";
			var parametros = [req.body.codigo_cliente, req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.telefono, req.body.celular, req.body.nit, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		eliminarCliente: function (req, res) {
			var consulta = "UPDATE cliente SET existe = false WHERE codigo_cliente = $1";
			var parametros = [req.body.codigo_cliente];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerTipoEmpleado: function (req, res) {
			var consulta = `SELECT * FROM tipo_empleado WHERE existe = true`;
			var parametros = [];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerEmpleados: function (req, res) {
			var consulta = `SELECT e.codigo_empleado, e.nombres, CONCAT(e.apellido1, ' ', e.apellido2) apellidos, t.descripcion tipo_empleado, e.dpi, e.telefono, e.celular, e.genero FROM empleado e INNER JOIN tipo_empleado t ON e.tipo_empleado = t.codigo_tipo_empleado
							WHERE e.existe = true AND (LOWER(e.nombres) LIKE $1 OR LOWER(e.apellido1) LIKE $1 OR LOWER(e.apellido2) LIKE $1 OR LOWER(e.dpi) LIKE $1)
							ORDER BY e.codigo_empleado ASC LIMIT $2 OFFSET $3`;
			var parametros = ["%" + req.body.busqueda.toLowerCase() + "%", req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerEmpleadosTotal: function (req, res) {
			var consulta = `SELECT COUNT(1) FROM (SELECT codigo_empleado FROM empleado 
							WHERE existe = true AND (LOWER(nombres) LIKE $1 OR LOWER(apellido1) LIKE $1 OR LOWER(apellido2) LIKE $1 OR LOWER(dpi) LIKE $1)
							ORDER BY codigo_empleado ASC)a`;
			var parametros = ["%" + req.body.busqueda.toLowerCase() + "%"];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		insertarEmpleado: function (req, res) {
			var consulta = "SELECT insertar_empleado($1,$2,$3,$4,$5,$6,$7,$8)";
			var parametros = [req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.tipoEmpleado, req.body.telefono, req.body.celular, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		modificarEmpleado: function (req, res) {
			var consulta = "SELECT modificar_empleado($1,$2,$3,$4,$5,$6,$7,$8,$9)";
			var parametros = [req.body.codigo_empleado, req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.tipoEmpleado, req.body.telefono, req.body.celular, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		eliminarEmpleado: function (req, res) {
			var consulta = "UPDATE empleado SET existe = false WHERE codigo_empleado = $1";
			var parametros = [req.body.codigo_empleado];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerMangueras: function (req, res) {
			var consulta = "SELECT m.codigo_manguera, m.descripcion, t.codigo_tipo_combustible, t.descripcion tipo_combustible FROM manguera m INNER JOIN tipo_combustible t ON m.tipo_combustible = t.codigo_tipo_combustible WHERE m.existe = true";
			var parametros = [];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerAnalogasFechas: function (req, res) {
			var consulta = "SELECT * FROM analogas_fechas($1,$2,$3)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.mangueras];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerDigitalesFechas: function (req, res) {
			var consulta = "SELECT * FROM digitales_fechas($1,$2,$3)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.mangueras];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerPrecioFechas: function (req, res) {
			var consulta = "SELECT * FROM precio_fechas($1,$2,$3)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.mangueras];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerEntradaSalidaFechas: function (req, res) {
			var consulta = "SELECT * FROM entrada_salida_fechas($1,$2)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerVales: function (req, res) {
			var consulta = "SELECT * FROM vales($1,$2,$3,$4)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.estado, req.body.cliente];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerPagos: function (req, res) {
			var consulta = "SELECT p.descripcion, p.monto, p.fecha, p.hora, CONCAT(e.nombres,' ', e.apellido1, ' ', e.apellido2) nombres_empleado FROM pago p INNER JOIN empleado e ON p.empleado = e.codigo_empleado WHERE p.vale = $1 ORDER BY p.codigo_pago ASC LIMIT $2 OFFSET $3";
			var parametros = [req.body.codigo_vale, req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerTotalPagos: function (req, res) {
			var consulta = "SELECT COUNT(1) FROM (SELECT p.descripcion, p.monto, p.fecha, p.hora, CONCAT(e.nombres,' ', e.apellido1, ' ', e.apellido2) nombres_empleado FROM pago p INNER JOIN empleado e ON p.empleado = e.codigo_empleado WHERE p.vale = $1 ORDER BY p.codigo_pago ASC)a";
			var parametros = [req.body.codigo_vale];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		obtenerTipoCombustible: function (req, res) {
			var consulta = "SELECT * FROM tipo_combustible WHERE existe = true";
			var parametros = [];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		eliminarTipoEmpleado: function (req, res) {
			var consulta = "UPDATE tipo_empleado SET existe = false WHERE codigo_tipo_empleado = $1";
			var parametros = [req.body.codigo_tipo_empleado];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		eliminarManguera: function (req, res) {
			var consulta = "UPDATE manguera SET existe = false WHERE codigo_manguera = $1";
			var parametros = [req.body.codigo_manguera];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		eliminarTipoCombustible: function (req, res) {
			var consulta = "UPDATE tipo_combustible SET existe = false WHERE codigo_tipo_combustible = $1";
			var parametros = [req.body.codigo_tipo_combustible];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		insertarManguera: function (req, res) {
			var consulta = "select insertar_manguera($1,$2)";
			var parametros = [req.body.descripcion, req.body.tipo_combustible];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		insertarTipoEmpleado: function (req, res) {
			var consulta = "select insertar_tipo_empleado($1)";
			var parametros = [req.body.descripcion];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},
		insertarTipoCombustible: function (req, res) {
			var consulta = "select insertar_combustible($1)";
			var parametros = [req.body.descripcion];
			ejecutar_consulta.exec(consulta, parametros, function (data) {
				res.status(200).send(data.rows);
			});
		},

	}
	return frontend;
}