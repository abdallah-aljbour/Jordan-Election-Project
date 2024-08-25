const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');

router.get('/local-listings', adminController.getLocalListingsWithCandidates);
router.get('/party-listings', adminController.getPartyListingsWithCandidates);
router.post('/remove-candidate', adminController.removeCandidateFromListing);
router.post('/approve-listing', adminController.approveOrRemoveListing);

module.exports = router;