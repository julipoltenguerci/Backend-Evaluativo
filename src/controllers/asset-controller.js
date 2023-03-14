const assetModel = require("../models/asset-model");

const getAllAssets = async (req, res) => {
  const assets = await assetModel.getAllAssets();
  res.json({ data: assets });
};

const getAssetById = async (req, res) => {
  const asset = await assetModel.getAssetById(req.params.id);
  res.json({ data: asset });
};

const getAssetsByEmployeeId = async (req, res) => {
  const asset = await assetModel.getAssetsByEmployeeId(req.params.id);
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

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByEmployeeId,
  createAsset,
};
