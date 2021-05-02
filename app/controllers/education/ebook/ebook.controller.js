const { Documents, Category } = require('../../../models');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const ebooks = await Documents.findAll({
                attributes: ['id', 'name', 'author', 'description', 'file', 'createdAt'],
                include: [{
                    model: Category,
                    required:true,
                    attributes: ['description']
                },],
                where: {
                    EXCLUDED: 0
                },
            });

            res.status(200).json({
                status: true,
                data: ebooks
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                data: []
            })
        }
    }
}