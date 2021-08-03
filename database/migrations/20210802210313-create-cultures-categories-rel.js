'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('CulturesCategoriesRels', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			cultureCategory: {
				type: Sequelize.INTEGER
			},
			culture: {
				type: Sequelize.INTEGER
			},
			excluded: {
				allowNull: false,
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});

		await queryInterface.addConstraint('CulturesCategoriesRels', ['culture'], {
			type: 'foreign key',
			name: 'CulturesCategoriesRels_fkey_cultures',
			references: { //Required field
				table: 'Cultures',
				field: 'id'
			},
			onDelete: 'cascade',
			onUpdate: 'cascade'
		});

		await queryInterface.addConstraint('CulturesCategoriesRels', ['cultureCategory'], {
			type: 'foreign key',
			name: 'CulturesCategoriesRels_fkey_culturesCategories',
			references: { //Required field
				table: 'CulturesCategories',
				field: 'id'
			},
			onDelete: 'cascade',
			onUpdate: 'cascade'
		});


		return queryInterface;

	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('CulturesCategoriesRels');
	}
};