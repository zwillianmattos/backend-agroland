'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CulturesContents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      cultureCategoryRel: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.JSON
      },
      excluded: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });


    await queryInterface.addConstraint('CulturesContents', ['cultureCategoryRel'], {
      type: 'foreign key',
      name: 'CulturesCategoriesRels_fkey_contentCulture',
      references: { //Required field
        table: 'CulturesCategoriesRels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    return queryInterface;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CulturesContents');
  }
};