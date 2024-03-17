const Review = require("../models/ReviewModel");
const User = require("../models/UsersModel");
const { Op } = require("sequelize");

const getCustomers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs avec le rôle "user" et exclure le champ "password"
    const customers = await User.findAll({
      where: {
        roleId: process.env.USER_ID,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs avec le rôle "user" et exclure le champ "password"
    const customers = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllReview = async (req, res) => {
  try {
    const productId = req.query.productId; // Utilisez req.query.productId
    const review = await Review.findAll({
      where: { productId: productId },
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const setImages = async (req, res) => {
  const { url, id } = req.body;

  try {
    // Mettre à jour l'URL de la photo de profil dans la table User
    const updatedRowsCount = await User.update(
      { url: url },
      {
        where: { id: id },
        returning: true, // Permet de renvoyer les lignes mises à jour
      }
    );

    if (updatedRowsCount[0] === 0) {
      return res.status(404).json({
        message:
          "L'utilisateur n'a pas été trouvé ou la photo de profil existe déjà.",
      });
    }

    res.status(200).json({
      message: "Photo de profil mise à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Review],
    });

    const usersWithPhotos = await Promise.all(
      users.map(async (user) => {
        const photoUrl = await getUserWithPhoto(user.id);
        return { ...user.toJSON(), photoUrl };
      })
    );

    res.json(usersWithPhotos);
  } catch (error) {
    console.error("Error fetching users with photos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const replyComment = async (req, res) => {
  const { commentId } = req.params; // Correction: Utilisez req.params.commentId pour récupérer l'ID du commentaire
  try {
    if (commentId) {
      // Récupérez le commentaire auquel vous souhaitez répondre
      const review = await Review.findByPk(commentId);
      if (!review) {
        return res.status(404).json({ error: "Commentaire non trouvé" });
      }

      // Ajoutez la réponse à la liste des réponses existantes
      const reply = {
        name: req.body.name,
        reply: req.body.reply,
        url: req.body.url,
        date: new Date(), // Utilisez new Date() pour obtenir la date et l'heure actuelles
      };

      review.replies = [...(review.replies || []), reply];

      // Enregistrez les modifications dans la base de données
      await review.save();

      return res.status(201).json(review); // Retournez le commentaire mis à jour avec la réponse
    } else {
      return res.status(400).json({
        error: "ID du commentaire manquant",
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la création de la réponse au commentaire :",
      error
    );
    return res.status(500).json({
      error: "Erreur lors de la création de la réponse au commentaire",
    });
  }
};

module.exports = {
  getCustomers,
  getAllCustomers,
  getAllReview,
  setImages,
  getUsers,
  replyComment,
};
