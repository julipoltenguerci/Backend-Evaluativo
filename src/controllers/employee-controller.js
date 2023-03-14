const employeeModel = require("../models/employee-model");

const getAllEmployees = async (req, res) => {
  const queryParams = req.query;
  const employees = await employeeModel.getAllEmployees(queryParams);
  res.json({ data: employees });
};

const getEmployeeById = async (req, res) => {
  const employee = await employeeModel.getEmployeeById(req.params.id);
  res.json({ data: employee });
};

const createEmployee = async (req, res) => {
  try {
    const values = { ...req.body };
    const result = await employeeModel.createEmployee(values);

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "Algo sucedió" });
  }
};

const updateEmployee = async (req, res) => {
  const result = await employeeModel.updateEmployee(req.body, req.params.id);
  res.json({ data: result });
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const result = await employeeModel.deleteEmployee(id);
  res.json({ data: id });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
