const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DIALECT,
  process.env.SECRET,
  {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.SECRET,
    database: process.env.DATABASE,
    logging: console.log,
  }
);

module.exports = { sequelize };

// Bonjour, Je me permets de vous écrire pour savoir si vous avez bien reçu mon précédent courriel concernant mes attestations de paiement. Si ce n'est pas le cas, pourriez-vous me le confirmer afin que je puisse vous le renvoyer ? Je vous remercie par avance pour votre aide et vous prie de recevoir, Madame, Monsieur, mes salutations distinguées. Dia Alassane.
