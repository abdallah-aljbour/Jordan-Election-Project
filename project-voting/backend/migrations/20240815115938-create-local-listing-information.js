"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("localListingInformations", {
      listingInformationID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nationalID: {
        references: {
          model: "Candidates",
          key: "candidateID",
        },
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      candidacyCourse: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      localListingID: {
        references: {
          model: "LocalListings",
          key: "listingID",
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("localListingInformations");
  },
};
