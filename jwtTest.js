const jwt = require('jsonwebtoken');
require('dotenv').config();

// Your JWT secret key

const secretKey = process.env.JWT_SECRET_KEY;

// Create a payload
const payload = {
  id: '12345',
  username: 'testuser'
};

// Generate a token
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log('Generated Token:', token);

// Verify the token
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err.message);
  } else {
    console.log('Token is valid. Decoded payload:', decoded);
  }
});
