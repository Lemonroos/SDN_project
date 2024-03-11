const Contracts = require("../models/Contract");
const { verifyToken } = require("../config/verify");
class ContractController {
  getAll(req, res, next) {
    Contracts.find({})
      .populate({
        path: "quote",
        populate: { path: "project", populate: { path: "constructionType" } },
      })
      .populate("user")
      .then((contracts) => {
        res.status(200).json(contracts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  checkIfProjectExists(req, res, next) {
    const projectId = req.query.projectId;
    Contracts.find({ user: req.user.id })
    .populate({
      path: "quote",
      populate: { path: "project" },
    })
      .then((contracts) => {
        let flag = false;
        contracts.forEach((contract) => {
          if (contract.quote.project._id.toString() === projectId.toString()) {
          flag = true;
          }
        })
        return res.status(200).json(flag);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const contractId = req.params.Id;
    Contracts.findOne({ _id: contractId })
      .populate({
        path: "quote",
        populate: { path: "project", populate: { path: "constructionType" } },
      })
      .populate({
        path: "quote",
        populate: {
          path: "project",
          populate: { path: "constructionItemsOrder.constructionItem" },
        },
      })
      .populate("user")
      .then((contract) => {
        res.status(200).json(contract);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getByUserId(req, res, next) {
    Contracts.find({ user: req.user.id })
      .populate({
        path: "quote",
        populate: { path: "project", populate: { path: "constructionType" } },
      })
      .populate({
        path: "quote",
        populate: {
          path: "project",
          populate: { path: "constructionItemsOrder.constructionItem" },
        },
      })
      .populate("user")
      .then((contract) => {
        res.status(200).json(contract);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    const contract = new Contracts({
      quote: req.body.quote,
      user: req.user.id,
    });
    Contracts.findOne({
      quote: req.body.quote,
      user: req.user.id,
    })
      .then((existContract) => {
        if (existContract) {
          return res.status(404).json("The contract has already exist");
        } else {
          return contract
            .save()
            .then(() => {
              res.status(200).json(contract);
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  updateById(req, res, next) {
    Contracts.findByIdAndUpdate(
      { _id: req.params.Id },
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(() => {
        res.status(200).json("Updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new ContractController();
