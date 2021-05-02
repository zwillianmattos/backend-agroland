'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            date_birthday: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            token_auth: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            situation: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            token_notif: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            last_access: {
                allowNull: true,
                type: DataTypes.DATE
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            excluded: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        });
    },

    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('User');
    }
};
