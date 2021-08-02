const { Culture } = require('../../../database/models');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const Cultures = await Culture.findAll({
                attributes: ['id', 'name', 'icon', ,'description', 'createdAt', 'updatedAt']
            })

            res.status(200).json(Culture)
        } catch (e) {
            console.e(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
    
}