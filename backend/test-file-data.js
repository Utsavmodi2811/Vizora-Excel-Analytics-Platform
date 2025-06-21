const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testFileData() {
  try {
    console.log('Testing file data loading functionality...\n');

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

    // Test 2: Get user files
    console.log('\n2. Getting user files...');
    try {
      const filesResponse = await axios.get(`${API_BASE}/files`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Files retrieved:', filesResponse.data.files.length, 'files');
      
      if (filesResponse.data.files.length > 0) {
        const firstFile = filesResponse.data.files[0];
        console.log('First file:', firstFile.fileName);
        
        // Test 3: Get file data for the first file
        console.log('\n3. Getting file data...');
        try {
          const fileDataResponse = await axios.get(`${API_BASE}/files/${firstFile._id}/data`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          console.log('✅ File data retrieved successfully');
          console.log('File name:', fileDataResponse.data.file.fileName);
          console.log('Data rows:', fileDataResponse.data.file.data.length);
          console.log('Columns:', fileDataResponse.data.file.columns);
        } catch (error) {
          console.log('❌ File data failed:', error.response?.data?.message || error.message);
        }
      } else {
        console.log('No files to test with');
      }
    } catch (error) {
      console.log('❌ Files failed:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testFileData(); 