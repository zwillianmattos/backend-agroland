const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const server = require('./app/config/express')();

server.listen(PORT, HOST, function () {
    console.info("\n[ENVIRONMENT]: ", process.env.NODE_ENV);
    console.info('[APP]:', process.env.app_name);
    console.info('[API HOST]:', HOST);
    console.info('[API PORT]:', PORT);
    console.info('[API VERSION]:', process.env.app_version);
    console.info('[SMTP HOST]:', process.env.smtp_host);
    console.info('[SMTP PORT]:', process.env.smtp_port);
});
