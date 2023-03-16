const employeeModel = require("../models/employee-model");
const { handleHttpError } = require("../utils/handleError");

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeModel.getAllEmployees(req);
    res.json({ data: employees });
  } catch (e) {
    //handleHttpError(res, "No se encontraron empleados.");
    next(e);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.getEmployeeById(req.params.idE);
    res.json({ data: employee });
  } catch (e) {
    //handleHttpError(res, "No se encontró empleado con ese id.");
    next(e);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const values = { ...req.body };
    const result = await employeeModel.createEmployee(values);
    //console.log(result);
    res.send(`Se ha creado correctamente un nuevo empleado con ID ${result}`);
  } catch (e) {
    //handleHttpError(res, "Error, no se pudo crear el empleado");
    next(e);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { idE } = req.params;
    const result = await employeeModel.updateEmployee(req.body, idE);
    res.send(`Se ha editado correctamente el empleado con ID ${idE}`);
  } catch (e) {
    //handleHttpError(res, "Error, no se pudo actualizar el empleado");
    next(e);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { idE } = req.params;
    const result = await employeeModel.deleteEmployee(idE);
    res.send(`Se ha eliminado correctamente el empleado con ID ${idE}`);
  } catch (e) {
    //handleHttpError(res, "Error, no se pudo eliminar el empleado");
    next(e);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
