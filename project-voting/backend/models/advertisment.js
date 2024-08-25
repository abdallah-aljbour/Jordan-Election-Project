"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Advertisment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Citizen, {
        foreignKey: 'advertisorID',
        targetKey: 'nationalID',
        as: 'advertiser' // الاسم الذي ستستخدمه للوصول إلى العلاقة
      });
    }    
  }
  Advertisment.init(
    {
      


        advertismentID: {
          type: DataTypes.INTEGER,
          primaryKey: true,  // تحديد هذا العمود كمفتاح أساسي
          autoIncrement: true, // تعيين تلقائي للزيادة إذا لزم الأمر
        },  

      pictuer: DataTypes.STRING,
      title: DataTypes.STRING,
      // votingCount: DataTypes.INTEGER,
      advertisorID: {
        type: DataTypes.INTEGER,
        references: { model: "Citizens", key: "nationalID" },
      },
      description: DataTypes.STRING,
      isApproved:{
        type:DataTypes.BOOLEAN,
        defaultValue: false

      },isPaid: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
      },
      isPaid:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Advertisment",
    }
  );
  return Advertisment;
};
