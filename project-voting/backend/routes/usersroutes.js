const express = require('express');
const router = express.Router();
const usercontroller= require('../controllers/usercontroller'); 
const userdataController=require('../controllers/userdataController')
// router.post('/signup',usercontroller.signup );
router.post('/login' ,usercontroller.login);
router.get ('/data', userdataController.getAllUsers),
module.exports = router;
