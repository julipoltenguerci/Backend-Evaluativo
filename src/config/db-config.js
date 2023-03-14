const db = require("mysql2-promise")();
const dotEnv = require("dotenv");
dotEnv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
};

db.configure((error) => {
  if (!error) {
    console.log("Se realizó con éxito la conexión");
  } else {
    throw error;
  }
});

db.configure(config);

module.exports = db;
