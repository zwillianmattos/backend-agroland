'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSellCategories = sequelize.define('ProductSellCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    excluded: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  ProductSellCategories.associate = function (model) {

    ProductSellCategories.belongsTo(model.ProductSells, {
      foreignKey: 'productId',
    })
  };
  return ProductSellCategories;
};