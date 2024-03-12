const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Token not found");
  }

  jwt.verify(token, "rommel", (err, user) => {
    if (err) {
      res.status(403).json("Token is not valid!");
    }
    req.user = user;
    next();
  });
};

const verifyManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Manager") {
      next();
    } else {
      return res.status(403).json("You are not authorized");
    }
  });
};

// const verifyUser = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.query.userId) {
//       return next();
//     }else {
//       return res.status(403).json("You are not authorized");
//     }
//   });
// };
module.exports = {
  verifyToken: verifyToken,
  verifyManager: verifyManager,
  // verifyUser: verifyUser
};
