# 📧 Email Setup Guide for Vizora Analytics

This guide will help you set up email functionality for your Vizora Analytics application. Choose the option that best fits your needs.

## 🚀 Quick Start (Gmail - Recommended for Development)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to "Security"
3. Enable "2-Step Verification"

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Enter "Vizora Analytics" as the name
4. Click "Generate"
5. Copy the 16-character password

### Step 3: Create Environment File
Create a `.env` file in the `backend` directory with:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/vizora
PORT=5000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 4: Test Email Setup
```bash
cd backend
npm run build
node test-email.js your-email@gmail.com
```

## 🔧 Alternative Email Providers

### Option 2: SendGrid (Production Ready)

#### Setup:
1. Sign up at https://sendgrid.com/
2. Create an API key with "Mail Send" permissions
3. Verify your sender domain or use a single sender

#### Environment Variables:
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=http://localhost:5173
```

### Option 3: Resend (Modern & Simple)

#### Setup:
1. Sign up at https://resend.com/
2. Create an API key
3. Add and verify your domain

#### Environment Variables:
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=http://localhost:5173
```

### Option 4: Custom SMTP Server

#### Environment Variables:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=http://localhost:5173
```

## 📧 Email Features

### Available Email Types:
1. **Welcome Email** - Sent when users register
2. **Password Reset Email** - Sent when users request password reset
3. **Analysis Complete Email** - Sent when analysis is finished
4. **Test Email** - For testing email configuration

### Email Templates:
- Beautiful HTML templates with gradients and modern design
- Responsive design for mobile devices
- Branded with Vizora Analytics styling
- Clear call-to-action buttons

## 🧪 Testing

### Test Email Configuration:
```bash
# Show setup instructions
node test-email.js --help

# Test with your email
node test-email.js your-email@example.com
```

### Test Different Email Types:
The test script will send:
1. Basic test email
2. Welcome email template
3. Password reset email template

## 🔍 Troubleshooting

### Common Issues:

#### Gmail "Less secure app" error:
- Use App Passwords instead of regular password
- Enable 2-factor authentication first

#### "Email credentials not configured":
- Check your `.env` file exists
- Verify all required environment variables are set
- Restart your server after changing environment variables

#### Emails going to spam:
- Use a verified domain for sending
- Set up SPF and DKIM records
- Use a professional email service like SendGrid

#### "Failed to send email":
- Check your internet connection
- Verify email credentials are correct
- Check email service status

### Debug Mode:
The email service logs all attempts. Check your server console for:
- ✅ Success messages
- ❌ Error messages
- 📧 Email logs (when not configured)

## 🚀 Production Deployment

### Recommended for Production:
1. **SendGrid** - Reliable, scalable, good deliverability
2. **Resend** - Modern, simple, great developer experience
3. **AWS SES** - Cost-effective for high volume

### Security Best Practices:
1. Use environment variables (never hardcode credentials)
2. Use dedicated email domains
3. Set up proper SPF/DKIM records
4. Monitor email delivery rates
5. Implement rate limiting

### Environment Variables for Production:
```env
# Production Email (SendGrid example)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-production-api-key
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Security
JWT_SECRET=your-very-long-random-secret-key
NODE_ENV=production
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your email service credentials
3. Test with the provided test script
4. Check server logs for detailed error messages

---

**Happy emailing! 🎉** 