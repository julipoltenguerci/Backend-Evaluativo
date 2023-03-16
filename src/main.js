const express = require("express");
const dotEnv = require("dotenv");
const routes = require("./routes");

//Se configuran variables de entorno
dotEnv.config();

//App de express
const app = express();

app.set("PORT", process.env.PORT || 8080);

//Middleware para recibir el body en formato json
app.use(express.json({ limit: "50mb" }));

//Routes
app.use("/api/v1", routes);

//Middleware para error en servidor
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json(err.message || "Ha ocurrido un error en el servidor");
});

module.exports = app;
