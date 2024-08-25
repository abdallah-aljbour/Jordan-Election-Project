// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class localListingInformation extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   localListingInformation.init(
//     {
//       nationalID: {
//         type: DataTypes.STRING,
//         references: { model: "Citizen", key: "CitizenID" },
//       },

//       gender: DataTypes.STRING,
//       candidacyCourse: DataTypes.STRING,
//       localListingID: {
//         type: DataTypes.INTEGER,
//         references: { model: "LocalListings", key: "listingID" },
//       },
//       votingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
//       profilePicture:{type:DataTypes.STRING}

//     },
//     {
//       sequelize,
//       modelName: "localListingInformation",
//     }
//   );
//   return localListingInformation;
// };

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class localListingInformation extends Model {
    static associate(models) {
      localListingInformation.belongsTo(models.LocalListing, {
        foreignKey: "localListingID",
      });
      localListingInformation.belongsTo(models.Citizen, {
        foreignKey: "nationalID",
        targetKey: "nationalID",  // الربط بناءً على nationalID
    
      });
      
    }
  }
  localListingInformation.init(
    {
      listingInformationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nationalID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "Citizens", key: "nationalID" },
      },
      gender: DataTypes.STRING,
      candidacyCourse: DataTypes.STRING,
      localListingID: {
        type: DataTypes.INTEGER,
        references: { model: "LocalListings", key: "listingID" },
      },
      votingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
      profilePicture: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "localListingInformation",
    }
  );
  return localListingInformation;
};