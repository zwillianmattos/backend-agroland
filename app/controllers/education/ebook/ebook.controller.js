const { Documents, Category, sequelize } = require('../../../../database/models');
const { getPagination, getPagingData} = require('../../../utils/pagination');
const Sequelize = require('sequelize');

module.exports = {
    async show(req, res) {
        try {
            const {page,size, q, categoria} = req.query;           
            const {limit, offset} = getPagination(page,size)

            const filtro = q ? {
                name: {
                    [Sequelize.Op.like]: `%${q}%`
                },
                excluded:0
                
            }: {excluded: 0};

            const ebooks = await Documents.findAndCountAll({
                attributes: ['id', 'name', 'author', 'description', 'file', 'createdAt'],
                include: [{
                    model: Category,
                    required:true,
                    attributes: ['description'],
                    where: categoria ? {
                        id: categoria,
                        excluded:0
                        
                    }: {excluded: 0}
                },],
                where: filtro,
                limit: limit,
                offset: offset,
            });
            
            res.status(200).json({
                status: true,
                data: getPagingData(ebooks,limit, page)
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                data: []
            })
        }
    }
}