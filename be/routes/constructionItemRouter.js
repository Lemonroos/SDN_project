const express = require("express");
const constructionItemController = require("../controllers/constructionItemController");
const {verifyManager} = require('../config/verify')
const constructionItemRouter = express.Router();
constructionItemRouter
  .route("/")
  .get(constructionItemController.getAll)
  .post(verifyManager,constructionItemController.create);

  constructionItemRouter
  .route("/:Id")
  .get(constructionItemController.getById)
  .put(verifyManager,constructionItemController.updateById)
  .delete(verifyManager,constructionItemController.delete);

module.exports = constructionItemRouter;
