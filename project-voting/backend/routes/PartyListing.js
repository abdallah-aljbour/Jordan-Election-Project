// const express = require("express");
// const router = express.Router();
// const PartyListingcontroller = require("../controllers/PartyListingcontroller");

// router.post("/createPartyListing", PartyListingcontroller.createPartyListing);
// router.post(
//   "/partyListingInformation",
//   PartyListingcontroller.createPartyListingInformation
// );
// router.delete(
//   "/deleteCitizenPartyList/:nationalID",
//   PartyListingcontroller.deleteCitizenPartyList
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const PartyListingcontroller = require("../controllers/PartyListingcontroller");

router.post("/createPartyListing", PartyListingcontroller.createPartyListing);
router.post(
  "/partyListingInformation",
  PartyListingcontroller.createPartyListingInformation
);
router.delete(
  "/deleteCitizenPartyList/:nationalID",
  PartyListingcontroller.deleteCitizenPartyList
);
router.get("/getPartyListing/:partyID", PartyListingcontroller.getPartyListing);
router.get(
  "/getpartyListingInformation/:partyListingID",
  PartyListingcontroller.getpartyListingInformation
);
router.get("/getCitizen/:nationalID", PartyListingcontroller.getCitizen);
router.put("/editCitizen/:nationalID", PartyListingcontroller.editCitizen);

module.exports = router;
