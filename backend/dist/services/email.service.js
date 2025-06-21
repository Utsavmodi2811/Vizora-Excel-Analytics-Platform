"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.sendAnalysisCompleteEmail = sendAnalysisCompleteEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password
    },
});
async function sendWelcomeEmail(to, name) {
    const mailOptions = {
        from: `Vizora <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Welcome to Vizora!',
        html: `<h2>Welcome, ${name}!</h2><p>Thank you for joining Vizora Excel Analytics. We are excited to have you on board!</p>`
    };
    return transporter.sendMail(mailOptions);
}
async function sendPasswordResetEmail(to, resetLink) {
    const mailOptions = {
        from: `Vizora <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Reset Your Vizora Password',
        html: `<h2>Password Reset Request</h2><p>Click <a href="${resetLink}">here</a> to reset your password. If you did not request this, please ignore this email.</p>`
    };
    return transporter.sendMail(mailOptions);
}
async function sendAnalysisCompleteEmail(to, name, analysisName) {
    const mailOptions = {
        from: `Vizora <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Your Analysis is Ready!',
        html: `<h2>Hello, ${name}!</h2><p>Your analysis <b>${analysisName}</b> is complete. Log in to Vizora to view your results.</p>`
    };
    return transporter.sendMail(mailOptions);
}
