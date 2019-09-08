const { google } = require('googleapis');
const fs = require('fs');

module.exports = function () {
    var googleapis = {
        subirImagen: function (req, res) {
            console.log(req.file);
            const drive = google.drive({ version: "v3" });
            var fileMetadata = {
                'name': "prueba"
            };
            var media = {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(req.file.path)
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
    return googleapis;
}