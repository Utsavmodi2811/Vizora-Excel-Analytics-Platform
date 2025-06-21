import nodemailer from 'nodemailer';

// Only create transporter if credentials are available
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.log('Email credentials not configured. Emails will be logged instead.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

const transporter = createTransporter();

export async function sendWelcomeEmail(to: string, name: string) {
  if (!transporter) {
    console.log(`[EMAIL LOG] Welcome email would be sent to ${to} for user ${name}`);
    return;
  }

  const mailOptions = {
    from: `Vizora <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Vizora!',
    html: `<h2>Welcome, ${name}!</h2><p>Thank you for joining Vizora Excel Analytics. We are excited to have you on board!</p>`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  if (!transporter) {
    console.log(`[EMAIL LOG] Password reset email would be sent to ${to} with link: ${resetLink}`);
    return;
  }

  const mailOptions = {
    from: `Vizora <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Your Vizora Password',
    html: `<h2>Password Reset Request</h2><p>Click <a href="${resetLink}">here</a> to reset your password. If you did not request this, please ignore this email.</p>`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
}

export async function sendAnalysisCompleteEmail(to: string, name: string, analysisName: string) {
  if (!transporter) {
    console.log(`[EMAIL LOG] Analysis complete email would be sent to ${to} for analysis: ${analysisName}`);
    return;
  }

  const mailOptions = {
    from: `Vizora <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Analysis is Ready!',
    html: `<h2>Hello, ${name}!</h2><p>Your analysis <b>${analysisName}</b> is complete. Log in to Vizora to view your results.</p>`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Analysis complete email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send analysis completion email:', error);
  }
} 