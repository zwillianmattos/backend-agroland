'use strict';
module.exports = (sequelize, DataTypes) => {
    const Thread = sequelize.define('Thread', {
        user: {
            type: DataTypes.INTEGER
        },
        channel: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.TEXT
        },
        excluded: {
            type: DataTypes.INTEGER
        },
    }, {
        freezeTableName: false,
        timestamps: true,
        modelName: 'Thread'
    });

    Thread.associate = function (model) {
        Thread.belongsTo(model.Channel, {
            foreignKey: 'channel',
        })

        Thread.belongsTo(model.User, {
            foreignKey: 'user',
        })

        Thread.hasMany(model.Replies, {
            foreignKey: 'thread',
        })
    };

    return Thread;
};
