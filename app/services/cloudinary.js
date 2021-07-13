require('../config/dotenv');
const cloudinary = require('cloudinary');

module.exports = {
    uploads(file, path = '/') {
        return new Promise(async (resolve, reject) => {
            cloudinary.config({
                cloud_name: process.env.cloudinary_name,
                api_key: process.env.cloudinary_api_key,
                api_secret: process.env.cloudinary_api_secret
            });

            console.log("uploading")

            cloudinary.uploader.upload(file, {
                folder: `${path}`, 
                transformation: [
                    { width: 128, crop: "scale" },
                    { quality: "auto", fetch_format: "auto" }
                ]
            })
                .then(result => {
                    resolve({ url: result.url, id: result.public_id })
                })
                .catch(error => {
                    reject(error);
                })
        }, { resource_type: "auto" })
    }
};
