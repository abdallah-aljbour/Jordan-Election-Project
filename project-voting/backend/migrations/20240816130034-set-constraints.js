"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("localListingInformations", {
      type: "foreign key",
      fields: ["nationalID"],
      references: { field: "nationalID", table: "Citizens" },
    });
    await queryInterface.addConstraint("PartyListingInformations", {
      type: "foreign key",
      fields: ["nationalID"],
      references: { field: "nationalID", table: "Citizens" },
    });
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
