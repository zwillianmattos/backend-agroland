const { Replies } = require('../../../database/models');

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
            const { id, thread } = req.params;

            const replie = await Replies.update({
                body: body
            }, {
                where: {
                    thread: thread,
                    id: id,
                    user: user.id,
                    excluded: 0,
                }
            })


            if(!replie[0]){
                throw("Falha ao atualizar replie")
            }
            
            res.status(200).json({
                status: true,
                message: "Replie atualizada com sucesso!!!",
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
            const { thread, replie } = req.params

            const user = req.user

            let removido = await Replies.update({
                excluded: 1,
            }, {
                where: {
                    thread: thread,
                    id: replie,
                    user: user.id,
                    excluded: 0,
                }
            })

            if(!removido[0]){
                throw("Falha ao excluir comentário")
            }
                
            res.status(200).json({status: true, message:"Comentário excluído"})

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    }
}