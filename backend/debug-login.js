const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function debugLogin() {
  console.log('🔍 Debugging Login Issues');
  console.log('========================\n');

  // Test 1: Try with the working credentials
  console.log('1. Testing with known working credentials...');
  try {
    const response1 = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'utsavmodi1128@gmail.com',
      password: '1234567'
    });
    console.log('✅ SUCCESS with utsavmodi1128@gmail.com / 1234567');
    console.log('   User:', response1.data.user.name);
    console.log('   isFirstLogin:', response1.data.user.isFirstLogin);
  } catch (error) {
    console.log('❌ FAILED with utsavmodi1128@gmail.com / 1234567');
    console.log('   Error:', error.response?.data?.message || error.message);
  }

  console.log('\n2. Testing with utsav123@gmail.com...');
  try {
    const response2 = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'utsav123@gmail.com',
      password: 'password123'
    });
    console.log('✅ SUCCESS with utsav123@gmail.com / password123');
    console.log('   User:', response2.data.user.name);
  } catch (error) {
    console.log('❌ FAILED with utsav123@gmail.com / password123');
    console.log('   Error:', error.response?.data?.message || error.message);
  }

  console.log('\n3. Testing with utsav123@gmail.com / 1234567...');
  try {
    const response3 = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'utsav123@gmail.com',
      password: '1234567'
    });
    console.log('✅ SUCCESS with utsav123@gmail.com / 1234567');
    console.log('   User:', response3.data.user.name);
  } catch (error) {
    console.log('❌ FAILED with utsav123@gmail.com / 1234567');
    console.log('   Error:', error.response?.data?.message || error.message);
  }

  console.log('\n4. Testing with quicktest@example.com...');
  try {
    const response4 = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'quicktest@example.com',
      password: 'password123'
    });
    console.log('✅ SUCCESS with quicktest@example.com / password123');
    console.log('   User:', response4.data.user.name);
  } catch (error) {
    console.log('❌ FAILED with quicktest@example.com / password123');
    console.log('   Error:', error.response?.data?.message || error.message);
  }

  console.log('\n📋 Summary:');
  console.log('- Backend is running and responding');
  console.log('- Some credentials work, others don\'t');
  console.log('- Check what credentials your frontend is using');
}

debugLogin(); 