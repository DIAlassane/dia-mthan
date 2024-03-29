// Librairie
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { rateLimit } = require("express-rate-limit");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Autorise les requêtes provenant de ce domaine
  credentials: true, // Indiquez que les cookies et les en-têtes d'authentification peuvent être inclus
  optionsSuccessStatus: 200, // some legacy browsers
  methods: "GET,PUT,OPTIONS,POST,DELETE", // methodes accepter
  // le serveur ne doit pas continuer à traiter la requête après avoir reçu une requête de pré-vérification (pré-vol).
  preflightContinue: false,
};
app.use(cors(corsOptions));

// Configuration
app.use(helmet());
// les ressources ne peuvent être chargées que depuis un domaine différent
// (cross-origin) s'ils possèdent l'en-tête CORS approprié.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// analyser les données JSON envoyées dans les requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined", { common: "common" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de temps : 15 minutes
  limit: 100, // Limite chaque adresse IP à 5 requêtes par fenêtre (ici, par 15 minutes).
  standardHeaders: "draft-7", // draft-6 : en-têtes `RateLimit-*` ; draft-7 : en-tête `RateLimit` combiné
  legacyHeaders: true, // Désactive les en-têtes `X-RateLimit-*`.
  // store: ... , // Utilise un magasin externe pour la cohérence sur plusieurs instances de serveur.
  message: "Trop c'est trop ! Reviens dans 15 minutes", // Message renvoyé en cas de dépassement de limite
});
// Database connection route
const db = require("./config/database");
// Routes
const clientRoutes = require("./routes/ClientRoutes");
const generalRoutes = require("./routes/GeneralRoutes");
const managementRoutes = require("./routes/ManagementRoutes");
const authRoutes = require("./routes/AuthRoutes");

const User = require("./models/UsersModel");
const Transaction = require("./models/TransactionModel");
const Orders = require("./models/OrderModel");
const Store = require("./models/StoreModel");
const Size = require("./models/SizeModel");
const Product = require("./models/ProductModel");
const Category = require("./models/CategoryModel");
const Color = require("./models/ColorModel");
const Billboard = require("./models/BillboardModel");
const Payment = require("./models/PaymentModel");
const Review = require("./models/ReviewModel");
const Role = require("./models/RoleModel");

// Synchroniser les modèles avec la base de données
db.sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("Base de données synchronisée.");
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });

app.use("/auth", limiter);
app.use("/client", clientRoutes);
const absoluteImagePath = path.resolve(__dirname, "Images");
app.use("/Images", express.static(path.resolve(__dirname, "Images")));
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
