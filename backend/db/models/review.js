'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Tool, {foreignKey: 'toolId'});
      Review.belongsTo(models.User, {foreignKey: 'userId'});
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId'});
    }
  }
  Review.init({
    userId: DataTypes.STRING,  // This should be a string to match Firebase UID
    toolId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
