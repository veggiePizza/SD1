'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tool.belongsTo(models.User, {foreignKey : 'ownerId', as: "Owner" });
      Tool.hasMany(models.Review, {foreignKey : 'toolId'});
      Tool.hasMany(models.ToolImage, {foreignKey : 'toolId'});
      Tool.hasMany(models.Reservation, {foreignKey : 'toolId'});
    }
  }
  Tool.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};