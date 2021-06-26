'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProducerUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      corporateName: {
        type: Sequelize.STRING
      },
      fantasyName: {
        type: Sequelize.STRING
      },
      cnpj: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      imgLogo: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.INTEGER
      },
      facebook: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
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

    await queryInterface.addConstraint('ProducerUsers', ['address'], {
      type: 'foreign key',
      name: 'ProducerUsers_fkey_address',
      references: { //Required field
        table: 'UserAddresses',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('ProducerUsers', ['user'], {
      type: 'foreign key',
      name: 'ProducerUsers_fkey_user',
      references: { //Required field
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProducerUsers');
  }
};