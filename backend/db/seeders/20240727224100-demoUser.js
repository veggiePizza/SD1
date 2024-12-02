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
        uid: "VJPK9PxirkRTzoPNVEn6ojxP7b52",
      },
      {
        uid: "fXOmsdyyJpZzHHz646HM4kGcZue2",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      uid: { [Op.in]: ['VJPK9PxirkRTzoPNVEn6ojxP7b52', 'fXOmsdyyJpZzHHz646HM4kGcZue2'] }
    }, {});
  }
};