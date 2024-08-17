const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('./models/user.js'); // Use require for Admin model
const connectDB = require('./config/db.js'); // Establish database connection

async function AdminAccount() {
  try {
    // Establish a connection to the database
    await connectDB(); // Ensure that you connect to your database first

    const adminCount = await Admin.countDocuments(); // Wait for the count of Admin documents
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash('123', 10); // Hash the password
      const newAdmin = new Admin({
        username: 'admin',
        password: hashPassword,
        email: 'admin@gmail.com',
        firstName: 'yitzhak',
        lastName: 'keidar',
        role: 'admin' // Assign the role to the new admin
        ,
      });

      await newAdmin.save(); // Wait for saving the new Admin document
      console.log('Admin account created successfully!'); // Success message
    } else {
      console.log('Admin account already exists.'); // Message indicating the account already exists
    }
  } catch (err) {
    console.error('Error creating admin account:', err); // Log any errors that occur
  }
}

// Call the function to check or create the admin account
AdminAccount();
