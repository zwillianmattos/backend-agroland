'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Threads', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user: {
                type: Sequelize.INTEGER
            },
            channel: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            body: {
                type: Sequelize.TEXT
            },
            excluded: {
                type: Sequelize.INTEGER
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

        await queryInterface.addConstraint('Threads', ['user'], {
            type: 'foreign key',
            name: 'Users_Threads_fkey_user',
            references: { //Required field
                table: 'User',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Threads', ['channel'], {
            type: 'foreign key',
            name: 'Channels_Threads_fkey_channel',
            references: { //Required field
                table: 'Channels',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        return queryInterface;
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Threads');
    }
};
