const { Replies } = require('../../../database/models');
const Sequelize = require('sequelize');

module.exports = {
    async store(req, res) {
        try {
            const { body } = req.body;
            const user = req.user;
            const { thread } = req.params;

            const replie = await Replies.create({
                user: user.id,
                thread: thread,
                body: body
            })

            res.status(200).json({
                replie
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
            const { body } = req.body;
            const user = req.user;
            const { id, channel, thread } = req.params;

            const replie = await Replies.update({
                body: body
            }, {
                where: {
                    channel: channel,
                    thread: thread,
                    id: id,
                    user: user.id,
                    excluded: 0,
                }
            })

            res.status(200).json({
                status: true,
                message: "Replie atualizada com sucesso!!!",
                data: replie
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
}