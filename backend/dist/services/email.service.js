"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.sendAnalysisCompleteEmail = sendAnalysisCompleteEmail;
exports.sendTestEmail = sendTestEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_config_1 = require("../config/email.config");
// Create transporter based on configuration
const createTransporter = () => {
    if (!(0, email_config_1.isEmailConfigured)()) {
        console.log('Email credentials not configured. Emails will be logged instead.');
        return null;
    }
    const config = (0, email_config_1.getEmailConfig)();
    if (!config)
        return null;
    switch (config.service) {
        case 'gmail':
            return nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: config.user,
                    pass: config.pass,
                },
            });
        case 'smtp':
            return nodemailer_1.default.createTransport({
                host: config.host,
                port: config.port,
                secure: config.secure,
                auth: {
                    user: config.user,
                    pass: config.pass,
                },
            });
        case 'sendgrid':
        case 'resend':
            // These will be handled by their respective SDKs
            return null;
        default:
            console.log(`Unsupported email service: ${config.service}`);
            return null;
    }
};
const transporter = createTransporter();
// Beautiful email templates
const getWelcomeEmailTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Vizora</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Vizora!</h1>
            <p>Your Excel Analytics Journey Begins</p>
        </div>
        <div class="content">
            <h2>Hello ${name}!</h2>
            <p>Welcome to Vizora Excel Analytics! We're excited to have you on board and can't wait to help you transform your data into powerful insights.</p>
            
            <h3>🚀 What you can do with Vizora:</h3>
            <ul>
                <li>Upload and analyze Excel files instantly</li>
                <li>Create stunning 2D and 3D visualizations</li>
                <li>Generate AI-powered insights from your data</li>
                <li>Share and collaborate on analytics projects</li>
            </ul>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">Get Started Now</a>
            </div>
            
            <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team.</p>
        </div>
        <div class="footer">
            <p>© 2024 Vizora Analytics. All rights reserved.</p>
            <p>This email was sent to you because you signed up for Vizora Analytics.</p>
        </div>
    </div>
</body>
</html>
`;
const getPasswordResetTemplate = (resetLink, name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Password Reset Request</h1>
            <p>Secure your Vizora account</p>
        </div>
        <div class="content">
            <h2>Hello ${name}!</h2>
            <p>We received a request to reset your password for your Vizora Analytics account.</p>
            
            <div style="text-align: center;">
                <a href="${resetLink}" class="button">Reset My Password</a>
            </div>
            
            <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                    <li>This link will expire in 1 hour</li>
                    <li>If you didn't request this reset, please ignore this email</li>
                    <li>Never share this link with anyone</li>
                </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetLink}</p>
        </div>
        <div class="footer">
            <p>© 2024 Vizora Analytics. All rights reserved.</p>
            <p>This email was sent to you because you requested a password reset.</p>
        </div>
    </div>
</body>
</html>
`;
const getAnalysisCompleteTemplate = (name, analysisName) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analysis Complete</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00b894 0%, #00a085 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #00b894 0%, #00a085 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Analysis Complete!</h1>
            <p>Your insights are ready</p>
        </div>
        <div class="content">
            <h2>Hello ${name}!</h2>
            <p>Great news! Your analysis is complete and ready for review.</p>
            
            <div class="success">
                <h3>📊 Analysis: ${analysisName}</h3>
                <p>Your data has been processed and analyzed successfully. You can now view your results and insights.</p>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">View Results</a>
            </div>
            
            <p>Your analysis includes:</p>
            <ul>
                <li>📈 Interactive visualizations</li>
                <li>🧠 AI-powered insights</li>
                <li>📋 Detailed reports</li>
                <li>💡 Actionable recommendations</li>
            </ul>
        </div>
        <div class="footer">
            <p>© 2024 Vizora Analytics. All rights reserved.</p>
            <p>This email was sent to you because your analysis is complete.</p>
        </div>
    </div>
</body>
</html>
`;
// Email sending functions
async function sendWelcomeEmail(to, name) {
    const config = (0, email_config_1.getEmailConfig)();
    if (!config) {
        console.log(`[EMAIL LOG] Welcome email would be sent to ${to} for user ${name}`);
        return;
    }
    const mailOptions = {
        from: config.from || 'noreply@vizora.com',
        to,
        subject: '🎉 Welcome to Vizora Analytics!',
        html: getWelcomeEmailTemplate(name)
    };
    try {
        if (transporter) {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Welcome email sent to ${to}`);
        }
        else {
            console.log(`[EMAIL LOG] Welcome email would be sent to ${to} for user ${name}`);
        }
    }
    catch (error) {
        console.error('❌ Failed to send welcome email:', error);
    }
}
async function sendPasswordResetEmail(to, resetLink, name) {
    const config = (0, email_config_1.getEmailConfig)();
    if (!config) {
        console.log(`[EMAIL LOG] Password reset email would be sent to ${to} with link: ${resetLink}`);
        return;
    }
    const mailOptions = {
        from: config.from || 'noreply@vizora.com',
        to,
        subject: '🔐 Reset Your Vizora Password',
        html: getPasswordResetTemplate(resetLink, name)
    };
    try {
        if (transporter) {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Password reset email sent to ${to}`);
        }
        else {
            console.log(`[EMAIL LOG] Password reset email would be sent to ${to} with link: ${resetLink}`);
        }
    }
    catch (error) {
        console.error('❌ Failed to send password reset email:', error);
    }
}
async function sendAnalysisCompleteEmail(to, name, analysisName) {
    const config = (0, email_config_1.getEmailConfig)();
    if (!config) {
        console.log(`[EMAIL LOG] Analysis complete email would be sent to ${to} for analysis: ${analysisName}`);
        return;
    }
    const mailOptions = {
        from: config.from || 'noreply@vizora.com',
        to,
        subject: '✅ Your Analysis is Ready!',
        html: getAnalysisCompleteTemplate(name, analysisName)
    };
    try {
        if (transporter) {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Analysis complete email sent to ${to}`);
        }
        else {
            console.log(`[EMAIL LOG] Analysis complete email would be sent to ${to} for analysis: ${analysisName}`);
        }
    }
    catch (error) {
        console.error('❌ Failed to send analysis completion email:', error);
    }
}
// Test email function
async function sendTestEmail(to) {
    const config = (0, email_config_1.getEmailConfig)();
    if (!config) {
        console.log(`[EMAIL LOG] Test email would be sent to ${to}`);
        return;
    }
    const mailOptions = {
        from: config.from || 'noreply@vizora.com',
        to,
        subject: '🧪 Vizora Email Test',
        html: `
      <h2>Email Test Successful!</h2>
      <p>This is a test email from Vizora Analytics to verify your email configuration is working correctly.</p>
      <p>If you received this email, your email service is properly configured! 🎉</p>
    `
    };
    try {
        if (transporter) {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Test email sent to ${to}`);
            return true;
        }
        else {
            console.log(`[EMAIL LOG] Test email would be sent to ${to}`);
            return false;
        }
    }
    catch (error) {
        console.error('❌ Failed to send test email:', error);
        return false;
    }
}
