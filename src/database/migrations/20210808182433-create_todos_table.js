'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Todos',
      {
        id_todo: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        id_user: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'id_user'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        create_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        update_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Todos');
  }
};
