const connection = require("../config/db-config");

const getAllAssets = async () => {
  const sentence = "SELECT * FROM assets";
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows;
};

const getAssetById = async (id) => {
  const sentence = `SELECT * FROM assets a WHERE a.id_asset = ${id}`;
  const row = await connection.query(sentence).spread((row) => row);
  return row;
};

const getAssetsByEmployeeId = async (id) => {
  const sentence = `SELECT * FROM assets a JOIN employees e ON a.id_employee = e.id_employee WHERE a.id_employee = ${id}`;
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

// const deleteAssetsByEmployeeId = async (id) => {
//   const result = await connection
//     .query("DELETE * FROM assets a WHERE a.id_employee = ?", [id])
//     .spread((result) => result);

//   return result;
// };

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByEmployeeId,
  //deleteAssetsByEmployeeId: deleteAssetsByEmployeeId,
  createAsset,
};
