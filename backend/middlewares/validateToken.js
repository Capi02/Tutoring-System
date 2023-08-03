const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
        res.redirect("/login")
    }
  
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.redirect("/login")
      }
      req.user = user;
      next();
    });
  };



module.exports = {
    authenticateToken,
}