const { Documents, Category, Rating, User } = require('../../../../database/models');
const { getPagination, getPagingData } = require('../../../utils/pagination');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const { page, size, q, categoria, id } = req.query;
            const { limit, offset } = getPagination(page, size)

            const filtro = q ? {
                name: {
                    [Sequelize.Op.like]: `%${q}%`
                },
                excluded: 0

            } : { excluded: 0 };

            if (id) {
                filtro.id = id;
            }

            const ebooks = await Documents.findAndCountAll({
                attributes: ['id', 'name', 'author', 'description', 'file', 'createdAt'],
                include: [{
                    model: Category,
                    required: true,
                    attributes: ['description'],
                    where: categoria ? {
                        id: categoria,
                        excluded: 0

                    } : { excluded: 0 }
                }, {
                    model: Rating,
                    required: false,
                    attributes: ['id', 'comment', 'rating', 'createdAt'],
                    
                    include: [{
                        model: User,
                        required: false,
                        attributes: ['id', 'name', 'imgProfile'],
                    }],
                    where: {
                        excluded: 0
                    }
                }],
                where: filtro,
                limit: limit,
                offset: offset,
            });

            res.status(200).json({
                status: true,
                data: getPagingData(ebooks, limit, page)
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                data: []
            })
        }
    },
    async rate(req, res) {
        try {
            var exists = await Documents.findOne({
                id: req.params.ebook,
                excluded: 0
            });

            if (!exists) {
                return res.status(404).json({
                    status: false,
                    message: 'Ebook não encontrado'
                })
            }

            if (req.body.rating == 0) {
                return res.status(400).json({
                    status: false,
                    message: 'Avaliação não pode ser 0'
                })
            }

            if (req.body.rating > 5) {
                return res.status(400).json({
                    status: false,
                    message: 'Avaliação não pode ser maior que 5'
                })
            }

            const rating = await Rating.create({
                user: req.user.id,
                document: req.params.ebook,
                rating: parseFloat(req.body.rating),
                comment: req.body.comment
            })

            return res.status(200).json({
                status: true,
                data: rating
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                data: []
            })
        }
    },
}