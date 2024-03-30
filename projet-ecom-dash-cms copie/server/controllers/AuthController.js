const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/UsersModel");
const Role = require("../models/RoleModel");
const Review = require("../models/ReviewModel");
const { generateTokenInCookie } = require("../config/generateToken");

const RegisterUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      country,
      occupation,
      phoneNumber,
      roleId, // Changez role en roleName pour éviter les conflits avec le modèle Role
    } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ error: "Cet utilisateur existe de déjà" });
    }

    // Recherchez le rôle correspondant dans la base de données
    const role = await Role.findOne({ where: { id: roleId } });

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      country,
      occupation,
      phoneNumber,
      roleId: role.id, // Attribuez l'ID du rôle trouvé à roleId
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(400).json({ error: "Email/Mot de passe incorrect" });
    }

    // Génération du token JWT et envoi dans un cookie
    const token = generateTokenInCookie(user.id, user.roleId, res);

    // Envoi des données utilisateur au client
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        occupation: user.occupation,
        phoneNumber: user.phoneNumber,
        roleId: user.roleId,
        url: user.url,
      },
      token: token,
    });
  } catch (error) {
    console.log("Erreur lors de la connexion", error.message);
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Déconnexion réussi");
  } catch (error) {
    console.log("Erreur dans la déconnexion", error.message);
    res.status(500).json({ error: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: "Cet Utilisateur n'existe pas" });
    }

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alassdia0909@gmail.com",
        pass: "ofon nnrf lvhn nzlm",
      },
      debug: true,
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5min",
    });

    var mailOptions = {
      from: "alassdia0909@gmail.com",
      to: email,
      subject: "Modifier votre mot-de-passe",
      text: `http://localhost:3000/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({
          message: "Erreur lors de l'envoi de l'email",
          error: error.message,
        });
      } else {
        return res.json({
          status: true,
          message: "Email envoyé: " + info.response,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Récupérer l'utilisateur associé au token
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = newPassword;
    await user.save();

    return res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(error);
    return res.json({
      message:
        "Une erreur s'est produite lors de la réinitialisation du mot de passe",
    });
  }
};

const createRole = async (req, res) => {
  try {
    const role = {
      name: req.body.name,
      code: req.body.code,
    };

    const type = await Role.create(role);
    res.status(200).json(type);
    console.log(type);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllReview = async (req, res) => {
  try {
    const review = await Review.findAll();

    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const review = {
      productId: req.body.productId,
      userId: req.body.userId,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    const type = await Review.create(review);
    res.status(201).json({ message: type });
    console.log(type);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await Review.destroy({
      where: { id: id },
    });

    res.json("Review was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  RegisterUser,
  login,
  logout,
  ForgotPassword,
  createRole,
  createReview,
  resetPassword,
  deleteReview,
  getAllReview,
};
