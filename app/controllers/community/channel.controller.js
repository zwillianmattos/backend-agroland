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

    },
    async delete(req, res) {
        try {
            const { channel } = req.params
            const user = req.user

            let channelFind = await Channel.findOne({
                attributes: ['id', 'name', 'slug', 'createdAt', 'updatedAt'],
                where: {
                    channel: channel,
                    user: user.id
                }
            })

            if (empty(channelFind)) {
                throw ("Ocorreu um erro ao remover Channel!");
            }

            Channel.update({
                excluded: 1,
            }, {
                where: {
                    channel: channel,
                    user: user.id
                }
            }).then(async (t) => {
                await Replies.update({
                    excluded: 1,
                }, {
                    where: {
                        channel: channel
                    }
                })
            })

            res.status(200).json({
                status: true,
                message: "Channel excluído com sucesso!!!"
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    }
}