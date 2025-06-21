const jwt = require('jsonwebtoken');

// Function to decode JWT token
function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('✅ Token is valid');
    console.log('Decoded token:', JSON.stringify(decoded, null, 2));
    return decoded;
  } catch (error) {
    console.log('❌ Token is invalid:', error.message);
    return null;
  }
}

// Get token from command line argument
const token = process.argv[2];

if (!token) {
  console.log('Usage: node debug-token.js <your-jwt-token>');
  console.log('\nTo get your token:');
  console.log('1. Open browser DevTools (F12)');
  console.log('2. Go to Application/Storage tab');
  console.log('3. Look for localStorage');
  console.log('4. Find the "token" key');
  console.log('5. Copy the value and run: node debug-token.js <token>');
} else {
  console.log('🔍 Analyzing JWT token...\n');
  decodeToken(token);
} 