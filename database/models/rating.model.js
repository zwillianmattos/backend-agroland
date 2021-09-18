'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    document: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    comment: DataTypes.STRING,
    excluded: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    freezeTableName: false,
    timestamps: true,
    modelName: 'Rating',
    
  });
  Rating.associate = function (models) {
    console.log(models)
    // Rating.hasMany(models.Document, {
    //   foreignKey: 'document'
    // })
    // Rating.belongsTo(models.User, {
    //   foreignKey: 'user'
    // })

    Rating.belongsTo(models.User, {
      foreignKey: 'user'
    })
  };
  return Rating;
};