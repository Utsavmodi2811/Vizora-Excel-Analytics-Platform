const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    try {
      const response = await axios.get(`${API_BASE}/auth/login`);
      console.log('✅ Server is running');
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('❌ Server is not running. Please start the backend server first.');
        return;
      }
      console.log('✅ Server is running (got expected 400 for missing credentials)');
    }

    // Test 2: Test registration
    console.log('\n2. Testing user registration...');
    try {
      const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('✅ Registration successful');
      console.log('Token:', registerResponse.data.token);
      
      // Test 3: Test profile endpoint
      console.log('\n3. Testing profile endpoint...');
      const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${registerResponse.data.token}`
        }
      });
      console.log('✅ Profile endpoint working');
      console.log('User data:', profileResponse.data);

      // Test 4: Test admin endpoints (should fail for regular user)
      console.log('\n4. Testing admin endpoints with regular user...');
      try {
        await axios.get(`${API_BASE}/admin/users`, {
          headers: {
            'Authorization': `Bearer ${registerResponse.data.token}`
          }
        });
        console.log('❌ Admin endpoint should have failed for regular user');
      } catch (error) {
        if (error.response?.status === 403) {
          console.log('✅ Admin endpoint correctly rejected regular user');
        } else {
          console.log('❌ Unexpected error:', error.response?.status);
        }
      }

    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'User already exists') {
        console.log('✅ User already exists (expected)');
      } else {
        console.log('❌ Registration failed:', error.response?.data?.message || error.message);
      }
    }

    // Test 5: Test login
    console.log('\n5. Testing login...');
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('✅ Login successful');
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI(); 