const { Router } = require("express");
const { getUserOnGeneral } = require("../controllers/GeneralController");
const clientController = require("../controllers/ClientController");

const router = Router();

// voir l'utilisateur
router.get("/user/:id", getUserOnGeneral);
router.get("/review", clientController.getAllReview);

module.exports = router;
