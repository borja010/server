const { googleapis } = require('googleapis');

module.exports = function () {
    var google = {
        subirImagen: function (req, res) {
            const drive = googleapis.drive({ version: "v3" });
            var fileMetadata = {
                'name': req.body.name
            };
            var media = {
                mimeType: 'image/jpeg',
                body: req.body.image
            };
            drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            }, (err, file) => {
                if (err) {
                    res.status(200).send({ estado: -1, mensaje: "Error insertar la imagen, intentar mas tarde" });
                    console.log(err);
                } else {
                    res.status(200).send({ estado: 1, mensaje: "Imagen insertada correctamente", id: file.id });
                    console.log(file.id);
                }
            })
        }
    }
    return google;
}