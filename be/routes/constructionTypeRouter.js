const express = require("express");
const constructionTypeController = require("../controllers/constructionTypeController");
const {verifyManager} = require('../config/verify')
const constructionTypeRouter = express.Router();
constructionTypeRouter
  .route("/")
  .get(constructionTypeController.getAll)
  .post(verifyManager,constructionTypeController.create);
constructionTypeRouter
  .route("/:Id")
  .get(constructionTypeController.getById)
  .put(verifyManager,constructionTypeController.updateById)
  .delete(verifyManager,constructionTypeController.delete);

module.exports = constructionTypeRouter;
