'use strict';
module.exports = (sequelize, DataTypes) => {
    const Replies = sequelize.define('Replies', {
        user: {
            type: DataTypes.INTEGER
        },
        thread: {
            type: DataTypes.INTEGER
        },
        body: {
            type: DataTypes.TEXT
        },
        excluded: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        freezeTableName: false,
        timestamps: true,
        modelName: 'Replies'
    });
    Replies.associate = function (model) {
        Replies.belongsTo(model.User, {
            foreignKey: 'user'
        })

        Replies.hasMany(model.User, {
            foreignKey: 'id',
        })

        Replies.belongsTo(model.Thread, {
            foreignKey: 'thread'
        })
    };
    return Replies;
};
