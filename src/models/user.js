'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

const bcrypt = require('bcryptjs');
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
    validate: {
      is: {
        args: [/^([\w]{2,})+\s+([\w\s]{2,})+$/i],
        msg: 'You must inform the name and last name'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Email passed is invalid'
      }
    },
    unique: {
      msg: 'This email is already registered',
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
    afterValidate: (User) => {
      User.password = bcrypt.hashSync(User.password, 10);
    }
  },
  sequelize,
  modelName: 'Users',
});


module.exports = User;