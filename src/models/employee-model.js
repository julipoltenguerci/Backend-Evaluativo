const connection = require("../config/db-config");

const getAllEmployees = async () => {
  const sentence = "SELECT * FROM employees e";
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows;
};

const getEmployeeById = async (id) => {
  const sentence = `SELECT * FROM employees e WHERE e.id_employee = ${id}`;
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
  //return result[0].insertId;
};

const updateEmployee = async (req, id) => {
  const body = Object.entries(req);
  let sentence = "UPDATE employees SET ";
  for (let i = 0; i < body.length; i++) {
    if (i === body.length - 1) {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}" `);
    } else {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}", `);
    }
  }
  sentence = sentence.concat(`WHERE id_employee = ${id}`);

  const result = await connection.query(sentence).spread((result) => result);
  return result;
};

const deleteEmployee = async (id) => {
  const result = await connection
    .query(`DELETE FROM employees WHERE id_employee = ${id}`)
    .spread((result) => result);
  return result.affectedRows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
