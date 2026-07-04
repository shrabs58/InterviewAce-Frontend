# InterviewAce - Frontend

InterviewAce Frontend is a React-based web application for interview preparation. It provides separate interfaces for Students and Administrators with role-based navigation.

---

## Features

### Authentication

- Register
- Login
- Role-Based Navigation
- Logout

---

### Student Module

- Dashboard
- Profile Management
- Resume Upload
- Interview Practice

---

### Admin Module

- Dashboard
- Manage Users
- Manage Categories
- Manage Questions

---

## Technology Stack

- React
- React Router
- Axios
- React Icons
- CSS

---

## Folder Structure

```
src
├── components
├── config
├── layouts
├── pages
│   ├── admin
│   ├── auth
│   └── student
├── routes
├── services
├── styles
└── assets
```

---

## Pages

### Student

- Login
- Register
- Dashboard
- Profile
- Resume
- Interview Practice

### Admin

- Dashboard
- Users
- Categories
- Questions

---

## Features

### Role-Based Access

Student users are redirected to:

```
/student/dashboard
```

Admin users are redirected to:

```
/admin/dashboard
```

---

### Protected Routes

Unauthorized users cannot access protected pages.

---

### API Communication

The frontend communicates with the Spring Boot backend using Axios.

Examples:

- Login
- Registration
- Profile
- Categories
- Questions
- Resume Upload
- Dashboard
- Analytics

---

## UI

The application includes:

- Responsive Layout
- Modern Dashboard
- Professional Sidebar
- Clean Forms
- Tables
- Card-based Design

---

## How to Run

1. Clone the repository

```
git clone <frontend-repository-url>
```

2. Install dependencies

```
npm install
```

3. Start the application

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Backend

The frontend communicates with the InterviewAce Spring Boot Backend.

Default Backend URL:

```
http://localhost:8080
```

---

## Future Improvements

- JWT Authentication
- Toast Notifications
- Search & Pagination
- Charts
- Resume Preview
- AI Interview Evaluation
- AI Resume Analysis

---

## Author

**Shraddha Polanki**
