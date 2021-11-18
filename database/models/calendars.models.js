'use strict';
module.exports = (sequelize, DataTypes) => {
  const Calendars = sequelize.define('Calendars', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    hour: {
      allowNull: false,
      type: DataTypes.DATE
    },
    site: {
      allowNull: true,
      type: DataTypes.STRING
    },
    contact: {
      allowNull: true,
      type: DataTypes.STRING
    },
    excluded: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }, 
  }, {});
  Calendars.associate = function(models) {
    // associations can be defined here
  };
  return Calendars;
};