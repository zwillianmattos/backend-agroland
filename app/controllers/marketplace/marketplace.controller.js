const { ProducerUser, ProductSells, ProductSellPhotos, ProductSellCategories, User, ProductCategories } = require('../../../database/models');
const { store, current } = require('../user/user.controller');
const { empty, removeFiles } = require('../../utils/utils');
const { getPagination, getPagingData } = require('../../utils/pagination');
const cloudinary = require('../../services/cloudinary');

const Sequelize = require('sequelize');

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
                product_sell_categories
            } = req.body;

            const exist = await ProducerUser.findOne({
                attributes: ['id'],
                where: {
                    user: user.id,
                }
            });

            if (typeof exist !== 'undefined' && exist !== null) {

                // Store product
                const announce = await ProductSells.create({
                    producerUser: exist.id,
                    title: title,
                    price: price,
                    description: description,
                    forma_comercializacao: forma_comercializacao,
                    forma_comercializacao_descricao: forma_comercializacao_descricao,
                    excluded: 0
                })

                // Store categories of the product
                if (typeof product_sell_categories != 'undefined' && product_sell_categories !== null) {
                    product_sell_categories.forEach(async category => {
                        console.log(category);
                        await ProductSellCategories.create({
                            productId: announce.id,
                            productCategorie: category.id
                        });
                    });
                }

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
    async update(req, res) {
        try {
            const user = req.user
            const { announceId } = req.params

            const {
                title,
                price,
                description,
                forma_comercializacao,
                forma_comercializacao_descricao,
                excluded
            } = req.body;

            const exist = await ProducerUser.findOne({
                attributes: ['id'],
                where: {
                    user: user.id,
                }
            });

            if (typeof exist !== 'undefined' && exist !== null) {
                // Update
                const announce = await ProductSells.update({
                    title: title,
                    price: price,
                    description: description,
                    excluded: excluded,
                }, {
                    where: {
                        id: announceId,
                        excluded: 0
                    }
                })
                res.status(200).json({
                    status: true,
                    message: "Anuncio atualizado com sucesso !",
                    data: announce
                })
            } else {
                throw ("Ocorreu um erro ao atualizar anuncio !");
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error
            });
        }
    },
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
                    model: ProductCategories, required: false,
                    productId: announceId,
                    include: [
                        {
                            model: ProductSellCategories, required: true,
                            attributes: ["description", "id"]
                        }
                    ]
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
            const { page, size, producerUser, q, category } = req.query;
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
                        attributes: ["id"],
                        model: ProductSellCategories, required: false,
                        include: [
                            {
                                model: ProductCategories, required: category ? true : false,
                                attributes: ["description", "id"],
                                where: category ? {
                                    id: {
                                        [Sequelize.Op.in]: [
                                            category
                                        ]
                                    }
                                } : null,
                            },
                        ],

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

    },
    async storeCategory(req, res) {
        try {
            const { description } = req.body;

            if (typeof description === "undefined" || description === "" || description === null) {
                throw ("Descricao da categoria e obrigatorio!");
            }

            let exists = await ProductCategories.findOne({
                where: {
                    description: {
                        [Sequelize.Op.like]: description
                    },
                    excluded: 0
                }
            })

            if (typeof exists !== "undefined" && exists !== null) {
                throw ("Categoria ja existe");
            }

            let category = await ProductCategories.create({
                description: description,
                excluded: 0,
            })

            res.status(200).send({
                status: true,
                data: category
            });

        } catch (e) {
            console.error(e);
            res.status(500).send({
                status: false,
                message: e !== null ? e : "Ocorreu um erro interno, tente novamente"
            });
        }
    },
    async getCategory(req, res) {
        try {
            const { page, size, q, categoria } = req.query;
            const { limit, offset } = getPagination(page, size)

            const filtro = q ? {
                name: {
                    [Sequelize.Op.like]: `%${q}%`
                },
                excluded: 0

            } : { excluded: 0 };

            const categories = await ProductCategories.findAndCountAll({
                attributes: ['id', 'description'],
                where: filtro,
                limit: limit,
                offset: offset,
            });

            res.status(200).json({
                status: true,
                data: getPagingData(categories, limit, page)
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
