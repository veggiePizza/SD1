'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, email, username } = this;
      return { id, firstName, lastName, email, username };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

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

    static async signup({ firstName, lastName, username, email, password, firebaseUID }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        id: firebaseUID,  // Use the Firebase UID here
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // User has many tools
      User.hasMany(models.Tool, { foreignKey: 'ownerId', as: 'Tools' });

      // User has many reviews
      User.hasMany(models.Review, { foreignKey: 'userId', as: 'Reviews' });

      // User has many reservations
      User.hasMany(models.Reservation, { foreignKey: 'userId', as: 'Reservations' });
    }
  };

  User.init(
      {
        id: {
          type: DataTypes.STRING,  // Store Firebase UID as STRING
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [4, 30],
            isNotEmail(value) {
              if (Validator.isEmail(value)) {
                throw new Error("Cannot be an email.");
              }
            }
          },
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [3, 256],
            isEmail: true
          },
          unique: true
        },
        hashedPassword: {
          type: DataTypes.STRING.BINARY,
          allowNull: false,
          validate: {
            len: [60, 60]
          }
        }
      },
      {
        sequelize,
        modelName: "User",
        indexes: [
          {
            unique: true,
            fields: ['username', 'email'],
          }
        ],
        defaultScope: {
          attributes: {
            exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
          }
        },
        scopes: {
          currentUser: {
            attributes: { exclude: ["hashedPassword"] }
          },
          loginUser: {
            attributes: {}
          }
        }
      }
  );
  return User;
};
