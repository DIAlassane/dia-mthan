const { Op } = require("sequelize");
const Billboard = require("../models/BillboardModel");
const Category = require("../models/CategoryModel");
const Color = require("../models/ColorModel");
const Product = require("../models/ProductModel");
const Size = require("../models/SizeModel");
const Store = require("../models/StoreModel");
const User = require("../models/UsersModel");

const getUserOnGeneral = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------------------------------------------------------------------------------------------------

const createStore = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir du corps de la requête
    const userId = req.body.userId;

    // Créer le magasin avec le nom et l'ID de l'utilisateur
    const store = {
      name: req.body.name,
      userId: userId,
    };

    // Utiliser Sequelize pour créer le magasin dans la base de données
    const save = await Store.create(store);

    // Retourner la réponse avec le magasin créé
    res.status(200).json(save);
  } catch (error) {
    // Gérer les erreurs en renvoyant une réponse avec le message d'erreur
    res.status(401).json({ error: error.message });
  }
};

const getOneStore = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher le magasin associé à l'ID de l'utilisateur
    const store = await Store.findOne({
      where: {
        userId: id, // Utiliser l'ID de l'utilisateur comme critère de recherche
      },
    });

    // Vérifier si le magasin existe
    if (!store) {
      return res
        .status(404)
        .json({ error: "Le magasin associé à cet utilisateur n'existe pas." });
    }

    // Retourner le magasin trouvé
    res.status(200).json(store);
  } catch (error) {
    console.error("Erreur lors de la récupération du magasin :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const getAllStoreUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher tous les magasins associés à l'ID de l'utilisateur
    const stores = await Store.findAll();

    // Vérifier si des magasins sont trouvés
    if (stores.length === 0) {
      return res.status(404).json({
        error: "Les magasins associés à cet utilisateur n'existent pas.",
      });
    }

    // Retourner les magasins trouvés
    res.status(200).json(stores);
  } catch (error) {
    console.error("Erreur lors de la récupération des magasins :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const getAllStore = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher tous les magasins associés à l'ID de l'utilisateur
    const stores = await Store.findAll();

    // Vérifier si des magasins sont trouvés
    if (stores.length === 0) {
      return res.status(404).json({
        error: "Les magasins associés à cet utilisateur n'existent pas.",
      });
    }

    // Retourner les magasins trouvés
    res.status(200).json(stores);
  } catch (error) {
    console.error("Erreur lors de la récupération des magasins :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const updateStore = async (req, res) => {
  try {
    const { name } = req.body; // Récupérer les valeurs name et value du corps de la requête
    const id = req.params.id; // Récupérer l'identifiant de la couleur à mettre à jour depuis les paramètres de l'URL

    // Utiliser la méthode update() de Sequelize pour mettre à jour la couleur dans la base de données
    const updatedStore = await Store.update(
      { name }, // Les champs à mettre à jour
      { where: { id } } // Condition pour la mise à jour (basée sur l'identifiant de la couleur)
    );

    res.json("La Store a été mise à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la store :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStore = await Store.destroy({
      where: { id: id },
    });

    res.json("Store was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// -----------------------------------------------------------------------------------------------------------------

const createBillboard = async (req, res) => {
  try {
    const billboard = {
      image: req.file.path,
      label: req.body.label,
      storeId: req.body.storeId,
    };

    const banner = await Billboard.create(billboard);
    res.status(200).json(banner);
    console.log(banner);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllBillboard = async (req, res) => {
  try {
    // Récupérer storeId à partir de la requête URL
    const storeId = req.params.id;

    // Rechercher tous les panneaux publicitaires associés à storeId
    const billboards = await Billboard.findAll({
      where: { storeId: storeId },
    });

    // Vérifier si des panneaux publicitaires sont trouvés
    if (billboards.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun panneau publicitaire trouvé pour ce magasin." });
    }

    // Retourner les panneaux publicitaires trouvés
    res.status(200).json(billboards);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des panneaux publicitaires :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const updateBillboard = async (req, res) => {
  try {
    const label = req.body.label; // Récupérer les valeurs name et value du corps de la requête
    const image = req.file.path;
    const storeId = req.body.storeId;
    const id = req.params.id; // Récupérer l'identifiant de la couleur à mettre à jour depuis les paramètres de l'URL

    // Utiliser la méthode update() de Sequelize pour mettre à jour la couleur dans la base de données
    const updatedbillboard = await Billboard.update(
      { label, image, storeId }, // Les champs à mettre à jour
      { where: { id } } // Condition pour la mise à jour (basée sur l'identifiant de la couleur)
    );

    res.json("La Billboard a été mise à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la Billboard :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const deleteBillboard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletebillboard = await Billboard.destroy({
      where: { id: id },
    });

    res.json("Billboard was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

const getOneBillboard = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher le magasin associé à l'ID de l'utilisateur
    const billboard = await Billboard.findOne({
      where: {
        id: id, // Utiliser l'ID de l'utilisateur comme critère de recherche
      },
    });

    // Vérifier si le magasin existe
    if (!billboard) {
      return res
        .status(404)
        .json({ error: "Le magasin associé à cet utilisateur n'existe pas." });
    }

    // Retourner le magasin trouvé
    res.status(200).json(billboard);
  } catch (error) {
    console.error("Erreur lors de la récupération du magasin :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// ---------------------------------------------------------------------------------------------------------------

const createCategory = async (req, res) => {
  try {
    const category = {
      name: req.body.name,
      storeId: req.params.id,
    };

    const type = await Category.create(category);
    res.status(200).json(type);
    console.log(type);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    // Récupérer storeId à partir de la requête URL
    const storeId = req.params.id;

    // Rechercher tous les panneaux publicitaires associés à storeId
    const category = await Category.findAll({
      where: { storeId: storeId },
    });

    // Vérifier si des panneaux publicitaires sont trouvés
    if (category.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun panneau publicitaire trouvé pour ce magasin." });
    }

    // Retourner les panneaux publicitaires trouvés
    res.status(200).json(category);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des panneaux publicitaires :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body; // Récupérer les valeurs name et value du corps de la requête
    const id = req.params.id; // Récupérer l'identifiant de la couleur à mettre à jour depuis les paramètres de l'URL

    // Utiliser la méthode update() de Sequelize pour mettre à jour la couleur dans la base de données
    const updatedCategory = await Category.update(
      { name }, // Les champs à mettre à jour
      { where: { id } } // Condition pour la mise à jour (basée sur l'identifiant de la couleur)
    );

    res.json("La Categorie a été mise à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la categorie :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.destroy({
      where: { id: id },
    });

    res.json("Category was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// -------------------------------------------------------------------------------------------------------------

const createColor = async (req, res) => {
  try {
    const color = {
      name: req.body.name,
      value: req.body.value,
      storeId: req.params.id,
    };

    const type = await Color.create(color);
    res.status(200).json(type);
    console.log(type);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllColor = async (req, res) => {
  try {
    // Récupérer storeId à partir de la requête URL
    const storeId = req.params.id;

    // Rechercher tous les panneaux publicitaires associés à storeId
    const color = await Color.findAll({
      where: { storeId: storeId },
    });

    // Vérifier si des panneaux publicitaires sont trouvés
    if (color.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun panneau publicitaire trouvé pour ce magasin." });
    }

    // Retourner les panneaux publicitaires trouvés
    res.status(200).json(color);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des panneaux publicitaires :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const updateColor = async (req, res) => {
  try {
    const { name, value } = req.body; // Récupérer les valeurs name et value du corps de la requête
    const id = req.params.id; // Récupérer l'identifiant de la couleur à mettre à jour depuis les paramètres de l'URL

    // Utiliser la méthode update() de Sequelize pour mettre à jour la couleur dans la base de données
    const updatedColor = await Color.update(
      { name, value }, // Les champs à mettre à jour
      { where: { id } } // Condition pour la mise à jour (basée sur l'identifiant de la couleur)
    );

    res.json("La couleur a été mise à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la couleur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteColor = await Color.destroy({
      where: { id: id },
    });

    res.json("Color was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// -------------------------------------------------------------------------------------------------------------

const createSize = async (req, res) => {
  try {
    const size = {
      name: req.body.name,
      value: req.body.value,
      storeId: req.params.id,
    };

    const type = await Size.create(size);
    res.status(200).json(type);
    console.log(type);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllSize = async (req, res) => {
  try {
    // Récupérer storeId à partir de la requête URL
    const storeId = req.params.id;

    // Rechercher tous les panneaux publicitaires associés à storeId
    const size = await Size.findAll({
      where: { storeId: storeId },
    });

    // Vérifier si des panneaux publicitaires sont trouvés
    if (size.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun panneau publicitaire trouvé pour ce magasin." });
    }

    // Retourner les panneaux publicitaires trouvés
    res.status(200).json(size);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des panneaux publicitaires :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const updateSize = async (req, res) => {
  try {
    const { name, value } = req.body; // Récupérer les valeurs name et value du corps de la requête
    const id = req.params.id; // Récupérer l'identifiant de la couleur à mettre à jour depuis les paramètres de l'URL

    // Utiliser la méthode update() de Sequelize pour mettre à jour la couleur dans la base de données
    const updatedSize = await Size.update(
      { name, value }, // Les champs à mettre à jour
      { where: { id } } // Condition pour la mise à jour (basée sur l'identifiant de la couleur)
    );

    res.json("La Taille a été mise à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la taille :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSize = await Size.destroy({
      where: { id: id },
    });

    res.json("Size was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// -------------------------------------------------------------------------------------------------------------

const createProduct = async (req, res) => {
  try {
    // tout ce que l'on requiere du body => Front-End
    const product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      supply: req.body.supply,
      isFeatured: req.body.isFeatured,
      isArchived: req.body.isArchived,
      storeId: req.params.id,
      image: req.file.path,
      sizeId: req.body.sizeId,
      categoryId: req.body.categoryId,
      colorId: req.body.colorId,
    };

    // requete de creation de la requete avec les element du request => 'product'
    const type = await Product.create(product);
    // reponse envoyer au front avec le produit
    res.status(200).json(type);
    console.log(type);
  } catch (error) {
    // erreur
    res.status(401).json({ error: error.message });
  }
};

const getAllProductAdmin = async (req, res) => {
  try {
    // Récupérer storeId à partir de la requête URL
    const storeId = req.params.id;

    // Rechercher tous les panneaux publicitaires associés à storeId
    const product = await Product.findAll({
      where: { storeId: storeId },
    });

    // Vérifier si des panneaux publicitaires sont trouvés
    if (product.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun panneau publicitaire trouvé pour ce magasin." });
    }

    // Retourner les panneaux publicitaires trouvés
    res.status(200).json(product);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des panneaux publicitaires :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      supply: req.body.supply,
      isFeatured: req.body.isFeatured,
      isArchived: req.body.isArchived,
      storeId: req.body.storeId,
      image: req.file.path,
      sizeId: req.body.sizeId,
      categoryId: req.body.categoryId,
      colorId: req.body.colorId,
    };
    const id = req.params.id; // Récupérer l'identifiant de la couleur à mettre à jour depuis les paramètres de l'URL

    // Utiliser la méthode update() de Sequelize pour mettre à jour le produit dans la base de données
    const updatedProduct = await Product.update(
      product, // Les champs à mettre à jour
      { where: { id } } // Condition pour la mise à jour (basée sur l'identifiant du produit)
    );

    // Retourner un message de succés
    res.json("Le produit a été mise à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la taille :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Récuperer 'id' dans l'url de la requête
    const { id } = req.params;
    // Utiliser la méthode destroy() de Sequelize pour supprimer un produit
    const deleteProduct = await Product.destroy({
      where: { id: id },
    });
    // Retourner un message de succés
    res.json("Product was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// cote client

const getAllProduct = async (req, res) => {
  try {
    // Récupérer storeId à partir de la requête URL
    const storeId = req.params.id;

    // Rechercher tous les panneaux publicitaires associés à storeId
    const product = await Product.findAll({
      where: { storeId: storeId },
    });

    // Vérifier si des panneaux publicitaires sont trouvés
    if (product.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun panneau publicitaire trouvé pour ce magasin." });
    }

    // Retourner les panneaux publicitaires trouvés
    res.status(200).json(product);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des panneaux publicitaires :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const getRelatedProduct = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Appeler la fonction existante pour obtenir les produits associés
    const relatedProducts = await Product.findAll({
      // Condition
      where: { categoryId: categoryId },
      limit: 3,
    });

    // Retourner les produits associés
    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits associés :",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
// --------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  getUserOnGeneral,

  createStore,
  getOneStore,
  getAllStoreUser,
  updateStore,
  deleteStore,
  getAllStore,

  getAllBillboard,
  createBillboard,
  updateBillboard,
  deleteBillboard,
  getOneBillboard,

  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,

  createColor,
  getAllColor,
  deleteColor,
  updateColor,

  createSize,
  getAllSize,
  updateSize,
  deleteSize,

  getAllProductAdmin,
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getRelatedProduct,
};
