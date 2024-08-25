"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chat_messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: "Citizens",
          key: "nationalID",
        },
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Admins",
          key: "admin_id",
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
    await queryInterface.dropTable("chat_messages");
  },
};
