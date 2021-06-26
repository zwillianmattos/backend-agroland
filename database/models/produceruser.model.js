'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProducerUser = sequelize.define('ProducerUser', {
    user: {
      type: DataTypes.INTEGER
    },
    corporateName: DataTypes.STRING,
    fantasyName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    imgLogo: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.INTEGER,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    twitter: DataTypes.STRING,
    excluded: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  ProducerUser.associate = function (model) {
    ProducerUser.belongsTo(model.UserAddress, {
      foreignKey: 'address'
    })
    ProducerUser.belongsTo(model.User, {
      foreignKey: 'user'
    })
  };
  return ProducerUser;
};