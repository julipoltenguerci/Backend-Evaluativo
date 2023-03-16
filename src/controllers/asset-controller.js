const assetModel = require("../models/asset-model");

const url = require("url");
const querystring = require("querystring");

const getAllAssets = async (req, res, next) => {
  try {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);

    const assets = await assetModel.getAllAssets(parsedQuery);
    if (assets.length === 0) {
      res.json(
        handleHttpError(res, "No se encontraron activos disponibles.", 404)
      );
    }
    res.json({ data: assets });
  } catch (e) {
    next(e);
  }
};

const getAssetById = async (req, res) => {
  const asset = await assetModel.getAssetById(req.params.idA);
  res.json({ data: asset });
};

const getAssetsByEmployeeId = async (req, res) => {
  const asset = await assetModel.getAssetsByEmployeeId(req.params.idE);
  res.json({ data: asset });
};

const createAsset = async (req, res) => {
  try {
    const values = { ...req.body };
    const result = await assetModel.createAsset(values);

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "Algo pasó" });
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const { idA } = req.params;
    const result = await assetModel.updateAsset(req.body, idA);
    res.send(`Se ha editado correctamente el activo con ID ${idA}`);
  } catch (e) {
    next(e);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    const { idA } = req.params;
    const result = await assetModel.deleteAsset(idA);
    res.send(`Se ha eliminado correctamente el asset con ID ${idA}`);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByEmployeeId,
  createAsset,
  updateAsset,
  deleteAsset,
};
