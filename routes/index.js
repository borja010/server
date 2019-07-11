var express  = require('express');
var router = express.Router();
var ejecutar_consulta = require('./ejecutor.js')();
const movil = require('./movil.js')(ejecutar_consulta);
const frontend = require('./frontend.js')(ejecutar_consulta);
const manejador = require('./manejador.js')();
const mongo = require('./mongo.js')();

router.post('/api/frontend/obtenerClientes/', frontend.obtenerClientes);
router.post('/api/frontend/obtenerClientesTotal/', frontend.obtenerClientesTotal);
router.post('/api/frontend/insertarCliente/', frontend.insertarCliente);
router.post('/api/frontend/modificarCliente/', frontend.modificarCliente);
router.post('/api/frontend/eliminarCliente/', frontend.eliminarCliente);
router.post('/api/frontend/obtenerTipoEmpleado/', frontend.obtenerTipoEmpleado);
router.post('/api/frontend/obtenerEmpleados/', frontend.obtenerEmpleados);
router.post('/api/frontend/obtenerEmpleadosTotal/', frontend.obtenerEmpleadosTotal);
router.post('/api/frontend/insertarEmpleado/', frontend.insertarEmpleado);
router.post('/api/frontend/modificarEmpleado/', frontend.modificarEmpleado);
router.post('/api/frontend/eliminarEmpleado/', frontend.eliminarEmpleado);
router.post('/api/frontend/obtenerMangueras/', frontend.obtenerMangueras);
router.post('/api/frontend/obtenerAnalogasFechas/', frontend.obtenerAnalogasFechas);
router.post('/api/frontend/obtenerDigitalesFechas/', frontend.obtenerDigitalesFechas);
router.post('/api/frontend/obtenerPrecioFechas/', frontend.obtenerPrecioFechas);
router.post('/api/frontend/obtenerEntradaSalidaFechas/', frontend.obtenerEntradaSalidaFechas);
router.post('/api/frontend/obtenerClientesSaldos/', frontend.obtenerClientesSaldos);
router.post('/api/frontend/obtenerTransaccionesCliente/', frontend.obtenerTransaccionesCliente);
router.post('/api/frontend/obtenerTotalTransaccionesCliente/', frontend.obtenerTotalTransaccionesCliente);
router.post('/api/frontend/guardarUsuario/', mongo.guardarUsuario);
router.post('/api/frontend/obtenerUsuario/', mongo.obtenerUsuario);

router.post('/api/movil/obtenerClientes/', movil.obtenerClientes);
router.post('/api/movil/obtenerEmpleados/', movil.obtenerEmpleados);
router.post('/api/movil/insertarEntradaSalida/', movil.insertarEntradaSalida);
router.post('/api/movil/insertarDigital/', movil.insertarDigital);
router.post('/api/movil/insertarAnaloga/', movil.insertarAnaloga);
router.post('/api/movil/insertarCredito/', movil.insertarCredito);

router.post('/api/verificarUsuario', manejador.verificarUsuario);

router.post('/login/', manejador.autenticar);

router.get('/',  function (req, res) {
    res.send({mensaje: "hola mundo"});
});

module.exports = router;
