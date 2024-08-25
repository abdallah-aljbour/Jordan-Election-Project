"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContactMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Citizen, {
        foreignKey: "nationalID",
        as: "senderID",
      });
      this.hasOne(models.Admin, {
        foreignKey: "admin_id",
        as: "admin_id",
      });
    }
  }
  ContactMessage.init(
    {
      message: DataTypes.STRING,
      sentFrom: DataTypes.INTEGER,
      AdminID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ContactMessage",
    }
  );
  return ContactMessage;
};
