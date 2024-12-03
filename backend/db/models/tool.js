'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    static associate(models) {
      Tool.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'});
      Tool.hasMany(models.Review, {foreignKey: 'toolId'});
      Tool.hasMany(models.ToolImage, {foreignKey: 'toolId'});
      Tool.hasMany(models.Reservation, {foreignKey: 'toolId'});
    }
  }
  Tool.init({
    id: {
      type: DataTypes.INTEGER,  // The primary key (auto-increment)
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ownerId: {
      type: DataTypes.STRING,  // This should be a string to match Firebase UID
      allowNull: false,
      references: {
        model: 'Users', // Reference to the User table
        key: 'id'       // Firebase UID as the primary key
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};
