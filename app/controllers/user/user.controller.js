require('../../config/dotenv');
const { empty } = require('../../utils/utils');
const { User } = require('../../../database/models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mail = require('../../services/mail');
const Sequelize = require('sequelize');


module.exports = {
    async register(req, res) {
        const {
            name,
            email,
            password,
        } = req.body;


        // busca se existe um usuário usando o email
        User.findOne({
            attributes: ['id', 'name', 'email', 'password'],
            where: {
                email: email
            },
        }).then(async userFind => {
            // Caso encontre um usuário retorna um erro
            if (!empty(userFind)) {
                res.status(200).send({
                    status: false,
                    message: 'Email pertence a outro usuário.'
                });
                return false;
            }

            let pass = await bcrypt.hash(password, 10);

            // Caso não exista cria o mesmo
            User.create({
                name: name,
                email: email,
                password: pass,
                excluded: 0,
                situation: 1
            }).then(async (user) => {
                // Realiza o cadastro de usuário
                // let configMail = {
                //     email: user.email,
                //     template: 1
                // };

                // mail.sendAccountConfirmation(configMail.email).then(async data => {
                // Grava CODIGO DE CONFIRMAÇÃO
                // await User.update({
                //     token_auth: data.key,
                //     situation: 1
                // }, { where: { id: user.id } });


                const token = jwt.sign({
                    id: user.id,
                    typeUser: 1
                }, process.env.auth_userkey);


                res.header("authentication", token).status(200).send({
                    status: true,
                    message: "Usuario registrado com sucesso",
                    token: token,
                    user: user
                });

                // }).catch(error => {
                //     console.error(error);
                //     res.status(500).send(error.message)
                // })

            }).catch(error => {
                console.error(error);
                res.status(500).send(error)
            })
        }).catch(error => {
            console.error(error);
            res.status(500).send(error)
        })
    },
    async login(req, res) {

        const {
            email,
            password
        } = req.body;

        await User.findOne({
            attributes: [
                'id',
                'name',
                'email',
                'password',
                'situation',
                'date_birthday'
            ],
            where: {
                email: email,
            }
        }).then(async user => {
            if (empty(user)) {
                res.status(400).send({
                    status: false,
                    message: 'Email ou/e senha inválidos!'
                });
                return;
            }

            if (user.SITUATION == 0) {
                res.status(200).send({
                    status: false,
                    message: 'Efetue a confirmação desta conta para continuar'
                });
                return;
            }

            let validate = await bcrypt.compareSync(password, user.password);
            if (validate) {
                const token = jwt.sign({
                    id: user.id,
                    typeUser: 1
                }, process.env.auth_userkey);


                res.header("authentication", token).status(200).send({
                    token: token,
                    user: user
                });

                // Grava ultimo acesso
                await User.update({
                    last_access: Date.now(),
                }, { where: { id: user.id } })

            } else {
                res.status(400).send({
                    status: false,
                    message: 'Email ou/e senha inválidos!'
                });
                return;
            }

        }).catch(error => {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error
            });
        })
    },
    async reSendEmailConfirmation(req, res) {
        const Op = Sequelize.Op;
        const { email } = req.params;

        await User.findOne({
            attributes: ['id', 'situation', 'token_auth', 'email'],
            where: {
                email: email,
                situation: 0
            }
        }).then(user => {
            if (!empty(user)) {
                mail.sendAccountConfirmation(user.email).then(async data => {
                    // Grava CODIGO DE CONFIRMAÇÃO
                    await User.update({
                        token_auth: data.key
                    }, { where: { id: user.id } })
                    res.status(200).send({
                        status: true,
                        message: 'Reenviamos o email de ativação! Para proceguir verifique sua conta clicando no link de confirmação enviado para o email'
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).send(error.message)
                });
            } else {
                res.status(400).send({
                    status: false,
                    message: 'Conta já confirmada'
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
    },
    async activation(req, res) {
        const { email, key_code } = req.body;

        await User.findOne({
            attributes: ['id', 'situation', 'token_auth'],
            where: {
                email: email,
                excluded: 0,
            }
        }).then(async user => {

            if (empty(user)) {
                res.status(400).send({
                    status: false,
                    message: 'Usuário não encontrado!'
                });
                return;
            }

            if (user.situation === 1) {
                res.status(400).send({
                    status: false,
                    message: 'Esta conta já foi ativada!'
                });
                return;
            }

            if (key_code != user.token_auth) {
                res.status(400).send({
                    status: false,
                    message: 'Token de ativação de conta inválido!'
                });
                return;
            }

            // Ativa o usuário
            await User.update({
                situation: 1
            }, { where: { id: user.id } })

            res.status(200).send({
                status: true,
                message: 'Conta ativada com sucesso!'
            });

        }).catch((error) => {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error
            });
        });
    },
    async sendAccountRecovery(req, res) {
        const { id } = req.params;
        await User.findOne({
            attributes: ['id', 'email', 'token_auth'],
            where: {
                id: id,
            }
        }).then(user => {
            mail.sendAccountRecovery(user.email).then((response) => {
                res.status(200).send({
                    status: true,
                    message: 'Email de recuperação enviado ! Verifique sua caixa de email'
                });
            }).catch((error) => {
                res.status(500).send({
                    status: false,
                    message: error
                });
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        });

    },
    async store(req, res) {
        const {
            name,
            password,
            email,
            avatar,
            date_birthday
        } = req.body;

        const { id } = req.user;

        if (password) {
            password = await bcrypt.hash(password, 10);
        }

        // busca se existe o id
        User.findOne({
            attributes: ['id', 'name', 'email', 'password', 'date_birthday', 'situation', 'token_auth'],
            where: {
                id: id,
                excluded: 0
            }
        }).then(async (user) => {

            await User.update({
                name: empty(name) ? user.name : name,
                email: empty(email) ? user.email : email,
                password: empty(password) ? user.password : password,
                date_birthday: empty(date_birthday) ? user.date_birthday : date_birthday,
                excluded: 0,
            }, { where: { ID: id } });

        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: false,
                message: error
            });
        })
    },
    async current(req, res) {
        await User.findOne({
            where: {
                id: req.user.id,
                excluded: 0
            }
        }).then(async user => {
            res.status(200).send(user);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    deleteAccount(req, res) { },
}