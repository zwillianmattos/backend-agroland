const cors = require('cors');
const corsConfig = require('../config/cors');

const error404 = (req, res) => {
    res.status(404).json({
        status: false,
        message: "Bad Request"
    });
}

module.exports = (app) => {
    app.use(cors())
    
    app.get('/version', (req, res) => {
        const { app_version } = process.env
        res.status(200).json({ api_version: app_version })
    })

    app.use('/api/v1', require('./v1'));

    app.get('*', error404);
    app.post('*', error404);
    app.put('*', error404);
    app.delete('*', error404);
}
