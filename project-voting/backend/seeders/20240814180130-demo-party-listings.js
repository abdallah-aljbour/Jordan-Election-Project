// seeders/[timestamp]-add-party-listings.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PartyListings', [
      {
        Name: 'Party A',
        members: 100,
        votingCount: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Name: 'Party B',
        members: 120,
        votingCount: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PartyListings', null, {});  
  }
};
