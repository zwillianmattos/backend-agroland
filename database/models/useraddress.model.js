'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('UserAddress', {
    address: DataTypes.STRING,
    number: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    reference: DataTypes.STRING,
    excluded: DataTypes.INTEGER
  }, {});
  UserAddress.associate = function (model) {
    UserAddress.hasOne(model.ProducerUser, {
      foreignKey: 'id'
    })
  };
  return UserAddress;
};