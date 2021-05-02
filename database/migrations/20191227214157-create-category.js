'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
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

        return queryInterface;
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Categories');
    }
};
