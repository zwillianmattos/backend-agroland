const multer = require('multer')

// Configuração do multer
const storage = multer.diskStorage({
    /** Define o destino dos uploads */
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    /** Define a forma como são gravados os arquivos enviados */
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

module.exports = multer({ storage });
