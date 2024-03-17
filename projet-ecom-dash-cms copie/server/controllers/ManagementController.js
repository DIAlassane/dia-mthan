const Users = require("../models/UsersModel");
const OrderModel = require("../models/OrderModel");
const multer = require("multer");
const path = require("path");

const getAdmin = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs avec le rôle "user" et exclure le champ "password"
    const admin = await Users.findAll({
      where: {
        roleId: process.env.ADMIN_ID,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs avec le rôle "user" et exclure le champ "password"
    const user = await Users.findAll({
      where: {
        roleId: process.env.USER_ID,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Utilisez req.params.userId pour récupérer l'identifiant de l'utilisateur
    // Récupérer l'utilisateur avec l'identifiant spécifié
    const user = await Users.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const order = async (req, res) => {
  try {
    // Récupérer l'ordre avec l'id correspondant
    const getOrder = await OrderModel.findAll();

    res.status(200).json(getOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const makeOrder = async (req, res) => {
  try {
    // Récupérer les données de la commande à partir du corps de la requête (à ajuster selon votre structure de données)
    const { productId, quantity, address, phone, isPaid, totalPrice, cart } =
      req.body;

    // Insérer la commande dans la base de données
    const newOrder = await OrderModel.create({
      productId,
      quantity,
      address,
      phone,
      isPaid,
      totalPrice,
      cart,
    });

    // Afficher les détails de la nouvelle commande
    console.log("Nouvelle commande créée : ", newOrder);

    // Envoyer une réponse au client
    res
      .status(201)
      .json({ message: "Commande passée avec succès.", order: newOrder });
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de la création de la commande : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la commande." });
  }
};

// Upload file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper format image jpeg, jpg, png or gif");
  },
}).single("image");

module.exports = {
  getAdmin,
  getUsers,
  getOneUser,
  order,
  makeOrder,
  upload,
};
