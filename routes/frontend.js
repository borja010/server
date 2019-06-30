module.exports = function(ejecutar_consulta){
	var frontend = {
		obtenerClientes: function(req,res){
			var consulta = `SELECT codigo_cliente, nombres, CONCAT(apellido1, ' ', apellido2) apellidos, dpi, telefono, celular, nit, genero FROM cliente 
							WHERE existe = true AND (LOWER(nombres) LIKE COALESCE($1,nombres) OR LOWER(apellido1) LIKE COALESCE($1,apellido1) OR LOWER(apellido2) LIKE COALESCE($1,apellido2) OR LOWER(dpi) LIKE COALESCE($1,dpi))
							ORDER BY codigo_cliente ASC LIMIT $2 OFFSET $3`;
			var parametros = ["%"+req.body.busqueda.toLowerCase()+"%", req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerClientesTotal: function(req,res){
			var consulta = `SELECT COUNT(1) FROM (SELECT codigo_cliente FROM cliente 
							WHERE existe = true AND (LOWER(nombres) LIKE COALESCE($1,nombres) OR LOWER(apellido1) LIKE COALESCE($1,apellido1) OR LOWER(apellido2) LIKE COALESCE($1,apellido2) OR LOWER(dpi) LIKE COALESCE($1,dpi)) 
							ORDER BY codigo_cliente ASC)a`;
			var parametros = ["%"+req.body.busqueda.toLowerCase()+"%"];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		insertarCliente: function(req,res){
			var consulta = "select insertar_cliente($1,$2,$3,$4,$5,$6,$7,$8)";
			var parametros = [req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.telefono, req.body.celular, req.body.nit, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		modificarCliente: function(req,res){
			var consulta = "select modificar_cliente($1,$2,$3,$4,$5,$6,$7,$8,$9)";
			var parametros = [req.body.codigo_cliente, req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.telefono, req.body.celular, req.body.nit, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		eliminarCliente: function(req,res){
			var consulta = "UPDATE cliente SET existe = false WHERE codigo_cliente = $1";
			var parametros = [req.body.codigo_cliente];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerEmpleados: function(req,res){
			var consulta = `SELECT codigo_empleado, nombres, CONCAT(apellido1, ' ', apellido2) apellidos, tipo_empleado, dpi, telefono, celular, genero FROM empleado 
							WHERE existe = true AND (LOWER(nombres) LIKE COALESCE($1,nombres) OR LOWER(apellido1) LIKE COALESCE($1,apellido1) OR LOWER(apellido2) LIKE COALESCE($1,apellido2) OR LOWER(dpi) LIKE COALESCE($1,dpi) OR LOWER(tipo_empleado) LIKE COALESCE($1,tipo_empleado))
							ORDER BY codigo_empleado ASC LIMIT $2 OFFSET $3`;
			var parametros = ["%"+req.body.busqueda.toLowerCase()+"%", req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerEmpleadosTotal: function(req,res){
			var consulta = `SELECT COUNT(1) FROM (SELECT codigo_empleado FROM empleado 
							WHERE existe = true AND (LOWER(nombres) LIKE COALESCE($1,nombres) OR LOWER(apellido1) LIKE COALESCE($1,apellido1) OR LOWER(apellido2) LIKE COALESCE($1,apellido2) OR LOWER(dpi) LIKE COALESCE($1,dpi) OR LOWER(tipo_empleado) LIKE COALESCE($1,tipo_empleado))
							ORDER BY codigo_empleado ASC)a`;
			var parametros = ["%"+req.body.busqueda.toLowerCase()+"%"];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		insertarEmpleado: function(req,res){
			var consulta = "SELECT insertar_empleado($1,$2,$3,$4,$5,$6,$7,$8)";
			var parametros = [req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.dpi, req.body.tipo_empleado, req.body.telefono, req.body.celular, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		modificarEmpleado:	 function(req,res){
			var consulta = "SELECT modificar_empleado($1,$2,$3,$4,$5,$6,$7,$8,$9)";
			var parametros = [req.body.codigo_empleado, req.body.nombres, req.body.apellido1, req.body.apellido2, req.body.tipo_empleado, req.body.dpi, req.body.telefono, req.body.celular, req.body.genero];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		eliminarEmpleado: function(req,res){
			var consulta = "UPDATE empleado SET existe = false WHERE codigo_empleado = $1";
			var parametros = [req.body.codigo_empleado];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerAnalogasFechas: function(req,res){
			var consulta = "SELECT * FROM analogas_fechas($1,$2,$3)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.bombas];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerDigitalesFechas: function(req,res){
			var consulta = "SELECT * FROM digitales_fechas($1,$2,$3)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.bombas];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerPrecioFechas: function(req,res){
			var consulta = "SELECT * FROM precio_fechas($1,$2,$3)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, req.body.bombas];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerEntradaSalidaFechas: function(req,res){
			var consulta = "SELECT * FROM entrada_salida_fechas($1,$2)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerClientesSaldos: function(req,res){
			var consulta = "SELECT * FROM clientes_saldos($1,$2,$3,$4,$5)";
			var parametros = [req.body.fecha_inicio, req.body.fecha_final, "%"+req.body.busqueda.toLowerCase()+"%", req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerTransaccionesCliente: function(req,res){
			var consulta = "SELECT * FROM credito where cliente = $1 AND fecha >= $2 and fecha <= $3 ORDER BY fecha ASC, hora ASC LIMIT $4 OFFSET $5";
			var parametros = [req.body.codigo_cliente, req.body.fecha_inicio, req.body.fecha_final, req.body.limit, req.body.offset];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
		obtenerTotalTransaccionesCliente: function(req,res){
			var consulta = "SELECT COUNT(1) FROM (SELECT * FROM credito where cliente = $1 AND fecha >= $2 and fecha <= $3 ORDER BY fecha ASC, hora ASC)a";
			var parametros = [req.body.codigo_cliente, req.body.fecha_inicio, req.body.fecha_final];
			ejecutar_consulta.exec(consulta, parametros, function(data){
				res.status(200).send(data.rows);
			});
		},
	}
	return frontend;
}