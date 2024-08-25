"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Advertisments", {
      advertismentID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pictuer: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },

      advertisorID: {
        type: Sequelize.STRING,
        references: {
          model: "Candidates",
          key: "candidateID",
        },
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
    await queryInterface.dropTable("Advertisments");
  },
};
