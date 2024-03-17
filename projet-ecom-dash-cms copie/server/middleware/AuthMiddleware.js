const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      // Indiquer au frontend qu'une redirection est nécessaire
      return res.status(403).json({ redirect: "/home" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    const roleId = req.user.roleId; // Extrayez le roleId de req.user
    console.log("Rôle de l'utilisateur :", roleId);
    console.log("Rôle de l'utilisateur :", req.user);
    next();
  } catch (err) {
    // Gérer les erreurs lors de la vérification du token
    console.error(err);
    // Indiquer au frontend qu'une redirection est nécessaire en cas d'erreur
    res.status(403).json({ redirect: "/home" });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  if (!refreshTokens[refreshToken]) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
};

const IsProtectedAdmin = (...roles) => {
  return async (req, res, next) => {
    console.log("Roles autorisés :", roles);
    console.log("Role de l'utilisateur :", req.user.roleId);

    if (!roles.includes(req.user.roleId)) {
      return res
        .status(403)
        .json("L'accès est bloqué. Veuillez contacter l'ENTREPRISE !");
    } else {
      next();
    }
  };
};

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.Authorization; // Récupérer le jeton depuis l'en-tête Authorization
    if (!token) {
      return res.json({ status: false, message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ status: false, message: "Invalid token provided" });
    }
    req.user = decoded; // Stocker les informations utilisateur dans l'objet req pour une utilisation ultérieure
    next();
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports = {
  verifyToken,
  IsProtectedAdmin,
  refreshToken,
  verifyUser,
};
