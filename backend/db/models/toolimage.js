'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToolImage extends Model {
    static associate(models) {
      ToolImage.belongsTo(models.Tool, {foreignKey: 'toolId'});
    }
  }
  ToolImage.init({
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN,
    toolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToolImage',
  });
  return ToolImage;
};
