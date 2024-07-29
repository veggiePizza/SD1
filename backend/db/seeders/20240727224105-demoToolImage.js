'use strict';

const path = require('path');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ToolImages';
    return queryInterface.bulkInsert(options, [
      {
        url: "/api/images/drill.jpg",
        preview: true,
        toolId: 1
      },
      {
        url: "/api/images/hammer.jpeg",
        preview: true,
        toolId: 2
      },
      {
        url: "/api/images/lawn_mower.jpg",
        preview: true,
        toolId: 3
      },
      {
        url: "/api/images/macbook.jpeg",
        preview: true,
        toolId: 4
      },
      {
        url: "/api/images/vacuum.jpg",
        preview: true,
        toolId: 5
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ToolImages';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
