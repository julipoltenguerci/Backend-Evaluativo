const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//middlewares para validar

const createAssetValidator = [
  check("name")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isLength({ min: 3, max: 80 })
    .withMessage("Escriba mínimo 3 caracteres"),
  check("type")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isLength({ min: 3, max: 80 })
    .withMessage("Escriba mínimo 3 caracteres"),
  check("code").optional(),
  // .exists()
  // .withMessage("El campo es obligatorio")
  // .notEmpty()
  // .withMessage("Campo no debe quedar vacio"),
  check("brand")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio"),
  check("description")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio"),
  check("purchase_date")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { createAssetValidator };
