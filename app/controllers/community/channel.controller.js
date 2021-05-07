const { Channel } = require('../../../database/models');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const channels = await Channel.findAll({
                attributes: ['id', 'name', 'slug', 'createdAt', 'updatedAt']
            })

            res.status(200).json(channels)
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
    async store(req, res) {
        try {
            const { name, slug } = req.body;

            const channel = await Channel.create({
                name: name,
                slug: slug,
            })

            res.status(200).json({
                channel
            })
        } catch (e) {

            res.status(500).json({
                status: false,
                message: e
            })
        }

    }
}