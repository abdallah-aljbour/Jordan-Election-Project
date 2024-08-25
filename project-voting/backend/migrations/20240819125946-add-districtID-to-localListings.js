'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('LocalListings', 'districtID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'districts', // اسم الجدول المرتبط
        key: 'districtID'   // العمود الذي نربطه
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('LocalListings', 'districtID');
  }
};
