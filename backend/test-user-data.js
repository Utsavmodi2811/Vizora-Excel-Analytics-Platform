const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testUserData() {
  try {
    console.log('Testing user-specific data functionality...\n');

    // Test 1: Login as test user
    console.log('1. Logging in as test user...');
    let token;
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      token = loginResponse.data.token;
      console.log('✅ Login successful');
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message || error.message);
      return;
    }

    // Test 2: Get user profile
    console.log('\n2. Getting user profile...');
    try {
      const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Profile retrieved:', profileResponse.data.user.email);
    } catch (error) {
      console.log('❌ Profile failed:', error.response?.data?.message || error.message);
    }

    // Test 3: Get user files (should be empty initially)
    console.log('\n3. Getting user files...');
    try {
      const filesResponse = await axios.get(`${API_BASE}/files`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Files retrieved:', filesResponse.data.files.length, 'files');
    } catch (error) {
      console.log('❌ Files failed:', error.response?.data?.message || error.message);
    }

    // Test 4: Get user chart history (should be empty initially)
    console.log('\n4. Getting user chart history...');
    try {
      const chartsResponse = await axios.get(`${API_BASE}/charts/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Chart history retrieved:', chartsResponse.data.analyses.length, 'charts');
    } catch (error) {
      console.log('❌ Chart history failed:', error.response?.data?.message || error.message);
    }

    // Test 5: Test admin endpoints (should fail for regular user)
    console.log('\n5. Testing admin access (should fail)...');
    try {
      await axios.get(`${API_BASE}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('❌ Admin access should have failed');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ Admin access correctly denied');
      } else {
        console.log('❌ Unexpected error:', error.response?.status);
      }
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testUserData(); 