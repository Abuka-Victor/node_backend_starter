import jwt from 'jsonwebtoken';

export default function generateToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
  res.cookie('jwt', token, {
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
}
