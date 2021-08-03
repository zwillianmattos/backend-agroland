'use strict';
module.exports = (sequelize, DataTypes) => {
	const CulturesContent = sequelize.define('CulturesContent', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		description: {
			type: DataTypes.STRING
		},
		cultureCategoryRel: {
			type: DataTypes.INTEGER
		},
		content: DataTypes.JSON,
		excluded: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});
	CulturesContent.associate = function (model) {
		CulturesContent.hasMany(model.CulturesCategoriesRel, {
			foreignKey: 'cultureCategoryRel'
		})
	};
	return CulturesContent;
};