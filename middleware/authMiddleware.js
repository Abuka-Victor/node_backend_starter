import jwt from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error('Invalid auth token');
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error('No auth token');
  }
};
export { verifyAuth };
