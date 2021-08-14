'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('User', {
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
            imgProfile: {
                allowNull: true,
                type: DataTypes.STRING,
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

        await queryInterface.addConstraint('User', ['id'], {
            type: 'foreign key',
            name: 'User_fkey_Thread',
            references: { //Required field
                table: 'Threads',
                field: 'user'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('User', ['id'], {
            type: 'foreign key',
            name: 'User_fkey_Replies',
            references: { //Required field
                table: 'Replies',
                field: 'user'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('User', ['id'], {
            type: 'foreign key',
            name: 'User_fkey_ProducerUsers',
            references: { //Required field
                table: 'ProducerUsers',
                field: 'user'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        return queryInterface;
    },

    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('User');
    }
};
