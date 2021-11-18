const { Calendars, User } = require('../../../database/models');
const Sequelize = require('sequelize');
const { where } = require('sequelize');

module.exports = {
     async create(req, res) {
        try {
            const { title, description, date, hour, site, contact, excluded } = req.body;
            const evento = await Calendars.create({title, description, date, hour, site, contact, excluded})
    
            res.status(200).json({
                status: false,
                message: "adicionado com sucesso",
                evento: evento,
            });
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }       
    }, 
    
    async get(req, res) {
        const { calendarId } = req.params;

        await Calendars.findOne({
            attributes: ['id', 'title', 'description','date','hour', 'site', 'contact'],
            where: {
                id: calendarId,
                excluded: 0
            },
        
            if(exclud) {
                return res.status(404).json({
                    status: false,
                    message: 'Evento não enecontrado'
                })
            }
            
        }).then(async evento => {
            res.status(200).send({
                status: true,
                message: "",
                data: evento
            });
        }).catch(error => {
            res.status(500).send({
                status: false,
                message: error,
                data: []
            });
        });
    },
    async getAll(req, res) {
        try {
            
            const calendario = await Calendars.findAll({
                attributes: ['id', 'title', 'description','date','hour', 'site', 'contact','excluded']
            })

            res.status(200).json(calendario)

        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },
    async update(req, res) { 
        try {
            const { calendarId } = req.params
            const { title, description, date, hour, site, contact, excluded } = req.body;
            await Calendars.update({title, description, date, hour, site, contact, excluded},
                { 
                    where: {id: calendarId},
                }
            )
    
            res.status(200).json({
                status: false,
                message: "atualizado com sucesso",
                evento: "Evento: "+ calendarId+" foi atualizado!",

            });
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }       
    }, 

    async delete(req, res) {
        try {
            const { calendarId } = req.params

            let remover = await Calendars.update({
                excluded: 1,
            }, {
                where: {
                    id: calendarId,
                    excluded: 0,
                }
            })

            if (!remover[0]) {
                throw ("Falha ao remover evento")
            }

            res.status(200).json({ status: true, message: "Evento excluído com sucesso!" })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    }
}