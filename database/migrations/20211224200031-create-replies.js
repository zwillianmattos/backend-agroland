'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Replies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user: {
                type: Sequelize.INTEGER
            },
            thread: {
                type: Sequelize.INTEGER
            },
            body: {
                type: Sequelize.TEXT
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            excluded: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
        });

        await queryInterface.addConstraint('Replies', ['user'], {
            type: 'foreign key',
            name: 'Users_Replies_fkey_user',
            references: { //Required field
                table: 'User',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Replies', ['thread'], {
            type: 'foreign key',
            name: 'Threads_fkey_thread',
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
        return queryInterface.dropTable('Replies');
    }
};
