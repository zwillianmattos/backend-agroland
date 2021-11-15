
const { Channel, Thread, User, Replies, ThreadLike } = require('../../../database/models');
const { getPagination, getPagingData } = require('../../utils/pagination');
const Sequelize = require('sequelize');
const { empty } = require('../../utils/utils');

module.exports = {
    async like(req, res) {
        try {


            const { channel, thread } = req.params;
            const user = req.user

            let threadExists = await ThreadLike.findOne({
                where: {
                    userId: user.id,
                    threadId: thread
                }
            })

            let result;
            if (threadExists !== null && threadExists) {
                // Remove
                result = await ThreadLike.update({
                    excluded: !threadExists.excluded,
                }, {
                    where: {
                        userId: user.id,
                        threadId: thread
                    }
                })
            } else {
                // Cria
                result = await ThreadLike.create({
                    userId: user.id,
                    threadId: thread
                })
            }

            res.status(200).send({
                status: true,
                message: ""
            })

        } catch (e) {
            console.log(e)
            res.status(500).send({
                status: false,
                message: e
            })
        }
    },
    async showAll(req, res) {
        try {

            const { page, size, q, categoria } = req.query;
            const { limit, offset } = getPagination(page, size)

            const { channel, thread } = req.params;

            const where = {
                id: {
                    [Sequelize.Op.in]: [thread]
                },
                channel: {
                    [Sequelize.Op.in]: [channel]
                },
                excluded: 0
            }

            let include = [

                { model: Channel, attributes: ['id', 'name', 'slug'], required: true, },
                { model: User, attributes: ['id', 'name', 'imgProfile'], required: true, },
                {
                    model: ThreadLike,
                    required: false,
                    attributes: ['id'],
                    where: {
                        excluded: false,
                    },
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'imgProfile'],
                        where: {
                            excluded: false,
                        },
                        required: false,
                    }
                },
                {
                    model: Replies,
                    as: 'Replies',
                    attributes: ['id'],
                    required: false,
                    where: {
                        excluded: 0
                    },
                },
            ]

            const channels = await Thread.findAndCountAll({
                attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
                required: true,
                where: channel != null ? where : {
                    excluded: 0
                },
                include: include,
                limit: limit,
                offset: offset,
            })

            res.status(200).json({
                status: true,
                data: getPagingData(channels, limit, page)
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
    async show(req, res) {
        try {

            const { page, size, q, categoria } = req.query;
            const { limit, offset } = getPagination(page, size)

            const { channel, thread } = req.params;

            const where = {
                id: {
                    [Sequelize.Op.in]: [thread]
                },
                channel: {
                    [Sequelize.Op.in]: [channel]
                },
                excluded: 0
            }

            let include = [

                { model: Channel, attributes: ['id', 'name', 'slug'], required: true, },
                { model: User, attributes: ['id', 'name', 'imgProfile'], required: true, },
                {
                    model: ThreadLike,
                    required: false,
                    attributes: ['id'],
                    where: {
                        excluded: false,
                    },
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'imgProfile'],
                        where: {
                            excluded: false,
                        },
                        required: false,
                    }
                },
                {
                    model: Replies,
                    as: 'Replies',
                    attributes: ['id', 'body', 'createdAt', 'updatedAt'],
                    required: false,
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'imgProfile'],
                        where: {
                            excluded: false,
                        },
                        required: false,
                    },
                    where: {
                        excluded: 0
                    },
                },
            ]

            const channels = await Thread.findAndCountAll({
                attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
                required: true,
                where: channel != null ? where : {
                    excluded: 0
                },
                include: include,
                limit: limit,
                offset: offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            res.status(200).json({
                status: true,
                data: getPagingData(channels, limit, page)
            })
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

    },
    async delete(req, res) {
        try {
            const { channel, thread } = req.params
            const user = req.user

            let removido = await Thread.update({
                excluded: 1,
            }, {
                where: {
                    channel: channel,
                    id: thread,
                    user: user.id,
                    excluded: 0,
                }
            })

            if (!removido[0]) {
                throw ("Falha ao excluir Thread")
            }

            res.status(200).json({
                status: true,
                message: "Thread excluida com sucesso!!!"
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
    async update(req, res) {
        try {
            const { title, body } = req.body;
            const user = req.user;
            const { thread } = req.params;

            let data = {}

            if (title) {
                data.title = title
            }

            if (body) {
                data.body = body
            }

            const update = await Thread.update(data, {
                where: {
                    id: thread,
                    user: user.id,
                    excluded: 0,
                }
            })

            if (!update[0]) {
                throw ("Falha ao atualizar Thread")
            }

            res.status(200).json({
                status: true,
                message: "Thread atualizada com sucesso!!!",
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
