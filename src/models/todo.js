'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Todo extends Model {
  static associate(models) {
    // define association here
  }
};

Todo.init({
  id_todo: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Todos',
});


module.exports = Todo;