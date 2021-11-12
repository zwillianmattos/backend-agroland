
const { empty, removeFiles } = require('../../utils/utils');
const cloudinary = require('../../services/cloudinary');
module.exports = {
    uploadPhotos(req, res) {
        const { filename: file } = req.file;

        var imageDetails = {
            name: req.file.filename,
            file: req.file.path,
            file_cloudinary: '',
            public_id: ''
        }

        cloudinary.uploads(imageDetails.file, '/uploads/').then((result) => {

            imageDetails = {
                name: req.body.imageName,
                file: req.file.path,
                file_cloudinary: result.url,
                public_id: result.id
            }

            res.status(200).send({
                status: true,
                message: '',
                data: imageDetails
            });
            removeFiles([req.file]);
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: false,
                message: error
            });
        });
    }
}