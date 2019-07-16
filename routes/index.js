var express  = require('express');
var router = express.Router();
var ejecutar_consulta = require('./ejecutor.js')();
const movil = require('./movil.js')(ejecutar_consulta);
const frontend = require('./frontend.js')(ejecutar_consulta);
const manejador = require('./manejador.js')();
const mongo = require('./mongo.js')();

router.post('/api/seguro/frontend/obtenerClientes/', frontend.obtenerClientes);
router.post('/api/seguro/frontend/obtenerClientesTotal/', frontend.obtenerClientesTotal);
router.post('/api/seguro/frontend/insertarCliente/', frontend.insertarCliente);
router.post('/api/seguro/frontend/modificarCliente/', frontend.modificarCliente);
router.post('/api/seguro/frontend/eliminarCliente/', frontend.eliminarCliente);
router.post('/api/seguro/frontend/obtenerTipoEmpleado/', frontend.obtenerTipoEmpleado);
router.post('/api/seguro/frontend/obtenerEmpleados/', frontend.obtenerEmpleados);
router.post('/api/seguro/frontend/obtenerEmpleadosTotal/', frontend.obtenerEmpleadosTotal);
router.post('/api/seguro/frontend/insertarEmpleado/', frontend.insertarEmpleado);
router.post('/api/seguro/frontend/modificarEmpleado/', frontend.modificarEmpleado);
router.post('/api/seguro/frontend/eliminarEmpleado/', frontend.eliminarEmpleado);
router.post('/api/seguro/frontend/obtenerMangueras/', frontend.obtenerMangueras);
router.post('/api/seguro/frontend/obtenerAnalogasFechas/', frontend.obtenerAnalogasFechas);
router.post('/api/seguro/frontend/obtenerDigitalesFechas/', frontend.obtenerDigitalesFechas);
router.post('/api/seguro/frontend/obtenerPrecioFechas/', frontend.obtenerPrecioFechas);
router.post('/api/seguro/frontend/obtenerEntradaSalidaFechas/', frontend.obtenerEntradaSalidaFechas);
router.post('/api/seguro/frontend/obtenerClientesSaldos/', frontend.obtenerClientesSaldos);
router.post('/api/seguro/frontend/obtenerTransaccionesCliente/', frontend.obtenerTransaccionesCliente);
router.post('/api/seguro/frontend/obtenerTotalTransaccionesCliente/', frontend.obtenerTotalTransaccionesCliente);
router.post('/api/seguro/frontend/guardarUsuario/', mongo.guardarUsuario);
router.post('/api/seguro/frontend/obtenerUsuario/', mongo.obtenerUsuario);

router.post('/api/seguro/movil/obtenerClientes/', movil.obtenerClientes);
router.post('/api/seguro/movil/obtenerEmpleados/', movil.obtenerEmpleados);
router.post('/api/seguro/movil/insertarEntradaSalida/', movil.insertarEntradaSalida);
router.post('/api/seguro/movil/insertarDigital/', movil.insertarDigital);
router.post('/api/seguro/movil/insertarAnaloga/', movil.insertarAnaloga);
router.post('/api/seguro/movil/insertarCredito/', movil.insertarCredito);

router.post('/api/seguro/verificarUsuario', manejador.verificarUsuario);

router.post('/api/login/', manejador.autenticar);

router.get('/api/',  function (req, res) {
    res.status(200).send("hola mundo");
});

module.exports = router;
