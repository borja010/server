var express = require('express');
var router = express.Router();
var ejecutar_consulta = require('./ejecutor.js')();
const movil = require('./movil.js')(ejecutar_consulta);
const frontend = require('./frontend.js')(ejecutar_consulta);
const manejador = require('./manejador.js')();
const mongo = require('./mongo.js')();
const googleapis = require('./google.js')();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

router.post('/seguro/frontend/obtenerClientes/', frontend.obtenerClientes);
router.post('/seguro/frontend/obtenerClientesTotal/', frontend.obtenerClientesTotal);
router.post('/seguro/frontend/insertarCliente/', frontend.insertarCliente);
router.post('/seguro/frontend/modificarCliente/', frontend.modificarCliente);
router.post('/seguro/frontend/eliminarCliente/', frontend.eliminarCliente);
router.post('/seguro/frontend/obtenerTipoEmpleado/', frontend.obtenerTipoEmpleado);
router.post('/seguro/frontend/obtenerEmpleados/', frontend.obtenerEmpleados);
router.post('/seguro/frontend/obtenerEmpleadosTotal/', frontend.obtenerEmpleadosTotal);
router.post('/seguro/frontend/insertarEmpleado/', frontend.insertarEmpleado);
router.post('/seguro/frontend/modificarEmpleado/', frontend.modificarEmpleado);
router.post('/seguro/frontend/eliminarEmpleado/', frontend.eliminarEmpleado);
router.post('/seguro/frontend/obtenerMangueras/', frontend.obtenerMangueras);
router.post('/seguro/frontend/obtenerAnalogasFechas/', frontend.obtenerAnalogasFechas);
router.post('/seguro/frontend/obtenerDigitalesFechas/', frontend.obtenerDigitalesFechas);
router.post('/seguro/frontend/obtenerPrecioFechas/', frontend.obtenerPrecioFechas);
router.post('/seguro/frontend/obtenerEntradaSalidaFechas/', frontend.obtenerEntradaSalidaFechas);
router.post('/seguro/frontend/obtenerClientesSaldos/', frontend.obtenerClientesSaldos);
router.post('/seguro/frontend/obtenerTransaccionesCliente/', frontend.obtenerTransaccionesCliente);
router.post('/seguro/frontend/obtenerTotalTransaccionesCliente/', frontend.obtenerTotalTransaccionesCliente);
router.post('/seguro/frontend/guardarUsuario/', mongo.guardarUsuario);
router.post('/seguro/frontend/obtenerUsuario/', mongo.obtenerUsuario);

router.post('/seguro/movil/obtenerClientes/', movil.obtenerClientes);
router.post('/seguro/movil/obtenerEmpleados/', movil.obtenerEmpleados);
router.post('/seguro/movil/insertarEntradaSalida/', movil.insertarEntradaSalida);
router.post('/seguro/movil/insertarDigital/', movil.insertarDigital);
router.post('/seguro/movil/insertarAnaloga/', movil.insertarAnaloga);
router.post('/seguro/movil/insertarVale/', movil.insertarVale);
router.post('/seguro/movil/eliminarVale/', movil.eliminarVale);
router.post('/seguro/movil/insertarPago/', movil.insertarPago);
router.post('/seguro/movil/obtenerVale/', movil.obtenerVale);

let upload = multer({ storage: storage });
router.post('/seguro/google/subirImage/', upload.single("file"), googleapis.subirImagen);

router.post('/seguro/verificarUsuario/', manejador.verificarUsuario);

router.post('/login/', manejador.autenticar);

router.get('/', function (req, res) {
    res.status(200).send("hola mundo");
});

module.exports = router;
