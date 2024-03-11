const express = require("express");
const projectController = require("../controllers/projectController");
const { verifyToken } = require("../config/verify");
const projectRouter = express.Router();
projectRouter
  .route("/")
  .get(projectController.getAll)
  .post(verifyToken, projectController.create);

projectRouter
  .route("/my-projects")
  .get(verifyToken, projectController.getProjectsByUserId);

projectRouter
  .route("/:Id")
  .get(projectController.getById)
  .put(verifyToken, projectController.updateById)
  .delete(verifyToken, projectController.delete);

module.exports = projectRouter;
