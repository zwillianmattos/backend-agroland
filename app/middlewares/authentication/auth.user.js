require('../../config/dotenv');
const jwt = require("jsonwebtoken");
const { empty } = require("../../utils/utils")

module.exports = function (req, res, next) {
    //get the token from the header if present
    const token = req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send( {
        status: false,
        message: "Acesso negado. Nenhum token fornecido."
    });

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token.replace('authorization ',''), process.env.auth_userkey);
        req.user = decoded;

        // Verify user access another account iformation 
        // if( !empty(req.params.id) && req.params.id != req.user.id ) {
        //     throw "Conta de token inválida";
        // }
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send({
            status: false,
            message: "Token inválido."
        });
    }
};
