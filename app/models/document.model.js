'use strict';
module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Documents', {
        name: DataTypes.STRING,
        author: DataTypes.STRING,
        description: DataTypes.STRING,
        file: DataTypes.TEXT,
        category: DataTypes.INTEGER,
        excluded: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        modelName: 'Documents'
    });
    Document.associate = function (model) {
        // // associations can be defined here
        Document.belongsTo(model.Category, {
            foreignKey:'category'
        })
    };
    return Document;
};
