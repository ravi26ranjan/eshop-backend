// const { expressJwt } = require("express-jwt");

// // function authJwt() {
// //       const secret = process.env.secret;
// //       return expressJwt({
// //             secret,
// //             algorithms: ["HS256"],
// //       });
// // }
// // module.exports = authJwt;

const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
      const secret = process.env.secret;
      return jwt({
            secret,
            algorithms: ["HS256"],
            // isRevoked: isRevoked,
      }).unless({
            path: [
                  {
                        url: /\/api\/v1\/productServices(.*)/,
                        methods: ["GET", "OPTIONS"],
                  },
                  {
                        url: /\/api\/v1\/categoryServices(.*)/,
                        methods: ["GET", "OPTIONS"],
                  },
                  "/api/v1/userServices/login",
                  "/api/v1/userServices/register",
            ],
      });
}
// async function isRevoked(req, payload, done) {
//       if (!payload.isAdmin) {
//             done(null, true);
//       }
//       done();
// }

module.exports = authJwt;
