"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PartyListingInformation extends Model {
    static associate(models) {
      // Add these associations
      PartyListingInformation.belongsTo(models.Citizen, { foreignKey: 'nationalID' });
      PartyListingInformation.belongsTo(models.PartyListing, { foreignKey: 'partyListingID' });
    }
  }
  PartyListingInformation.init(
    
    {
        partyInformationID: {  // This should be your primary key
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
      nationalID: {
        type: DataTypes.STRING,
        references: { model: "Citizen", key: "nationalID" },
      },
      gender: DataTypes.STRING,
      candidacyCourse: DataTypes.STRING,
      partyListingID: {
        type: DataTypes.STRING,
        references: { model: "PartyListing", key: "partyID" },
      },
      
      profilePicture: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "PartyListingInformation",
    }
  );
  return PartyListingInformation;
};