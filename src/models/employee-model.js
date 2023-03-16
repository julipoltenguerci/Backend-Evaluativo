const connection = require("../config/db-config");
const filterDml = require("../utils/filterDML");

const getAllEmployees = async (req) => {
  //let orderBy = "order by id_employee ";
  //let direction = "ASC";
  //let initialQuery = `SELECT * FROM employees e where true ${orderBy} ${direction}`;
  let initialQuery = `SELECT * FROM employees e where true `;
  let finalQuery = "";
  let limit = "";

  const queryParams = Object.entries(req.query);

  console.log(queryParams);

  console.log(initialQuery);

  for (let i = 0; i < queryParams.length; i++) {
    if (i === 0) {
      finalQuery = initialQuery.concat(
        ` and ${queryParams[i][0]} = "${queryParams[i][1]}" `
      );
    } else {
      finalQuery = finalQuery.concat(
        ` and ${queryParams[i][0]} = "${queryParams[i][1]}" `
      );
    }
  }

  if (queryParams.length == 0) finalQuery = initialQuery;

  const rows = await connection.query(finalQuery).spread((rows) => rows);
  return rows;
};

const getEmployeeById = async (idE) => {
  const sentence = `SELECT * FROM employees e WHERE e.id_employee = ${idE}`;
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows.length > 0 ? rows[0] : [];
};

const createEmployee = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const result = await connection
    .query(
      "INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]
    )
    .spread((result) => result);
  //console.log(result);
  return result.insertId;
};

const updateEmployee = async (req, idE) => {
  const body = Object.entries(req);
  let sentence = "UPDATE employees SET ";
  for (let i = 0; i < body.length; i++) {
    if (i === body.length - 1) {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}" `);
    } else {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}", `);
    }
  }
  sentence = sentence.concat(`WHERE id_employee = ${idE}`);

  const result = await connection.query(sentence).spread((result) => result);
  return result;
};

const deleteEmployee = async (idE) => {
  const sentence = `DELETE FROM employees WHERE id_employee = ${idE}`;
  const result = await connection.query(sentence).spread((result) => result);
  return result.affectedRows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
