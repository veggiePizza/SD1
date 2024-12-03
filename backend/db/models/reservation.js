'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Tool, {foreignKey: 'toolId'});
      Reservation.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Reservation.init({
    toolId: DataTypes.INTEGER,
    userId: DataTypes.STRING,  // This should be a string to match Firebase UID
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
