const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testPasswordChangeEmail() {
  try {
    console.log('🧪 Testing Password Change Email Functionality...\n');

    // Step 1: Register a test user
    console.log('1. Registering test user...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Test User',
      email: 'test-password-email2@example.com',
      password: 'oldpassword123'
    });
    
    const { token } = registerResponse.data;
    console.log('✅ User registered successfully\n');

    // Step 2: Change password (this should trigger email)
    console.log('2. Changing password (should trigger email notification)...');
    const changeResponse = await axios.post(`${API_BASE}/auth/change-password`, {
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Password changed successfully:', changeResponse.data.message);
    console.log('📧 Password change email should have been sent to test-password-email@example.com');
    console.log('');

    // Step 3: Verify we can login with new password
    console.log('3. Verifying login with new password...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test-password-email@example.com',
      password: 'newpassword123'
    });
    console.log('✅ Successfully logged in with new password');
    console.log('');

    console.log('🎉 Password change email test completed!');
    console.log('');
    console.log('📋 What to check:');
    console.log('   - Check your email inbox for test-password-email@example.com');
    console.log('   - Look for email with subject: "🔐 Your Vizora Password Has Been Changed"');
    console.log('   - Email should include timestamp and security warnings');
    console.log('   - If email not configured, check console logs for email simulation');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testPasswordChangeEmail(); 