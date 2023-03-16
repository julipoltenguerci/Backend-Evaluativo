const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//middlewares para validar

const createEmployeeValidator = [
  check("first_name")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isLength({ min: 3, max: 80 })
    .withMessage("Escriba mínimo 3 caracteres"),
  check("last_name")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isLength({ min: 3, max: 80 })
    .withMessage("Escriba mínimo 3 caracteres"),
  check("cuit")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isNumeric()
    .withMessage("El campo debe ser numérico"),
  check("team_id")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio"),
  check("join_date")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio"),
  check("rol")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

// const getEmployeeByIdValidator = [
//   check("id_employee")
//     .exists()
//     .withMessage("El id que intenga buscar no se encuentra disponible"),
//   (req, res, next) => {
//     return validateResults(req, res, next);
//   },
// ];

module.exports = { createEmployeeValidator };
//getEmployeeByIdValidator
