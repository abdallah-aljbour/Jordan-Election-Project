"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debators extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Debators.init(
    {
      debatorID: {
        type: DataTypes.STRING,
        references: { key: "nationalID", model: "Citizens" },
      },
      debateID: {
        type: DataTypes.INTEGER,
        references: { model: "Debates", key: "id" },
      },
      debatorToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Debators",
    }
  );
  return Debators;
};
