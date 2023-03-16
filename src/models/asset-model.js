const connection = require("../config/db-config");

const getAllAssets = async () => {
  const sentence = "SELECT * FROM assets";
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows;
};

const getAssetById = async (idA) => {
  const sentence = `SELECT * FROM assets a WHERE a.id_asset = ${idA}`;
  const row = await connection.query(sentence).spread((row) => row);
  return row;
};

const getAssetsByEmployeeId = async (idE) => {
  //console.log("test", idE);
  const sentence = `SELECT * FROM assets a JOIN employees e ON a.id_employee = e.id_employee WHERE a.id_employee= ${idE}`;
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows;
};

const createAsset = async (values) => {
  const { name, type, code, brand, description, purchase_date, id_employee } =
    values;

  const result = await connection
    .query(
      "INSERT INTO assets(name, type, code, brand, description, purchase_date, id_employee ) values(?,?,?,?,?,?,?)",
      [name, type, code, brand, description, purchase_date, id_employee]
    )
    .spread((result) => result);
  //console.log(result);
  return result.insertId;
  //return result[0].insertId;
};
const updateAsset = async (req, idA) => {
  const body = Object.entries(req);
  let sentence = "UPDATE assets SET ";
  for (let i = 0; i < body.length; i++) {
    if (i === body.length - 1) {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}" `);
    } else {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}", `);
    }
  }
  sentence = sentence.concat(`WHERE id_asset = ${idA}`);

  const result = await connection.query(sentence).spread((result) => result);
  return result;
};

const deleteAsset = async (idA) => {
  const sentence = `DELETE FROM assets WHERE id_asset = ${idA}`;
  const result = await connection.query(sentence).spread((result) => result);
  return result.affectedRows;
};

// const deleteAssetsByEmployeeId = async (idA) => {
//   const result = await connection
//     .query("DELETE * FROM assets a WHERE a.id_employee = ?", [id])
//     .spread((result) => result);

//   return result;
// };

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByEmployeeId,
  deleteAsset,
  //deleteAssetsByEmployeeId: deleteAssetsByEmployeeId,
  createAsset,
  updateAsset,
};
