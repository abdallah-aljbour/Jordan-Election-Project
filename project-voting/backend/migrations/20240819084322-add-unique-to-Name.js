'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('LocalListings', 'Name', {
      type: Sequelize.STRING,
      unique: true  // اجعل العمود فريدًا
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('LocalListings', 'Name', {
      type: Sequelize.STRING,
      unique: false  // أزل خاصية الفريدة في حال العودة
    });
  }
};
