'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSells = sequelize.define('ProductSells', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    producerUser: {
      type: DataTypes.INTEGER
    },
    description: DataTypes.TEXT,
    forma_comercializacao: DataTypes.STRING,
    forma_comercializacao_descricao: DataTypes.STRING,
    excluded: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  ProductSells.associate = function (model) {
    ProductSells.hasMany(model.ProductSellCategories, {
      foreignKey: 'productId'
    })
    ProductSells.hasMany(model.ProductSellPhotos, {
      foreignKey: 'productId',
    })
    ProductSells.belongsTo(model.ProducerUser, {
      foreignKey: 'producerUser'
    })

  };
  return ProductSells;
};