const axios = require('axios');

async function testExistingUser() {
  console.log('🧪 Testing Login with Existing User...\n');
  
  try {
    // Test login with an existing user
    const loginData = {
      email: 'utsavmodi1128@gmail.com',
      password: 'password123' // Use the password you registered with
    };
    
    console.log('📤 Logging in with existing user...');
    console.log('Email:', loginData.email);
    
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData);
    console.log('✅ Login successful!');
    console.log('Token received:', loginResponse.data.token ? 'YES' : 'NO');
    console.log('User:', loginResponse.data.user.name);
    
  } catch (error) {
    console.error('❌ Error:', error.response ? error.response.data : error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
    }
  }
}

testExistingUser(); 