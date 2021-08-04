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
        username: 'u975537847_root',
        password: '4KlbmHmwDk!',
        database: 'u975537847_plant',
        host: '85.10.205.173',
        dialect: 'mysql'
    }
};
