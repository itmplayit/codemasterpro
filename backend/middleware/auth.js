import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export const checkMembership = (requiredLevel) => {
  const levels = { free: 0, pro: 1, premium: 2 };
  return (req, res, next) => {
    const userLevel = levels[req.user.membership || 'free'];
    const required = levels[requiredLevel];
    if (userLevel < required) {
      return res.status(403).json({ 
        message: `${requiredLevel.toUpperCase()} membership required`,
        required: requiredLevel,
        current: req.user.membership
      });
    }
    next();
  };
};
