'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "Alex",
        lastName: "Caballero",
        email: 'caballero@user.io',
        username: 'veggiePizza',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Rediet",
        lastName: "Kebede",
        email: 'kebede@user.io',
        username: 'kebedeR',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Omer",
        lastName: "Khan",
        email: 'khan@user.io',
        username: 'khanO',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "John",
        lastName: "Mounce",
        email: 'mounce@user.io',
        username: 'mounceJ',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "Kshitij",
        lastName: "Patel",
        email: 'patel@user.io',
        username: 'patelK',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['veggiePizza', 'kebedeR', 'khanO', 'mounceJ', 'patelK'] }
    }, {});
  }
};