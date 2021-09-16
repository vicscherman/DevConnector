const jwt = require('jsonwebtoken');
const config = require('config');
//has access to request and response, next moves to next callback
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-header')
  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //if there is a token
  try {
    //decode token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //set user token to verified/decoded 
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
