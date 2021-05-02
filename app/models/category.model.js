'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        description: DataTypes.STRING,
        excluded: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        freezeTableName: false,
        timestamps: true,
        modelName: 'Category'
    });
    Category.associate = function (model) {
        // associations can be defined here
        // associations can be defined here
        
        Category.hasOne(model.Documents, {
            foreignKey:'id'
        })
    };
    return Category;
};
