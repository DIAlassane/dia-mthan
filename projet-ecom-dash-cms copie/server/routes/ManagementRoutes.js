const { Router } = require("express");
const generalController = require("../controllers/GeneralController");
const managementRoutes = require("../controllers/ManagementController");
const verifiedAuth = require("../middleware/AuthMiddleware");

const router = Router();

router.get("/orders", managementRoutes.order);
router.get(
  "/admins",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  managementRoutes.getAdmin
);
router.get("/users", verifiedAuth.verifyToken, managementRoutes.getUsers);
router.get("/users/:userId", managementRoutes.getOneUser);

// STORE --------------------------------------------------------

router.post(
  "/store",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe" // super-admin
  ),
  generalController.createStore
);
router.get("/store/:id", generalController.getOneStore);
router.get("/store", generalController.getAllStoreUser);
router.put(
  "/store/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe" // super-admin
  ),
  generalController.updateStore
);
router.delete(
  "/store/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe" // super-admin
  ),
  generalController.deleteStore
);

// BILLBOARD --------------------------------------------------------

router.post(
  "/createbillboard",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe" // super-admin
  ),
  managementRoutes.upload,
  generalController.createBillboard
);
router.get("/billboard/:id", generalController.getAllBillboard);
router.get("/billboardone/:id", generalController.getOneBillboard);
router.put(
  "/billboard/:id",
  verifiedAuth.verifyToken,
  managementRoutes.upload,
  generalController.updateBillboard
);
router.delete(
  "/billboard/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.deleteBillboard
);

// CATEGORY --------------------------------------------------------

router.get("/category/:id", generalController.getAllCategory);
router.post(
  "/category/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.createCategory
);
router.put(
  "/category/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.updateCategory
);
router.delete(
  "/category/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.deleteCategory
);

// COLOR --------------------------------------------------------

router.get("/color/:id", generalController.getAllColor);
router.post(
  "/color/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.createColor
);
router.put(
  "/color/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.updateColor
);
router.delete(
  "/color/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.deleteColor
);

// SIZE --------------------------------------------------------

router.get("/size/:id", generalController.getAllSize);
router.post(
  "/size/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.createSize
);
router.put(
  "/size/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.updateSize
);
router.delete(
  "/size/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.deleteSize
);

// PRODUCT --------------------------------------------------------

router.post(
  "/allproduct",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.getAllProduct
);
router.get("/product/:id", generalController.getAllProductAdmin);
router.post(
  "/product/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  managementRoutes.upload,
  generalController.createProduct
);
router.delete(
  "/product/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  generalController.deleteProduct
);
router.put(
  "/product/:id",
  verifiedAuth.verifyToken,
  verifiedAuth.IsProtectedAdmin(
    "d8c63008-c4f1-4b56-8aea-494dda680bfe", // super-admin
    "afbcbab2-3c07-4c54-9c99-1bee83155f6f" // admin
  ),
  managementRoutes.upload,
  generalController.updateProduct
);
router.get("/rltproduct/:categoryId", generalController.getRelatedProduct);

module.exports = router;
