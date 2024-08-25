"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Candidates", {
      profilePicture: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      Quota: {
        type: Sequelize.STRING,
      },
      votingCount: {
        type: Sequelize.INTEGER,
      },
      candidateID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Citizens",
          key: "nationalID",
        },
      },
      localListingID: {
        type: Sequelize.INTEGER,
        references: {
          model: "LocalListings",
          key: "listingID",
        },
      },
      partylistingID: {
        type: Sequelize.INTEGER,
        references: {
          model: "PartyListings",
          key: "partyID",
        },
      },
      listingType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isPresident: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Candidates");
  },
};
