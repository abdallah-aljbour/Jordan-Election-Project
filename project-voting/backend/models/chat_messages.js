"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat_messages extends Model {
    static associate(models) {
      this.belongsTo(models.Citizen, {
        foreignKey: 'user_id',
        targetKey: 'nationalID'
      });
    }
  }
  chat_messages.init(
    {
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: 'Citizens',
          key: 'nationalID'
        }
      },
      admin_id: DataTypes.STRING,
      message: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "chat_messages",
    }
  );
  return chat_messages;
};