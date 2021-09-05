module.exports = {
    development: {
        username: 'root',
        password: 'root',
        database: 'plant_care',
        host: 'host.docker.internal',
        dialect: 'mysql',
        port: 3308
    },
    test: {
        username: 'u975537847_plantcare',
        password: '4KlbmHmwDk!',
        database: 'u975537847_plantcare',
        host: 'sql124.main-hosting.eu',
        dialect: 'mysql'
    },
    production: {
        username: 'bricom_plantcare',
        password: '{)X0Fe5)V1va',
        database: 'bricom_plantcare',
        host: '162.241.203.115',
        dialect: 'mysql'
    }
};
