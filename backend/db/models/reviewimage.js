'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {foreignKey: 'reviewId'});
    }
  }
  ReviewImage.init({
    url: DataTypes.STRING,
    reviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
