const assetRouter = require("express").Router();
const assetController = require("../controllers/asset-controller");

assetRouter.get("/", assetController.getAllAssets);
assetRouter.get("/:id", assetController.getAssetById);
assetRouter.get("/employee/:id", assetController.getAssetsByEmployeeId);
assetRouter.post("/", assetController.createAsset);
//assetRouter.delete("/", assetController.deleteAsset);
module.exports = assetRouter;
