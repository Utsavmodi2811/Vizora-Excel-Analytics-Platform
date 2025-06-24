# Vizora Analytics – Project Report

## 1. Project Overview
Vizora Analytics is a modern web application for analyzing Excel data, generating visualizations, and providing AI-powered insights. It supports user registration, authentication, secure password management, email notifications, and a rich dashboard for data analysis.

---

## 2. Architecture
- **Frontend:** React (TypeScript, Vite, Tailwind CSS)
- **Backend:** Node.js (Express, TypeScript, MongoDB/Mongoose)
- **Email:** Nodemailer (Gmail, SMTP, SendGrid, Resend supported)
- **Authentication:** JWT-based, secure password hashing (bcrypt)
- **Notifications:** Email and dashboard notifications

---

## 3. Key Features

### User Management
- Registration, login, JWT authentication
- Profile update, email notification preferences
- Password change (with email notification)
- Password reset via email
- First login flag for dashboard notifications

### Email Notifications
- Welcome email on registration
- Password reset email
- Password change security email
- Analysis complete email

### Analysis & Charting
- Upload Excel files for analysis
- Backend processes data, generates insights
- 2D/3D chart creation
- Analysis history and results

### Security
- Passwords hashed with bcrypt
- JWT authentication for protected routes
- Email notifications for sensitive actions
- Session heartbeat

---

## 4. User Flows

1. **Register:** User signs up → receives welcome email
2. **Login:** User logs in → JWT issued, dashboard shown
3. **Upload Data:** User uploads Excel file → analysis runs, results shown
4. **View Results:** User sees charts, insights, and can download reports
5. **Change Password:** User changes password → receives security email
6. **Settings:** User updates profile, toggles email notifications, changes theme

---

## 5. Backend Structure
- `src/controllers/auth.controller.ts` – Auth, registration, password, profile logic
- `src/models/user.model.ts` – User schema, password hashing
- `src/services/email.service.ts` – Email logic and templates
- `src/routes/auth.routes.ts` – Auth API endpoints
- `src/controllers/analysis.controller.ts` – File upload, analysis, charting
- `src/routes/analysis.routes.ts` – Analysis API endpoints

---

## 6. Frontend Structure
- `src/pages/Login.tsx`, `Register.tsx`, `ForgotPassword.tsx`, `ResetPassword.tsx` – Auth pages
- `src/pages/Dashboard.tsx`, `AnalysisHistory.tsx`, `ChartViewer.tsx` – Main app pages
- `src/components/Settings.tsx` – User settings and security
- `src/components/AnimatedBackground.tsx`, `AuthBackground.tsx` – Animated backgrounds
- `src/context/AuthContext.tsx` – Auth state, user info, API integration
- `src/lib/api.ts` – API calls to backend

---

## 7. Security Features
- All passwords are hashed (never stored in plain text)
- JWT tokens for all protected API calls
- Password change/reset actions trigger email notifications
- User sessions kept alive with heartbeat
- Sensitive actions require current password

---

## 8. Extensibility
- **Email Providers:** Easily switch between Gmail, SMTP, SendGrid, or Resend
- **Chart Types:** Add new chart types by extending utilities and components
- **AI Insights:** Integrate with external AI APIs
- **Admin Features:** Add user management, analytics for admins
- **Notification System:** Expand to in-app or SMS notifications

---

## 9. How to Run & Test

### Backend
1. `cd backend`
2. `npm install`
3. Configure `.env` for database and email
4. `npm run dev`

### Frontend
1. `cd chartflow-excel-analytics`
2. `npm install`
3. `npm run dev`

### Testing
- Use test scripts in `backend/` (e.g., `test-password-change.js`)
- Trigger emails via frontend actions
- Check backend logs for debugging

---

## 10. How to Extend
- Add new analysis types (backend + frontend)
- Add admin dashboard and features
- Integrate more notification channels
- Enhance security (2FA, email verification)

---

## 11. Contact & Support
For questions or support, contact the Vizora Analytics team. 