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
      lat: 36.36,
      lng: 68.72,
      name: "Drill",
      description: "Drill!!",
      price: 210,
      owner: "VJPK9PxirkRTzoPNVEn6ojxP7b52",
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      lat: 39.86,
      lng: 60.74,
      name: "Hammer",
      description: "smash smash",
      price: 200,
      owner: "fXOmsdyyJpZzHHz646HM4kGcZue2",
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      lat: 39.86,
      lng: 60.74,
      name: "Lawn Mower",
      description: "grass massacre",
      price: 200,
      owner: "VJPK9PxirkRTzoPNVEn6ojxP7b52",
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      lat: 39.86,
      lng: 60.74,
      name: "Macbook",
      description: "saving for a new one",
      price: 200,
      owner: "VJPK9PxirkRTzoPNVEn6ojxP7b52",
    },
    {
      address: "6th street",
      city: "Austin",
      state: "Texas",
      country: "United States",
      lat: 99.66,
      lng: 90.79,
      name: "Vacuum",
      description: "vroom vroom",
      price: 290,
      owner: "VJPK9PxirkRTzoPNVEn6ojxP7b52",
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tools';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
