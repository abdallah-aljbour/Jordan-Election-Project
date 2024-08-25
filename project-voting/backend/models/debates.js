"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Debates.init(
    {
      debateTitle: DataTypes.STRING,
      debateDescription: DataTypes.STRING,
      
      dateOfDebate: DataTypes.STRING,
      isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Debates",
    }
  );
  return Debates;
};
