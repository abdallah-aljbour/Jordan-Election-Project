const express = require("express");
const debateController = require("../controllers/debateControllers");
const router = express.Router();
const callUser = require("../middlwares/callUser");
const auth = require("../middlwares/auth");
router.post("/createDebate", auth, callUser, debateController.makeDebate);
router.get("/getDebates", auth, debateController.getDebates);
router.get("/getDebator",auth,debateController.getDebator)
router.get("/getDebators", auth, debateController.getDebators);
module.exports = router;
