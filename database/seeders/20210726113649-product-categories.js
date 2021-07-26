'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Produtos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Coprodutos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Subprodutos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Nutrição Animal',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Proteção e Nutrição de Cultivos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Sementes e Mudas',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Saúde Animal',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Limpeza e Desinfecção',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Acessórios e Cuidados Gerais',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Motores',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Peças',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Equipamentos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('ProductCategories', [{
      description: 'Maquinários',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
