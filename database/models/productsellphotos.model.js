'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSellPhotos = sequelize.define('ProductSellPhotos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: DataTypes.INTEGER,
    imgPath: DataTypes.STRING,
    description: DataTypes.STRING,
    excluded: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  ProductSellPhotos.associate = function (model) {
    ProductSellPhotos.belongsTo(model.ProductSells, {
      foreignKey: 'productId',
    })
  };
  return ProductSellPhotos;
};