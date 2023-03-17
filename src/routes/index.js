// Importación de objeto router y rutas de entidades
const router = require("express").Router();
const employeeRoutes = require("./employee-route");
const assetRoutes = require("./asset-route");

//Rutas
router.use("/employee", employeeRoutes);
router.use("/asset", assetRoutes);

module.exports = router;
