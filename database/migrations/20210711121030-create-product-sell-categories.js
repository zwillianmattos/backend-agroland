'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductSellCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      productCategorie: {
        type: Sequelize.INTEGER
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

    await queryInterface.addConstraint('ProductSellCategories', ['productId'], {
      type: 'foreign key',
      name: 'ProductSellCategories_fkey_productId',
      references: { //Required field
        table: 'ProductSells',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('ProductSellCategories', ['productCategorie'], {
      type: 'foreign key',
      name: 'ProductSellCategories_fkey_productCategorie',
      references: { //Required field
        table: 'ProductCategories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductSellCategories');
  }
};