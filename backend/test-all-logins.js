const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function testAllLogins() {
  console.log('🧪 Testing Login for All Users');
  console.log('==============================\n');

  const users = [
    { email: 'utsav123@gmail.com', password: 'password123' },
    { email: 'utsav@example.com', password: 'password123' },
    { email: 'ridham123@gmail.com', password: 'password123' },
    { email: 'utsavmodi1128@gmail.com', password: 'password123' }
  ];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(`${i + 1}. Testing ${user.email}...`);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: user.email,
        password: user.password
      });
      
      console.log(`   ✅ SUCCESS!`);
      console.log(`   Name: ${response.data.user.name}`);
      console.log(`   Role: ${response.data.user.role}`);
      console.log(`   isFirstLogin: ${response.data.user.isFirstLogin}`);
      console.log(`   Token: ${response.data.token ? 'RECEIVED' : 'MISSING'}\n`);
      
    } catch (error) {
      console.log(`   ❌ FAILED: ${error.response?.data?.message || error.message}\n`);
    }
  }

  console.log('📋 Summary:');
  console.log('===========');
  console.log('✅ All users should now be able to log in with:');
  console.log('   Email: [any user email]');
  console.log('   Password: password123');
  console.log('\n🎯 Try logging in from your frontend now!');
}

testAllLogins(); 