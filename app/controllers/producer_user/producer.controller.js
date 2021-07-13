
const { ProducerUser, UserAddress, User } = require('../../../database/models');
const { store, current } = require('../user/user.controller');

module.exports = {
    async register(req, res) {
        try {
            const user = req.user

            const {
                corporateName,
                fantasyName,
                cnpj,
                description,
                location,
                imgLogo,
                phone,
                address,
                facebook,
                instagram,
                whatsapp,
                twitter,
            } = req.body;

            const exist = await ProducerUser.findOne({
                where: {
                    user: user.id,
                }
            });

            if (typeof exist !== 'undefined' && exist !== null) {
                throw ("Registro de produtor ja existe");
            }

            let addressId = null;
            if (typeof address !== 'undefined' && address !== null) {
                addressId = await UserAddress.create(address)
                console.log(addressId);
            }

            const producer = await ProducerUser.create({
                user: user.id,
                corporateName: corporateName,
                fantasyName: fantasyName,
                cnpj: cnpj,
                description: description,
                location: location,
                imgLogo: imgLogo,
                phone: phone,
                address: addressId.id,
                facebook: facebook,
                instagram: instagram,
                whatsapp: whatsapp,
                twitter: twitter,
                excluded: 0
            })

            res.status(200).json({
                status: true,
                message: "",
                data: producer
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error
            });
        }
    },
    async store(req, res) {
        const {
            corporateName,
            fantasyName,
            cnpj,
            description,
            location,
            imgLogo,
            phone,
            address,
            facebook,
            instagram,
            whatsapp,
            twitter,
        } = req.body;

        const { id } = req.user;

        // busca se existe o id
        ProducerUser.findOne({
            attributes: ['id', 'address'],
            where: {
                user: id,
                excluded: 0
            }
        }).then(async (producerUser) => {

            if (typeof address !== 'undefined' && address !== null) {
                console.log(address)
                await UserAddress.update(address, {
                    where: {
                        id: producerUser.address,
                        excluded: 0
                    }
                })
            }

            const atualizar = await ProducerUser.update({
                corporateName,
                fantasyName,
                cnpj,
                description,
                location,
                imgLogo,
                phone,
                facebook,
                instagram,
                whatsapp,
                twitter,
            }, {
                where: {
                    id: producerUser.id,
                    user: id,
                    excluded: 0
                }
            });

            if (atualizar) {

                const producerData = await ProducerUser.findOne({
                    attributes: ['id', 'user', 'corporateName', 'fantasyName', 'cnpj', 'description', 'location', 'imgLogo', 'phone', 'address', 'facebook', 'instagram', 'whatsapp', 'twitter', 'excluded', 'createdAt', 'updatedAt',],
                    where: {
                        id: producerUser.id,
                        excluded: 0
                    }
                });

                res.status(200).send({
                    status: true,
                    message: "Atualizado com sucesso!",
                    data: producerData
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: false,
                message: error
            });
        })
    },
    async current(req, res) {
        await ProducerUser.findOne({
            attributes: ['id', 'user', 'corporateName', 'fantasyName', 'cnpj', 'description', 'location', 'imgLogo', 'phone', 'address', 'facebook', 'instagram', 'whatsapp', 'twitter', 'excluded', 'createdAt', 'updatedAt',],
            where: {
                user: req.user.id,
                excluded: 0
            }
        }).then(async user => {
            res.status(200).send({
                status: true,
                message: "Atualizado com sucesso!",
                data: user
            });
        }).catch(error => {
            res.status(500).send({
                status: false,
                message: error,
                data: []
            });
        });
    },
    async deleteAccount(req, res) { }
}
