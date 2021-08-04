'use strict';
module.exports = (sequelize, DataTypes) => {
	const CulturesCategoriesRel = sequelize.define('CulturesCategoriesRel', {
		id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		cultureCategory: {
			type: DataTypes.INTEGER
		},
		culture: DataTypes.INTEGER,
		excluded: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});
	CulturesCategoriesRel.associate = function (model) {
		CulturesCategoriesRel.belongsTo(model.Cultures, {
			foreignKey: 'id'
		})

		CulturesCategoriesRel.belongsTo(model.CulturesCategories, {
			foreignKey: 'cultureCategory'
		})

		CulturesCategoriesRel.hasMany(model.CulturesContent, {
			foreignKey: 'id'
		})
	};
	return CulturesCategoriesRel;
};