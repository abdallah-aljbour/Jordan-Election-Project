"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Debators", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debatorID: {
        type: Sequelize.STRING,
        references: {
          key: "nationalID",
          model: "Citizens",
        },
      },

      debatorToken: {
        type: Sequelize.STRING,
      },
      debateID: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Debates",
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
    await queryInterface.dropTable("Debators");
  },
};
