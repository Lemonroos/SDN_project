const express = require("express");
const contractController = require("../controllers/contractController");
const {verifyToken} = require("../config/verify");

const contractRouter = express.Router();
contractRouter
  .route("/")
  .get(contractController.getAll)
  .post(verifyToken, contractController.create);
contractRouter
  .route("/check-if-project-exists")
  .get(verifyToken,contractController.checkIfProjectExists);
contractRouter
  .route("/:Id")
  .get(contractController.getById)
  .put(contractController.updateById);
contractRouter
  .route("/my-contracts/contracts-by-user")
  .get(verifyToken,contractController.getByUserId);

module.exports = contractRouter;
