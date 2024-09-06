'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reservations';
    return queryInterface.bulkInsert(options, [{
      toolId: 1,
      userId: 1,
      startDate: new Date('2020-02-01'),
      endDate: new Date('2020-02-11')
    },
    {
      toolId: 1,
      userId: 1,
      startDate: new Date('2024-02-10'),
      endDate: new Date('2024-02-12')
    },
    {
      toolId: 1,
      userId: 1,
      startDate: new Date('2022-02-09'),
      endDate: new Date('2022-02-12')
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reservations';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
