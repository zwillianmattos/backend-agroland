
const { ProducerUser, UserAddress, User } = require('../../../database/models');

module.exports = {
    async store(req, res) {
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
                throw("Registro de produtor ja existe");
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
    }
}