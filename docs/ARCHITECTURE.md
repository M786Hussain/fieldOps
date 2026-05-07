# FieldOps - Architecture & Design Document

## 1. System Overview
FieldOps is a specialized Field Service Management (FSM) platform designed to streamline job assignments between Admins, Technicians, and Clients.

## 2. Tech Stack Rationale
- **Frontend**: React.js with **Vite** for lightning-fast development and optimized builds. 
- **Styling**: **Tailwind CSS** with a custom **Glassmorphism (Grey-Transparent)** theme to provide a premium, modern enterprise feel.
- **Backend**: Node.js & Express.js for a scalable, non-blocking API architecture.
- **Database**: MongoDB (NoSQL) to handle flexible job schemas and unstructured service notes.
- **Authentication**: JWT (JSON Web Tokens) for secure, stateless session management.

## 3. Database Design
- **Users**: Stores credentials and Roles (Admin, Technician, Client).
- **Jobs**: The core entity linked via ObjectIDs to Users (Client/Tech). Implements a state machine for statuses (Pending -> In-Progress -> Completed).

## 4. Security & Permissions (RBAC)
We implemented **Role-Based Access Control (RBAC)** via custom middleware:
- **Admin**: Full CRUD on jobs and user visibility.
- **Technician**: Can only view assigned jobs and update statuses.
- **Client**: Read-only access to their specific service requests.

## 5. Deliberate Decisions
- **Pragmatic Notifications**: Instead of complex socket.io setup (due to time constraints), we utilized immediate UI state updates and background logging.
- **Soft Deletes**: (Chosen NOT to build for MVP) To maintain strict data integrity for the initial assessment.
