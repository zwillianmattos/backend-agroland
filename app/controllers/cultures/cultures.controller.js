const { Cultures, CulturesCategoriesRel, CulturesCategories, CulturesContent } = require('../../../database/models');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const c = await Cultures.findAll({})
            res.status(200).json(c)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },

    async view(req, res) {

        try {
            const { culture } = req.params;

            const c = await Cultures.findAll({
                attributes: ['id', 'name', 'icon', 'description'],
                where: {
                    id: culture,
                    excluded: false
                },
                include: [
                    {
                        model: CulturesCategoriesRel,
                        attributes: ['id', 'cultureCategory', 'culture'],
                        include: [
                            {
                                attributes: ['icon', 'description'],
                                model: CulturesCategories,
                                required: false,
                            },
                        ],
                        required: false,
                    }
                ]
            })

            res.status(200).json(c)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    },

    async detail(req, res) {
        try {
            const { culture, category } = req.params;

            const c = await CulturesCategoriesRel.findAll({
                attributes: ['id', 'cultureCategory', 'culture'],
                where: {
                    culture: culture,
                    cultureCategory: category,
                    excluded: false
                },
                include: [
                    {
                        attributes: ['icon', 'description'],
                        model: CulturesCategories,
                        required: true,
                    },
                    {
                        model: CulturesContent,
                        required: false,
                    }
                ],
            })

            res.status(200).json(c)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: e
            })
        }
    }
}