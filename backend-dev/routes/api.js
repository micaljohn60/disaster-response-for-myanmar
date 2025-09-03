const express = require("express");
const router = express.Router();
// controller here
const apiController = require("../controllers/apiController");

router.post("/person/rescue/add", apiController.addMissingPerson);
router.get("/persons/lists", apiController.getAllMissingPerson);

module.exports = router;
