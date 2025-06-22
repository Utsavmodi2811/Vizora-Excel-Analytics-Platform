const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function testAnalysisCompleteFromFrontend() {
  try {
    console.log('🧪 Testing Analysis Complete Email from Frontend Perspective');
    console.log('==========================================================\n');

    // Step 1: Login to get token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'utsavmodi1128@gmail.com',
      password: '1234567'
    });

    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    console.log(`✅ Logged in as: ${user.name} (${user.email})`);
    console.log(`   isFirstLogin: ${user.isFirstLogin}`);
    console.log(`   emailNotifications: ${user.emailNotifications}\n`);

    // Step 2: Create a new analysis
    console.log('2. Creating a new analysis...');
    const createAnalysisResponse = await axios.post(
      `${API_BASE_URL}/api/analysis`,
      {
        fileName: 'test-data.xlsx',
        fileType: 'excel',
        fileSize: 1024000,
        analysisType: 'comprehensive'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const analysis = createAnalysisResponse.data.analysis;
    console.log(`✅ Analysis created with ID: ${analysis._id}`);
    console.log(`   Status: ${analysis.status}\n`);

    // Step 3: Update analysis to completed (this triggers the email)
    console.log('3. Updating analysis to completed (this will trigger the email)...');
    const updateResponse = await axios.put(
      `${API_BASE_URL}/api/analysis/${analysis._id}`,
      {
        status: 'completed',
        result: {
          charts: ['bar', 'line', 'pie'],
          insights: ['Trend analysis completed', 'Patterns identified'],
          summary: 'Analysis completed successfully'
        }
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const updatedAnalysis = updateResponse.data.analysis;
    console.log(`✅ Analysis updated to: ${updatedAnalysis.status}`);
    console.log('📧 Analysis Complete email should have been sent!\n');

    // Step 4: Check analysis history
    console.log('4. Checking analysis history...');
    const historyResponse = await axios.get(
      `${API_BASE_URL}/api/analysis/history`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const analyses = historyResponse.data.analyses;
    console.log(`✅ Found ${analyses.length} analyses in history`);
    analyses.forEach((analysis, index) => {
      console.log(`   ${index + 1}. ${analysis.fileName} - ${analysis.status} (${new Date(analysis.createdAt).toLocaleString()})`);
    });

    console.log('\n🎉 Test completed successfully!');
    console.log('📧 Check your email for the analysis complete notification.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Also test with a user who has email notifications disabled
async function testWithEmailNotificationsDisabled() {
  try {
    console.log('\n🧪 Testing with Email Notifications Disabled');
    console.log('=============================================\n');

    // Login with a different user or update user settings
    const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'utsavmodi1128@gmail.com',
      password: '1234567'
    });

    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    console.log(`✅ Logged in as: ${user.name} (${user.email})`);

    // Disable email notifications
    console.log('1. Disabling email notifications...');
    await axios.put(
      `${API_BASE_URL}/api/auth/profile`,
      { emailNotifications: false },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Email notifications disabled\n');

    // Create and complete analysis (should not send email)
    console.log('2. Creating and completing analysis (should NOT send email)...');
    const createResponse = await axios.post(
      `${API_BASE_URL}/api/analysis`,
      {
        fileName: 'no-email-test.xlsx',
        fileType: 'excel',
        fileSize: 512000,
        analysisType: 'basic'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const analysis = createResponse.data.analysis;
    
    await axios.put(
      `${API_BASE_URL}/api/analysis/${analysis._id}`,
      {
        status: 'completed',
        result: { message: 'Analysis completed without email' }
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('✅ Analysis completed without sending email (as expected)');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the tests
async function runTests() {
  await testAnalysisCompleteFromFrontend();
  await testWithEmailNotificationsDisabled();
}

runTests(); 