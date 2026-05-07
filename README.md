# FieldOps Platform - Mid-Level Technical Assessment

A full-stack Field Service Management platform with a modern, glassmorphic UI.

## 🚀 Quick Start (Local Setup)

### 1. Backend
```bash
cd backend
npm install
npm start
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🧠 Key Decisions & Assumptions
- **Roles**: I assumed that only Admins can create jobs to maintain system control.
- **UI/UX**: Chose a **Dark-Grey Transparent theme** to reduce eye strain for field workers and provide a professional "SaaS" look.
- **Validation**: Implemented server-side role validation to prevent Technicians from accessing Admin panels.

## 🛠 Features Implemented
- [x] Full JWT Authentication & Role Selection.
- [x] Admin Job Assignment Dashboard.
- [x] Technician Status Management (In-Progress/Completed).
- [x] Client Service Tracking View.
- [x] Premium Glassmorphic Design.

## ⏳ Trade-offs & What's Next
- **Pagination**: With more time, I would add pagination to the job list for better performance with thousands of jobs.
- **Real-time**: Integration of WebSockets for instant status updates on the Client's screen.
