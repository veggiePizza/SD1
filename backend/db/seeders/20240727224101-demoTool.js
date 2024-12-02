'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Tools';
    return queryInterface.bulkInsert(options, [{
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      name: "Drill",
      description: "Drill!!",
      price: 210,
      ownerId: 1,
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      name: "Hammer",
      description: "smash smash",
      price: 200,
      ownerId: 1,
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      name: "Lawn Mower",
      description: "grass massacre",
      price: 200,
      ownerId: 1,
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      name: "Macbook",
      description: "saving for a new one",
      price: 200,
      ownerId: 1,
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      name: "Vacuum",
      description: "vroom vroom",
      price: 290,
      ownerId: 2,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tools';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
