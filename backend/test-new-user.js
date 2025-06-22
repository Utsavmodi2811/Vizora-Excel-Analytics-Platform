const axios = require('axios');

async function testNewUser() {
  console.log('🧪 Testing with New User...\n');
  
  try {
    // Test registration with a completely new user
    const testUser = {
      name: 'New Test User',
      email: 'newtest@example.com',
      password: 'testpassword123'
    };
    
    console.log('📤 Registering new user...');
    console.log('Email:', testUser.email);
    console.log('Password:', testUser.password);
    
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ Registration successful!');
    console.log('User ID:', registerResponse.data.user.id);
    
    // Test login immediately
    console.log('\n📤 Logging in with the same credentials...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful!');
    console.log('Token received:', loginResponse.data.token ? 'YES' : 'NO');
    console.log('User:', loginResponse.data.user.name);
    
    console.log('\n🎉 Both registration and login are working!');
    
  } catch (error) {
    console.error('❌ Error:', error.response ? error.response.data : error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
    }
  }
}

testNewUser(); 