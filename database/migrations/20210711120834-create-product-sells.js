'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductSells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      producerUser: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      },
      description: {
        type: Sequelize.TEXT
      },
      forma_comercializacao: {
        type: Sequelize.INTEGER
      },
      forma_comercializacao_descricao: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      excluded: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });

    await queryInterface.addConstraint('ProductSells', ['producerUser'], {
      type: 'foreign key',
      name: 'ProductSells_fkey_user',
      references: { //Required field
        table: 'ProducerUsers',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductSells');
  }
};