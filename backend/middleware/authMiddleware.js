const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};
