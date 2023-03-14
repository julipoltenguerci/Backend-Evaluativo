const express = require("express");
const dotEnv = require("dotenv");
const routes = require("./routes");

//Se configuran variables de entorno
dotEnv.config();

//app de express
const app = express();

app.set("PORT", process.env.PORT || 8080);

//middleware para recibir el body en formato json
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/api/v1", routes);

module.exports = app;
