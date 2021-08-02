'use strict';
module.exports = (sequelize, DataTypes) => {
	const Cultures = sequelize.define('Cultures', {
		id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		name: DataTypes.STRING,
		icon: DataTypes.STRING,
		description: DataTypes.STRING,
		excluded: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});
	Cultures.associate = function (model) {
		Cultures.hasOne(model.CulturesCategoriesRel, {
			foreignKey: 'id'
		})
	};
	return Cultures;
};