const { google } = require('googleapis');
const fs = require('fs');
const credentials = require('./credentials.json');
const scopes = [
    'https://www.googleapis.com/auth/drive'
];

module.exports = function () {
    var googleapis = {
        subirImagen: function (req, res) {
            const auth = new google.auth.JWT(
                credentials.client_email, null,
                credentials.private_key, scopes
            );
            const drive = google.drive({ version: 'v3', auth });
            var fileMetadata = {
                name: "prueba",
                parents: ['1c6Hp1hcEEfqq7slLuXu1UK0ZAC2Wlu3G']
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