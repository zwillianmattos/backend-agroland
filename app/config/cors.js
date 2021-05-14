// Lista de domínios aceitos
const whitelist = [
    'http://localhost',
    'http://localhost:3000',
    'https://backend-plant-care.herokuapp.com',
    'http://backend-plant-care.herokuapp.com'
];

corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('The CORS policy for this site does not allow access from the specified Origin.')
        }
    }
};

module.exports = corsOptions;
