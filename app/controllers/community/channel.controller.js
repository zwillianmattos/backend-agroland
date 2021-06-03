const { Channel, Thread, Replies } = require('../../../database/models');
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

            let channelRemoved = await Channel.update({
                excluded: 1,
            }, {
                where: {
                    id: channel,
                    excluded: 0,
                }
            })

            if (!channelRemoved[0]) {
                throw ("Falha ao excluir Channel")
            }

            await Thread.update({
                excluded: 1,
            }, {
                where: {
                    channel: channel
                }
            })

            const threadExcluded = await Thread.findAll({
                attributes: ['id'],
                where: {
                    excluded: 1,
                    channel: channel
                }
            })

            await Replies.update({
                excluded: 1,
            }, {
                where: {
                    thread: threadExcluded.map( x => x.id )
                }
            })

            res.status(200).json({ status: true, message: "Comentário excluído" })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    }
}