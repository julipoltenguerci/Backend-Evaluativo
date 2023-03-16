const connection = require("../config/db-config");
const filterDml = require("../utils/filterDML");

const getAllEmployees = async (empleado) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = empleado;
  console.log(empleado);

  let orderBy = "order by id_employee ";
  let direction = "";
  //let initialQuery = `SELECT * FROM employees e where true ${orderBy} ${direction}`;
  //let initialQuery = `SELECT * FROM employees e `;
  //let finalQuery = "";
  let limitQuery = "";
  let where = "where true ";
  let page = 5;

  //const queryParams = Object.entries(req.query);

  //console.log(queryParams);
  //console.log(initialQuery);

  // for (let i = 0; i < queryParams.length; i++) {
  //   if (
  //     queryParams[i][0] != "orderBy" &&
  //     queryParams[i][0] != "direction" &&
  //     queryParams[i][0] != "limit"
  //   ) {
  //     //todo el where
  //     if (i === 0) {
  //       where = where.concat(
  //         ` and ${queryParams[i][0]} = "${queryParams[i][1]}" `
  //       );
  //     } else {
  //       where = where.concat(
  //         ` and ${queryParams[i][0]} = "${queryParams[i][1]}" `
  //       );
  //     }
  //   } else {
  //     //direccion
  //     console.log("vuelta", i);

  //     if (queryParams[i][0] == "direction") {
  //       direction = `${queryParams[i][1]} `;
  //       console.log("el direction es; ", direction);
  //     }
  //     if (queryParams[i][0] == "orderby") {
  //       //order by
  //       orderBy = `order by  ${queryParams[i][1]} `;
  //       console.log("order es; ", orderBy);
  //     }
  //     if (queryParams[i][0] == "limit") {
  //       //limit by
  //       //let limit = queryParams[i][1];
  //       //console.log("limite:", limit);
  //       //let pageSize = (page - 1) * limit;
  //       //console.log("page size:", pageSize);
  //       //limitQuery = ` ${pageSize}, ${limit}`;
  //     }
  //   }
  // }
  if (first_name) {
    where = where.concat(` AND first_name like "${first_name}%"`);
  }
  if (last_name) {
    where = where.concat(` AND last_name like "${last_name}%"`);
  }
  if (cuit) {
    where = where.concat(` AND cuit like "${cuit}%"`);
  }
  if (team_id) {
    where = where.concat(` AND team_id like "${team_id}%"`);
  }
  if (join_date) {
    where = where.concat(` AND join_date like "${join_date}%"`);
  }
  if (rol) {
    where = where.concat(` AND rol like "${rol}%"`);
  }

  console.log("el where es: ", where);

  let finalQuery = `SELECT * FROM employees e ${where} ${orderBy} ${direction} `;

  console.log("la query es: ", finalQuery);

  //if (queryParams.length == 0) finalQuery = initialQuery;

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
