require('./dotenv');

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('../services/logger.js');
const cors = require('cors');

const ws = require('../services/websocket.js');

module.exports = () => {
    let app = express();
    app.use(morgan("common", {
        stream: {
            write: mensagem => logger.info(mensagem)
        }
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(cors());

    // Configuração do protocolo HTTP
    const server = require('http').createServer(app);
    // Init services
    ws.connect(server);

    consign({ cwd: './app' })
        .include('controllers')
        .then('services')
        .then('routes/index.js')
        .into({
            app,
            ws
        });

    return server;
};
