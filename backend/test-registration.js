// Load environment variables
require('dotenv').config();

const axios = require('axios');

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function testRegistration() {
  console.log('🧪 Testing Registration Process');
  console.log('==============================\n');

  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpassword123'
  };

  try {
    // Step 1: Try to register a new user
    console.log('1. Attempting to register new user...');
    console.log(`   Name: ${testUser.name}`);
    console.log(`   Email: ${testUser.email}`);
    console.log(`   Password: ${testUser.password}\n`);

    const registerResponse = await axios.post(`${API_BASE_URL}/api/auth/register`, testUser);
    
    console.log('✅ Registration successful!');
    console.log('   Response:', {
      message: registerResponse.data.message,
      user: {
        id: registerResponse.data.user.id,
        name: registerResponse.data.user.name,
        email: registerResponse.data.user.email,
        role: registerResponse.data.user.role,
        isFirstLogin: registerResponse.data.user.isFirstLogin
      },
      token: registerResponse.data.token ? 'RECEIVED' : 'MISSING'
    });

    // Step 2: Try to login with the same credentials
    console.log('\n2. Testing login with registered credentials...');
    
    const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });

    console.log('✅ Login successful!');
    console.log('   User:', loginResponse.data.user.name);
    console.log('   isFirstLogin:', loginResponse.data.user.isFirstLogin);
    console.log('   Token:', loginResponse.data.token ? 'RECEIVED' : 'MISSING');

    // Step 3: Check if user exists in database
    console.log('\n3. Checking user in database...');
    const checkResponse = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${loginResponse.data.token}` }
    });

    console.log('✅ User profile retrieved successfully!');
    console.log('   Profile:', checkResponse.data.user);

  } catch (error) {
    console.log('❌ Error occurred:');
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Message:', error.response.data.message);
      console.log('   Data:', error.response.data);
    } else {
      console.log('   Error:', error.message);
    }
  }
}

testRegistration(); 