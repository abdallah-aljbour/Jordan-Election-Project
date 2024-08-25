const express = require('express');
const router = express.Router();
const advertisingcontroller = require('../controllers/advertisingcontroller.js');

// usere is from token
router.post('/validate-token', advertisingcontroller.validateToken);

//Request Advertisement
router.post('/RequestAdvertisement', advertisingcontroller.uploadImage, advertisingcontroller.RequestAdvertisement);

//get Advertisement
router.get('/getAdvertisement', advertisingcontroller.getAdvertisement);


// Route لعرض الصورة
router.get('/images/:filename', advertisingcontroller.getImage);

router.post('/payment', advertisingcontroller.createPayment);


/*************change is approved to true***************/
router.put('/updateAdvertisment/:id', advertisingcontroller.updateAdvertisment);

module.exports = router;




