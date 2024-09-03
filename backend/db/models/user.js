'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, uid, email, firstName, lastName, photo } = this; // context will be the User instance
      return { id, uid, email, firstName, lastName, photo };
    }

    //not needed
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    //in case we wanted to do a scope, not needed
    static getCurrentUserByUid(uid) {
      return User.scope("currentUser").findByPk(uid);
    }

    //also not needed or needs firebase implementataion
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    //not needed
    static async signup({ firstName, lastName, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
    }
  };



  User.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        /* validate: {
           len: [4, 30],
           isNotEmail(value) {
             if (Validator.isEmail(value)) {
               throw new Error("Cannot be an email.");
             }
           }
         },*/
        unique: true
      }
    },
    {
      sequelize,
      modelName: "User",
      indexes: [
        {
          unique: true,
          fields: ['email', 'firstName'],
        }
      ],
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: [] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};