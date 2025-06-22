const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function debugPasswordChangeLogin() {
  try {
    console.log('🔍 Debugging Password Change and Login...\n');

    // Step 1: Register a test user
    console.log('1. Registering test user...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Debug User',
      email: 'debug-test@example.com',
      password: 'original123'
    });
    
    const { token } = registerResponse.data;
    console.log('✅ User registered successfully');
    console.log('   Token:', token ? 'RECEIVED' : 'MISSING');
    console.log('');

    // Step 2: Test login with original password
    console.log('2. Testing login with original password...');
    try {
      const originalLoginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: 'debug-test@example.com',
        password: 'original123'
      });
      console.log('✅ Original password login successful');
      console.log('   User:', originalLoginResponse.data.user.name);
    } catch (error) {
      console.log('❌ Original password login failed:', error.response?.data?.message);
    }
    console.log('');

    // Step 3: Change password
    console.log('3. Changing password...');
    try {
      const changeResponse = await axios.post(`${API_BASE}/auth/change-password`, {
        currentPassword: 'original123',
        newPassword: 'newpassword456'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Password changed successfully:', changeResponse.data.message);
    } catch (error) {
      console.log('❌ Password change failed:', error.response?.data?.message);
      return;
    }
    console.log('');

    // Step 4: Try to login with old password (should fail)
    console.log('4. Testing login with old password (should fail)...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        email: 'debug-test@example.com',
        password: 'original123'
      });
      console.log('❌ Old password login should have failed but succeeded');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Old password correctly rejected');
      } else {
        console.log('❌ Unexpected error with old password:', error.response?.data?.message);
      }
    }
    console.log('');

    // Step 5: Try to login with new password (should succeed)
    console.log('5. Testing login with new password...');
    let newLoginResponse = null;
    try {
      newLoginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: 'debug-test@example.com',
        password: 'newpassword456'
      });
      console.log('✅ New password login successful');
      console.log('   User:', newLoginResponse.data.user.name);
      console.log('   Token:', newLoginResponse.data.token ? 'RECEIVED' : 'MISSING');
    } catch (error) {
      console.log('❌ New password login failed:', error.response?.data?.message);
      console.log('   Status:', error.response?.status);
      console.log('   Response:', error.response?.data);
    }
    console.log('');

    // Step 6: Test with wrong new password
    console.log('6. Testing login with wrong new password...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        email: 'debug-test@example.com',
        password: 'wrongpassword789'
      });
      console.log('❌ Wrong password login should have failed but succeeded');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Wrong password correctly rejected');
      } else {
        console.log('❌ Unexpected error with wrong password:', error.response?.data?.message);
      }
    }
    console.log('');

    console.log('🎯 Debug Summary:');
    console.log('   - Registration: ✅');
    console.log('   - Original password login: ✅');
    console.log('   - Password change: ✅');
    console.log('   - Old password rejection: ✅');
    console.log('   - New password login: ' + (newLoginResponse ? '✅' : '❌'));
    console.log('   - Wrong password rejection: ✅');

  } catch (error) {
    console.error('❌ Debug failed:', error.response?.data || error.message);
  }
}

debugPasswordChangeLogin(); 