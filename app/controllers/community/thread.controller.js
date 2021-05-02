
const { Channel, Thread, User, Replies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const { channel, thread } = req.params;

            const where = {
                id: {
                    [Sequelize.Op.in]: [thread]
                },
                channel: {
                    [Sequelize.Op.in]: [channel]
                },
            }

            let include = [
                { model: User, as: 'User', attributes: ['id', 'name'], required: true, },
                { model: Channel, as: 'Channel', attributes: ['name', 'slug'], required: true, },

            ]

            if (channel != null) {
                include.push({
                    model: Replies,
                    as: 'Replies',
                    attributes: ['id', 'body', 'createdAt', 'updatedAt'],
                    required: false,
                    include: {
                        model: User,
                        as: 'User',
                        attributes: ['id', 'name'],
                        required: true,
                    },
                })
            }


            const channels = await Thread.findAll({
                attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
                where: channel != null ? where : null,
                include: include
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
            const { body, title, channel_id } = req.body;
            const user = req.user;

            const thread = await Thread.create({
                user: user.id,
                channel: channel_id,
                title: title,
                body: body
            })

            res.status(200).json({
                thread
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