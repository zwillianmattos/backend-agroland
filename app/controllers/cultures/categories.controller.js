const { CultureCategorie } = require('../../../database/models');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const CulturesCategories = await CultureCategorie.findAll({
                attributes: ['id', 'icon', ,'description', 'createdAt', 'updatedAt']
            })

            res.status(200).json(CulturesCategories)
        } catch (e) {
            console.e(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
    
}