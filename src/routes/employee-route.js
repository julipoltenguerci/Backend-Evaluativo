const employeeRouter = require("express").Router();
const employeeController = require("../controllers/employee-controller");

employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get("/:id", employeeController.getEmployeeById);
employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.delete("/:id", employeeController.deleteEmployee);
employeeRouter.patch("/:id", employeeController.updateEmployee);

module.exports = employeeRouter;
