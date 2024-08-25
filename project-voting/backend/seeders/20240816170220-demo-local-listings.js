"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "LocalListings",
      [
        {
          listingID: 1,
          Name: "قائمة الكرامة",
          votingCount: 0,
          didPass: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 2,
          Name: "قائمة الوحدة",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 3,
          Name: "الوفاء الوطني",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 4,
          Name: " الميثاق",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 5,
          Name: " الشورى",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 6,
          Name: "قائمة الهمة",
          votingCount: 0,
          didPass: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 7,
          Name: "قائمة العزم",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 8,
          Name: "قائمة الوطن",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 9,
          Name: "قائمة بدو الوسط",
          votingCount: 0,
          didPass: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 10,
          Name: "قائمة الاستقلال",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listingID: 11,
          Name: "قائمة الحق",
          votingCount: 0,
          didPass: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("LocalListings", null, {});
  },
};
