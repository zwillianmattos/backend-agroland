/**
 * Configuração de ambiente
 */
var environment;

// Define qual arquivo de configurações deve ser utilizado
switch (process.env.NODE_ENV) {
    case "development":
        environment = ".env.dev";
        break;
    case "test":
        environment = ".env.test";
        break;
    case "production":
    default:
        environment = ".env";
        break;
}

require('dotenv').config({
    path: environment
});
