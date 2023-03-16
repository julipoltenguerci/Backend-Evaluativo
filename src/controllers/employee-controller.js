const employeeModel = require("../models/employee-model");
const HttpError = require("../custumError/HttpError");

const url = require("url");
const querystring = require("querystring");

const getAllEmployees = async (req, res, next) => {
  try {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);

    const employees = await employeeModel.getAllEmployees(parsedQuery);
    if (employees.length === 0) {
      next(new HttpError("No se encontraron empleados disponibles.", 404));
    } else {
      res.json({ data: employees });
    }
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.getEmployeeById(req.params.idE);
    if (employee.length === 0) {
      next(new HttpError("No se encontró empleado con ese id.", 404));
    } else {
      res.json({ data: employee });
    }
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const values = { ...req.body };
    const result = await employeeModel.createEmployee(values);
    if (result) {
      next(
        new HttpError(
          `Se ha creado correctamente un nuevo empleado con ID ${result}`
        )
      );
    }
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { idE } = req.params;
    const result = await employeeModel.updateEmployee(req.body, idE);
    if (result) {
      next(
        new HttpError(`Se ha editado correctamente el empleado con ID ${idE}`)
      );
    }
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { idE } = req.params;
    const result = await employeeModel.deleteEmployee(idE);
    if (result) {
      next(
        new HttpError(`Se ha eliminado correctamente el empleado con ID ${idE}`)
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
