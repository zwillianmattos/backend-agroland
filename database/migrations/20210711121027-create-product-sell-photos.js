'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductSellPhotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      imgPath: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      excluded: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });

    await queryInterface.addConstraint('ProductSellPhotos', ['productId'], {
      type: 'foreign key',
      name: 'ProductSellPhotos_fkey_productId',
      references: { //Required field
        table: 'ProductSells',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductSellPhotos');
  }
};