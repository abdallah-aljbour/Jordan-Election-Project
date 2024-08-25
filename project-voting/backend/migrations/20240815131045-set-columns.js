'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("LocalListings","isApproved",Sequelize.BOOLEAN);
    await queryInterface.addColumn("PartyListings","isApproved",Sequelize.BOOLEAN);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
