const axios = require('axios');

async function quickTest() {
  console.log('🧪 Quick API Test...\n');
  
  try {
    // Test registration
    const testUser = {
      name: 'Quick Test User 2',
      email: 'quicktest2@example.com',
      password: 'password123'
    };
    
    console.log('📤 Registering user...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ Registration successful!');
    console.log('User ID:', registerResponse.data.user.id);
    
    // Test login
    console.log('\n📤 Logging in...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful!');
    console.log('Token received:', loginResponse.data.token ? 'YES' : 'NO');
    
    console.log('\n🎉 Both registration and login are working!');
    
  } catch (error) {
    console.error('❌ Error:', error.response ? error.response.data : error.message);
  }
}

quickTest(); 