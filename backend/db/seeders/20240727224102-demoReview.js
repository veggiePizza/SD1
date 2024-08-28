'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [{
      review: "This was easy to use!",
      stars: 5,
      userId: 1,
      toolId: 2,
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-02-01')
    },
    {
      review: "This did not work",
      stars: 4,
      userId: 2,
      toolId: 3,
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-03-01')
    },
    {
      review: "The owner was rude",
      stars: 2,
      userId: 3,
      toolId: 3,
      createdAt: new Date('2023-04-01'),
      updatedAt: new Date('2023-04-01'),
    },    
    {
      review: "This was so good",
      stars: 5,
      userId: 1,
      toolId: 2,
      createdAt: new Date('2023-02-16'),
      updatedAt: new Date('2023-02-16')
    },
    {
      review: "Never again",
      stars: 4,
      userId: 2,
      toolId: 3,
      createdAt: new Date('2023-03-26'),
      updatedAt: new Date('2023-03-26')
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {}, {});
  }
};