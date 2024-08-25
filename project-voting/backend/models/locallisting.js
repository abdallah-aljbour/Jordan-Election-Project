"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LocalListing extends Model {
    static associate(models) {
      LocalListing.hasMany(models.localListingInformation, {
        foreignKey: "localListingID",
      });
    }
  }

  LocalListing.init(
    {
      listingID: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING,
        // تأكيد أن الاسم يجب أن يكون فريدًا
        allowNull: false,
      },
      votingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      didPass: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      districtID: {
        // إضافة العمود foreign key
        type: DataTypes.INTEGER,
        allowNull: true, // السماح بالقيمة NULL
        references: {
          model: "districts", // هنا نستخدم اسم الـ model المرتبط
          key: "districtID",
        },
      },
    },
    {
      sequelize,
      modelName: "LocalListing",
    }
  );
  return LocalListing;
};
