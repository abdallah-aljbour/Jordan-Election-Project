const express = require('express');
const router = express.Router();
const LocalListController = require('../controllers/LocalListController');


router.post('/createLocalList', LocalListController.createLocalListing);
router.post('/localListingInformation', LocalListController.createlocalListingInformation);
router.get('/getLocalListing/:listingID', LocalListController.getLocalListing);
router.get('/getCitizen/:nationalID', LocalListController.getCitizen);
router.delete('/deleteCitizenLocaList/:nationalID', LocalListController.deleteCitizenLocaList);
router.get('/getlocalListingInformation/:localListingID', LocalListController.getlocalListingInformation);
router.put('/editCitizen/:nationalID', LocalListController.editCitizen);



module.exports = router;
