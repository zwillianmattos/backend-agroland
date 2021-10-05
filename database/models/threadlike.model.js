'use strict';
module.exports = (sequelize, DataTypes) => {
  const ThreadLike = sequelize.define('ThreadLike', {
    threadId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    excluded: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  ThreadLike.associate = function (model) {
    ThreadLike.belongsTo(model.User, {
      foreignKey: 'userId',
    })
    ThreadLike.hasMany(model.Thread, {
      foreignKey: 'threadId',
    })
  };
  return ThreadLike;
};