"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("partyListingRequests");
    await queryInterface.dropTable("LocalListingRequests");
    

    await queryInterface.removeColumn("Advertisments", "advertisorID");

    await queryInterface.addColumn(
      "Advertisments",
      "isApproved",
      Sequelize.BOOLEAN
    );

    await queryInterface.addColumn(
      "Advertisments",
      "advertisorID",
      Sequelize.STRING
    );
    await queryInterface.addConstraint("Advertisments", {
      fields: ["advertisorID"],
      type: "foreign key",
      references: {
        table: "Citizens",
        field: "nationalID",
      },
    });

    await queryInterface.addColumn(
      "localListingInformations",
      "votingCount",
      Sequelize.INTEGER
    );

    await queryInterface.addColumn(
      "localListingInformations",
      "profilePicture",
      Sequelize.INTEGER
    );
    await queryInterface.addColumn(
      "PartyListingInformations",
      "profilePicture",
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      "Citizens",
      "isPresident",
      Sequelize.BOOLEAN
    );

    await queryInterface.addColumn(
      "Citizens",
      "isCandidate",
      Sequelize.BOOLEAN
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
