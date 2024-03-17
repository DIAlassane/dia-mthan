const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const RefToken = require("../middleware/AuthMiddleware");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const verifiedAuth = require("../middleware/AuthMiddleware");
const router = Router();

router.post("/register", AuthController.RegisterUser);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.ForgotPassword);
router.post("/resetPassword/:token", AuthController.resetPassword);
router.post("/refresh-token", RefToken.refreshToken);
router.post(
  "/role",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe" // super-admin
  ),
  AuthController.createRole
);
router.post("/review", verifiedAuth.verifyToken, AuthController.createReview);
router.delete(
  "/review/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  AuthController.deleteReview
);
router.get("/review", AuthMiddleware.verifyToken, AuthController.getAllReview);
router.get("/verify", AuthMiddleware.verifyUser, (req, res) => {
  return res.json({ status: true, massage: "authorized" });
});

module.exports = router;
