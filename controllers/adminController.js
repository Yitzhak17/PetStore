/*const express = require('express');
const bcrypt = require('bcrypt');
const AdminModel = require('../models/AdminModel.js'); // Ensure the path is correct
const UserModel = require('../models/user.js'); // Ensure the path is correct
const jwt = require('jsonwebtoken');

const getAdmin = async (req, res) => {
  try {
    const admins = await AdminModel.find(); // Get all Admin documents from the database
    console.log("List of admins:", admins); // Print the list of admins to the console
    return res.status(200).json(admins); // Return the list of admins
  } catch (error) {
    console.error("Error fetching admins:", error); // Log any errors
    return res.status(500).json({ message: "Server error." }); // 500 if there is a server error
  }
};


const loginUser = async (req, res) => {
  console.log('Login attempt with body:', req.body); // Log request body

  try {
    const { username, password, role } = req.body; // Destructure username, password, and role
    let User;

    // Determine whether to search for an Admin or a Student
    if (role === 'admin') {
      User = await AdminModel.findOne({ username }); // Find admin by username
      if (!User) {
        console.log("Admin not found."); // Log when admin is not found
        return res.status(404).json({ message: "Admin not registered." }); // 404 if admin does not exist
      }

      const validPassword = await bcrypt.compare(password, User.password); // Compare input password with stored hashed password
      if (!validPassword) {
        console.log("Invalid password."); // Log invalid password attempt
        return res.status(401).json({ message: "Invalid password." }); // 401 if password is incorrect
      }
      // Generate JWT token with User ID, username, and role
      const token = jwt.sign({ id: User._id, username: User.username, role: User.role }, process.env.Admin_Key, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true, secure: true }); // Set token in a cookie

      console.log("Login successful for", role + ":", User.username); // Log successful login
      return res.status(200).json({ login: true, role: User.role }); // Return success response with role information

    } else if (role === 'user') {
      User = await UserModel.findOne({ username }); // Find user by username
      if (!User) {
        console.log("Student not found."); // Log when user is not found
        return res.status(404).json({ message: "User not registered." }); // 404 if user does not exist
      }

      const validPassword = await bcrypt.compare(password, User.password); // Compare input password with stored hashed password
      if (!validPassword) {
        console.log("Invalid password."); // Log invalid password attempt
        return res.status(401).json({ message: "Invalid password." }); // 401 if password is incorrect
      }
      // Generate JWT token with User ID, username, and role
      const token = jwt.sign({ id: User._id, username: User.username, role: User.role }, process.env.User_Key, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true, secure: true }); // Set token in a cookie

      console.log("Login successful for", role + ":", User.username); // Log successful login
      return res.status(200).json({ login: true, role: User.role }); // Return success response with role information

    } else {
      return res.status(400).json({ message: "Invalid role." }); // Handle invalid role
    }


  } catch (error) {
    console.error("Error during login:", error); // Log any errors
    return res.status(500).json({ message: "Server error." }); // 500 if there is a server error
  }
};


const verifyUser = (req, res) => {
  // Get the token from the request cookies or headers
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ login: false, message: 'No token provided.' });
  }

  // Try to verify with Admin_Key first
  jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
    if (err) {
      // If it fails, check with Student_Key
      jwt.verify(token, process.env.User_Key, (err, decoded) => {
        if (err) {
          return res.status(401).json({ login: false, message: 'Invalid token.' });
        } else {
          // The token is valid (as student)
          return res.json({ login: true, role: decoded.role }); // Return role
        }
      });
    } else {
      // The token is valid (as admin)
      return res.json({ login: true, role: decoded.role }); // Return role
    }
  });
};

const logoutUser = (req, res) => {
  res.clearCookie('token')
  return res.json({ logout: true })
};


module.exports = {
  loginUser,
  getAdmin,
  verifyUser,
  logoutUser
};

*/


/*
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token; // Use cookies for token

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." }); // 403 if no token
  }

  jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." }); // 401 if the token is invalid
    }

    req.username = decoded.username; // Attach username to request
    req.role = decoded.role; // Attach role to request
    next(); // Proceed to the next middleware or route handler
  });
};


*/
