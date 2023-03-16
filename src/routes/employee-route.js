const employeeRouter = require("express").Router();
const employeeController = require("../controllers/employee-controller");

const { createEmployeeValidator } = require("../validators/employee");

employeeRouter
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(createEmployeeValidator, employeeController.createEmployee);

employeeRouter
  .route("/:idE")
  .get(employeeController.getEmployeeById)
  .delete(employeeController.deleteEmployee)
  .put(employeeController.updateEmployee);

module.exports = employeeRouter;
