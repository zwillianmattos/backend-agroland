'use strict';
module.exports = (sequelize, DataTypes) => {
	const CulturesCategoriesRel = sequelize.define('CulturesCategoriesRel', {
		id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		contentCulture: DataTypes.INTEGER,
		categoryCulture: DataTypes.INTEGER,
		culture: DataTypes.INTEGER,
		excluded: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});
	CulturesCategoriesRel.associate = function (model) {
		CulturesCategoriesRel.belongsTo(model.Cultures, {
			foreignKey: 'Cultures'
		})

		CulturesCategoriesRel.belongsTo(model.CulturesCategories, {
			foreignKey: 'CulturesCategories'
		})

		CulturesCategoriesRel.hasMany(model.CulturesContent, {
			foreignKey: 'CulturesContent'
		})
	};
	return CulturesCategoriesRel;
};