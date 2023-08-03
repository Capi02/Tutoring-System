const  jwt  = require("jsonwebtoken");

function createAccessToken(payload){
   return new Promise((resolve, reject) => {
    jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
            expiresIn: "2h",
        },
        (err, token) => {
            if (err) reject(err)
            resolve(token)
        }
    );
   })
}
module.exports.createAccessToken = createAccessToken;
