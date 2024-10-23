import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/helpers/generateWenToken.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

const signupUser = async (req, res) => {
  try {

    const { fullName, email, username, mobileNumber, password, country } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    console.log(password, fullName);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      mobileNumber,
      country
    });

    await newUser.save();

    // Return success response
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        username: newUser.username,
        mobileNumber: newUser.mobileNumber,
        country: newUser.country
      });
    } else {
      res.status(400).json({ error: 'Failed to create user' });
    }
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password || '');

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If login is successful, generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Send success response with user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      favorites: user.favorites,
      watchlist: user.watchlist,
    });

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt");
    //res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export { signupUser, loginUser, logoutUser };