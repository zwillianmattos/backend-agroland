'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Documents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            file: {
                type: Sequelize.TEXT
            },
            category:{
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

        await queryInterface.addConstraint('Documents', ['category'], {
            type: 'foreign key',
            name: 'Documents_fkey_category',
            references: { //Required field
                table: 'Categories',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        return queryInterface;
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Documents');
    }
};
