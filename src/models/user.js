'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class User extends Model {
  static associate(models) {
    // define association here
  }
};

User.init({
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      msg: 'Email is already registered',
    },
  },
  password: DataTypes.CHAR(60),
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, {
  defaultScope: {
    attributes: {
      exclude: ['password'],
    }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] },
    }
  },
  hooks: {

  },
  sequelize,
  modelName: 'Users',
});


module.exports = User;