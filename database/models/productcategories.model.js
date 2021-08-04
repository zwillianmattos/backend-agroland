'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategories = sequelize.define('ProductCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: DataTypes.STRING,
    excluded: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  ProductCategories.associate = (models) => {
    ProductCategories.hasMany(models.ProductSellCategories, {
      foreignKey: 'productCategorie',
    })
  };
  return ProductCategories;
};