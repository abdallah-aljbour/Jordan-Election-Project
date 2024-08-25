"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.createTable("Citizens", {
      nationalID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      didVoteLocal: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      didVoteParty: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      district: {
        type: Sequelize.STRING,
      },
      OTP: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Citizens");
  },
};
