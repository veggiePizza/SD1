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
        firstName: "Alex Caballero",
        lastName: "",
        email: 'alexcaballero18@gmail.com',
        photo: "https://lh3.googleusercontent.com/a/ACg8ocKwAkDTsXiXvwK-tG2jwwYFa-LXM8ZtwUdcD2nMBa6FgsVxb3u0=s96-c"
      },
      {
        uid: "fXOmsdyyJpZzHHz646HM4kGcZue2",
        firstName: "lendit",
        lastName: "",
        email: 'lendit38@gmail.com',
        photo: "https://lh3.googleusercontent.com/a/ACg8ocLWjpEBxbij3W5u6EXkwoIqd9YzUhkoGuYwfwfqtCSR5Y_eRQ=s96-c"
},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['alexcaballero18@gmail.com', 'lendit38@gmail.com'] }
    }, {});
  }
};