const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const getAuth = req.header('Authorization');
  const token = getAuth.split(" ").pop();
  const secret = process.env.JWT_SECRET;
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    })
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    // add user from payload
    req.user = decoded;
    next();
  } catch(e) {
    res.status(401).json({
      msg: 'Token is not valid',
    })
  }
  
}

module.exports = auth;