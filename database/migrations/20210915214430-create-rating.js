'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document: {
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.DOUBLE
      },
      comment: {
        type: Sequelize.TEXT
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

    await queryInterface.addConstraint('Ratings', ['document'], {
      type: 'foreign key',
      name: 'Ratings_fkey_Documents',
      references: { //Required field
          table: 'Documents',
          field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
  });

  await queryInterface.addConstraint('Ratings', ['user'], {
      type: 'foreign key',
      name: 'Ratings_fkey_User',
      references: { //Required field
          table: 'User',
          field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
  });

    return queryInterface;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ratings');
  }
};