'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToolImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToolImage.belongsTo(models.Tool, {foreignKey : 'toolId'});
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