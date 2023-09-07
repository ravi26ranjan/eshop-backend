function errorHandler(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
            return res
                  .status(401)
                  .json({ message: "The user is not authhorized" });
      }
      if (err.name === "validationError") {
            return res.status(401).json({ message: err });
      }
      return res.status(500).json({ message: err });
}
module.exports = errorHandler;





// function errorHandler(err, req, res, next) {
//       if (err.name === "UnauthorizedError") {
//             res.send(401, "invalid token...");
//       }
// }
