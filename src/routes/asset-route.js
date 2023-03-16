const assetRouter = require("express").Router();
const assetController = require("../controllers/asset-controller");
const { createAssetValidator } = require("../validators/asset");

assetRouter
  .route("/")
  .get(assetController.getAllAssets)
  .post(createAssetValidator, assetController.createAsset);

assetRouter.get("/:idA", assetController.getAssetById);
assetRouter.put("/:idA", assetController.updateAsset);
assetRouter.delete("/:idA", assetController.deleteAsset);
assetRouter.get("/employee/:idE", assetController.getAssetsByEmployeeId);

module.exports = assetRouter;
