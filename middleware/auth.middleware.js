const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  //console.log('token', token);

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // onsole.log('my', process.env.MYSECRET);
    const decoded = await jwt.verify(token, process.env.MYSECRET);
    // console.log('decoded', decoded);
    req.user = decoded.user;
    // console.log('===>');
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ success: false, message: 'Token is not valid' });
  }
};
