const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testChartCreation() {
  try {
    console.log('Testing chart creation functionality...\n');

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

    // Test 2: Create a chart
    console.log('\n2. Creating a chart...');
    try {
      const chartData = {
        fileName: 'test-data.xlsx',
        chartType: 'bar',
        xAxis: 'Category',
        yAxis: 'Value',
        data: [
          { name: 'A', value: 10 },
          { name: 'B', value: 20 },
          { name: 'C', value: 15 }
        ]
      };

      const chartResponse = await axios.post(`${API_BASE}/charts/create`, chartData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Chart created successfully');
      console.log('Chart ID:', chartResponse.data.analysis.id);
    } catch (error) {
      console.log('❌ Chart creation failed:', error.response?.data?.message || error.message);
    }

    // Test 3: Get chart history
    console.log('\n3. Getting chart history...');
    try {
      const historyResponse = await axios.get(`${API_BASE}/charts/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Chart history retrieved:', historyResponse.data.analyses.length, 'charts');
    } catch (error) {
      console.log('❌ Chart history failed:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testChartCreation(); 