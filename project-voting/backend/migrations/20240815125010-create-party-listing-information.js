'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PartyListingInformations', {
      partyInformationID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nationalID: {
        type: Sequelize.STRING,
        references:{model:"Candidates",key:"candidateID"}
      },
      gender: {
        type: Sequelize.STRING
      },
      candidacyCourse: {
        type: Sequelize.STRING
      },
      partyListingID: {
        type: Sequelize.INTEGER,
        references:{model:"PartyListings",key:"partyID"}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PartyListingInformations');
  }
};