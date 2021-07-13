const { ProducerUser, ProductSells, ProductSellPhotos, ProductSellCategories, User } = require('../../../database/models');
const { store, current } = require('../user/user.controller');
const { empty, removeFiles } = require('../../utils/utils');
const { getPagination, getPagingData } = require('../../utils/pagination');
const cloudinary = require('../../services/cloudinary');
module.exports = {
    async create(req, res) {
        try {
            const user = req.user

            const {
                title,
                price,
                description,
                forma_comercializacao,
                forma_comercializacao_descricao,
            } = req.body;

            const exist = await ProducerUser.findOne({
                attributes: ['id'],
                where: {
                    user: user.id,
                }
            });

            if (typeof exist !== 'undefined' && exist !== null) {

                console.log(exist);

                const announce = await ProductSells.create({
                    producerUser: exist.id,
                    title: title,
                    price: price,
                    description: description,
                    forma_comercializacao: forma_comercializacao,
                    forma_comercializacao_descricao: forma_comercializacao_descricao,
                    excluded: 0
                })

                res.status(200).json({
                    status: true,
                    message: "Anuncio criado com sucesso !",
                    data: announce
                })

            } else {
                throw ("Ocorreu um erro ao criar anuncio !");
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error
            });
        }
    },
    async update(req, res) { },
    async get(req, res) {
        const { announceId } = req.params;

        await ProductSells.findOne({
            attributes: ['id', 'title', 'price', 'description', 'forma_comercializacao', 'forma_comercializacao_descricao'],
            include: [
                {
                    model: ProducerUser, required: false,
                    productId: announceId,
                },
                {
                    model: ProductSellCategories, required: false,
                },
                {
                    model: ProductSellPhotos, required: false,
                    productId: announceId,
                }
            ],
            where: {
                id: announceId,
                excluded: 0
            }
        }).then(async product => {
            res.status(200).send({
                status: true,
                message: "",
                data: product
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
            const { page, size, producerUser, q } = req.query;
            const { limit, offset } = getPagination(page, size);


            let filtro = q ? {
                title: {
                    [Sequelize.Op.like]: `%${q}%`
                },
                description: {
                    [Sequelize.Op.like]: `%${q}%`
                },
                excluded: 0
            } : { excluded: 0 };

            let product = [];
            if (producerUser)
                filtro.producerUser = producerUser

            product = await ProductSells.findAndCountAll({
                attributes: ['id', 'title', 'price', 'description', 'forma_comercializacao', 'forma_comercializacao_descricao'],
                include: [
                    {
                        model: ProducerUser, required: false,
                    },
                    {
                        model: ProductSellCategories, required: false,
                    },
                    {
                        model: ProductSellPhotos, required: false,
                    }
                ],
                where: filtro,
                limit: limit,
                offset: offset,
            })

            res.status(200).send(getPagingData(product, limit, page));
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error,
            });
        }

    },
    async uploadProductPhotos(req, res) {

        const { filename: file } = req.file;
        const { announceId } = req.params;


        var imageDetails = {
            name: req.file.filename,
            file: req.file.path,
            file_cloudinary: '',
            public_id: ''
        }

        cloudinary.uploads(imageDetails.file, '/marketplace/').then((result) => {

            imageDetails = {
                name: req.body.imageName,
                file: req.file.path,
                file_cloudinary: result.url,
                public_id: result.id
            }

            ProductSellPhotos.create({
                productId: announceId,
                description: imageDetails.name,
                imgPath: imageDetails.file_cloudinary,
                // PUBLIC_ID: imageDetails.public_id,
                excluded: 0,
            }).then((documentCreated => {
                res.status(200).send(documentCreated);
                removeFiles([req.file]);
            })).catch(error => {
                console.log(error);
                res.status(500).send({
                    status: false,
                    message: error
                });
            })


        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: false,
                message: error
            });
        });

    }
}
