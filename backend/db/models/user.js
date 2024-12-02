'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, uid} = this; // context will be the User instance
      return {  id, uid };
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ uid }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            uid
          }
        }
      });
      if (user) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ uid }) {
      const user = await User.create({
        uid
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Tool, {foreignKey : 'ownerId'});
      User.hasMany(models.Review, {foreignKey : 'userId'});
      User.hasMany(models.Reservation, {foreignKey : 'userId'});
    }
  };



  User.init(
    {
      uid: DataTypes.STRING(64)
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
