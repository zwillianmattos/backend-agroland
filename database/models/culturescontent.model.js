'use strict';
module.exports = (sequelize, DataTypes) => {
	const CulturesContent = sequelize.define('CulturesContent', {
		id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		content: DataTypes.TEXT,
		excluded: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});
	CulturesContent.associate = function (model) {
		CulturesContent.hasOne(model.CulturesCategoriesRel, {
			foreignKey: 'id'
		})
	};
	return CulturesContent;
};