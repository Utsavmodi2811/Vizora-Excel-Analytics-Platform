// Load environment variables
require('dotenv').config();

// Import email functions (handle both CommonJS and ESModule)
let emailService = require('./dist/services/email.service.js');
if (emailService.default) emailService = emailService.default;
const sendTestEmail = emailService.sendTestEmail;
const sendWelcomeEmail = emailService.sendWelcomeEmail;
const sendPasswordResetEmail = emailService.sendPasswordResetEmail;

// Test email configuration
async function testEmailSetup() {
  console.log('🧪 Testing Email Configuration...\n');
  
  const testEmail = process.argv[2] || 'test@example.com';
  
  console.log(`📧 Testing with email: ${testEmail}`);
  console.log('📋 Current environment variables:');
  console.log(`   EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'NOT SET'}`);
  console.log(`   EMAIL_USER: ${process.env.EMAIL_USER || 'NOT SET'}`);
  console.log(`   EMAIL_PASS: ${process.env.EMAIL_PASS ? 'SET' : 'NOT SET'}`);
  console.log(`   SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? 'SET' : 'NOT SET'}`);
  console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'SET' : 'NOT SET'}`);
  console.log(`   SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`);
  console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL || 'NOT SET'}\n`);
  
  try {
    // Test basic email
    console.log('📤 Sending test email...');
    const testResult = await sendTestEmail(testEmail);
    
    if (testResult) {
      console.log('✅ Test email sent successfully!');
    } else {
      console.log('⚠️  Test email logged (no email service configured)');
    }
    
    // Test welcome email
    console.log('\n📤 Sending welcome email...');
    await sendWelcomeEmail(testEmail, 'Test User');
    
    // Test password reset email
    console.log('\n📤 Sending password reset email...');
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=test-token`;
    await sendPasswordResetEmail(testEmail, resetLink, 'Test User');
    
    console.log('\n🎉 Email testing completed!');
    
  } catch (error) {
    console.error('❌ Error during email testing:', error);
  }
}

// Setup instructions
function showSetupInstructions() {
  console.log('\n📧 EMAIL SETUP INSTRUCTIONS\n');
  console.log('Choose one of the following options:\n');
  
  console.log('🔹 OPTION 1: Gmail (Recommended for Development)');
  console.log('   1. Enable 2-factor authentication on your Gmail account');
  console.log('   2. Generate an App Password: https://myaccount.google.com/apppasswords');
  console.log('   3. Set environment variables:');
  console.log('      EMAIL_SERVICE=gmail');
  console.log('      EMAIL_USER=your-email@gmail.com');
  console.log('      EMAIL_PASS=your-app-password');
  console.log('      FRONTEND_URL=http://localhost:5173\n');
  
  console.log('🔹 OPTION 2: SendGrid (Recommended for Production)');
  console.log('   1. Sign up at https://sendgrid.com/');
  console.log('   2. Create an API key');
  console.log('   3. Set environment variables:');
  console.log('      EMAIL_SERVICE=sendgrid');
  console.log('      SENDGRID_API_KEY=your-api-key');
  console.log('      EMAIL_FROM=noreply@yourdomain.com');
  console.log('      FRONTEND_URL=http://localhost:5173\n');
  
  console.log('🔹 OPTION 3: Resend (Modern Email Service)');
  console.log('   1. Sign up at https://resend.com/');
  console.log('   2. Create an API key');
  console.log('   3. Set environment variables:');
  console.log('      EMAIL_SERVICE=resend');
  console.log('      RESEND_API_KEY=your-api-key');
  console.log('      EMAIL_FROM=noreply@yourdomain.com');
  console.log('      FRONTEND_URL=http://localhost:5173\n');
  
  console.log('🔹 OPTION 4: Custom SMTP Server');
  console.log('   1. Get SMTP credentials from your email provider');
  console.log('   2. Set environment variables:');
  console.log('      EMAIL_SERVICE=smtp');
  console.log('      SMTP_HOST=smtp.yourdomain.com');
  console.log('      SMTP_PORT=587');
  console.log('      SMTP_USER=your-smtp-username');
  console.log('      SMTP_PASS=your-smtp-password');
  console.log('      EMAIL_FROM=noreply@yourdomain.com');
  console.log('      FRONTEND_URL=http://localhost:5173\n');
  
  console.log('💡 TIP: Create a .env file in the backend directory with these variables.');
  console.log('💡 TIP: For development, Gmail with App Password is the easiest option.');
}

// Check if help is requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showSetupInstructions();
  process.exit(0);
}

// Run the test
testEmailSetup(); 