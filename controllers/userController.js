import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user/set Token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('User must pass an email');
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error('Invalid User Details');
  }
});

// @desc    Logout a user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(204).json({ message: 'User successfully logged out' });
});

// @desc    Get a user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select(
    '-password -createdAt -updatedAt'
  );
  if (user) res.status(200).json(user);
  else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const user = await User.findById(req.userId).select(
    '-password -createdAt -updatedAt'
  );
  if (user) {
    user.email = email || user.email;
    user.name = name || user.name;
    const newUser = await user.save();
    res.status(200).json(newUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  await User.deleteOne({ _id: req.userId });
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Successfully deleted user profile' });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
