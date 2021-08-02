'use strict';
module.exports = (sequelize, DataTypes) => {
	const CulturesCategories = sequelize.define('CulturesCategories', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		icon: DataTypes.STRING,
		description: DataTypes.STRING,
		excluded: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});
	CulturesCategories.associate = function (model) {
		CulturesCategories.hasOne(model.CulturesCategoriesRel, {
			foreignKey: 'id'
		})
	};
	return CulturesCategories;
};