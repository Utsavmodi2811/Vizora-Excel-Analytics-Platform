const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testPasswordChange() {
  try {
    console.log('🧪 Testing Password Change Functionality...\n');

    // Step 1: Register a test user
    console.log('1. Registering test user...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Test User',
      email: 'test-password@example.com',
      password: 'oldpassword123'
    });
    
    const { token } = registerResponse.data;
    console.log('✅ User registered successfully\n');

    // Step 2: Try to change password with wrong current password
    console.log('2. Testing with wrong current password...');
    try {
      await axios.post(`${API_BASE}/auth/change-password`, {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('❌ Should have failed with wrong password');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected wrong current password');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }
    console.log('');

    // Step 3: Change password with correct current password
    console.log('3. Changing password with correct current password...');
    const changeResponse = await axios.post(`${API_BASE}/auth/change-password`, {
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Password changed successfully:', changeResponse.data.message);
    console.log('');

    // Step 4: Try to login with old password (should fail)
    console.log('4. Testing login with old password (should fail)...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        email: 'test-password@example.com',
        password: 'oldpassword123'
      });
      console.log('❌ Should have failed with old password');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly rejected old password');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }
    console.log('');

    // Step 5: Login with new password (should succeed)
    console.log('5. Testing login with new password...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test-password@example.com',
      password: 'newpassword123'
    });
    console.log('✅ Successfully logged in with new password');
    console.log('');

    // Step 6: Test validation - short password
    console.log('6. Testing validation - short password...');
    try {
      await axios.post(`${API_BASE}/auth/change-password`, {
        currentPassword: 'newpassword123',
        newPassword: '123'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('❌ Should have failed with short password');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected short password');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }
    console.log('');

    // Step 7: Test validation - missing fields
    console.log('7. Testing validation - missing fields...');
    try {
      await axios.post(`${API_BASE}/auth/change-password`, {
        currentPassword: 'newpassword123'
        // missing newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('❌ Should have failed with missing newPassword');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected missing newPassword');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }
    console.log('');

    console.log('🎉 All password change tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testPasswordChange(); 