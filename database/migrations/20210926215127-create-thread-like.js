'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ThreadLikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      threadId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
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

    await queryInterface.addConstraint('ThreadLikes', ['userId'], {
      type: 'foreign key',
      name: 'ThreadLikes_Threads_fkey_userId',
      references: { //Required field
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('ThreadLikes', ['threadId'], {
      type: 'foreign key',
      name: 'Threads_Threads_fkey_threadId',
      references: { //Required field
        table: 'Threads',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    return queryInterface;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ThreadLikes');
  }
};