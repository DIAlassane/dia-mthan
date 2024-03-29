const { Router } = require("express");
const ManaController = require("../controllers/ManagementController");
const verifiedAuth = require("../middleware/AuthMiddleware");
const clientController = require("../controllers/ClientController");

const router = Router();

router.get("/customers", clientController.getCustomers);
router.get("/allcustomers", clientController.getAllCustomers);
router.get("/getphoto", clientController.getUsers);
router.post("/order", verifiedAuth.verifyToken, ManaController.makeOrder);
router.post("/set-image", verifiedAuth.verifyToken, clientController.setImages);
router.post(
  "/reviews/:commentId/reply",
  verifiedAuth.verifyToken,
  clientController.replyComment
);

module.exports = router;
