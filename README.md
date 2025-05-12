# Complaint Management System

This is a full-stack application that helps users submit complaints, while allowing admins to manage and resolve them efficiently. It includes user authentication via Google login, role-based access for different types of admins, and a system for managing complaints categorized by type (e.g., hostel, mess, sports, etc.).

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup](#setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Google Login Integration](#google-login-integration)
7. [Usage](#usage)
8. [Screenshots](#screenshots)
9. [License](#license)

---

## Features

- **Google Authentication**: Users can log in via Google for seamless access.
- **Role-Based Access**: Different types of admins (e.g., hostel, mess, IT) can manage complaints specific to their category.
- **Complaint Categories**: Users can submit complaints in various categories (hostel, mess, sports, medical, etc.).
- **Admin Dashboard**: Admins can view, filter, and update complaint statuses.
- **Search Functionality**: Ability to search complaints by text and filter them based on categories.

---
## Screenshots

<!-- Add Screenshots Below -->

1. **Login Page**  
   ![Login Page](https://github.com/chuadharysagar/complaint_management_system/blob/main/cLogin.png)

2. **Admin Dashboard**  
   ![Admin Dashboard](https://github.com/chuadharysagar/complaint_management_system/blob/main/cAdmin.png)

3. **Complaint Submission**  
   ![Complaint Submission](https://github.com/chuadharysagar/complaint_management_system/blob/main/cusers.png)

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React-Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Google OAuth 2.0
- **State Management**: React Context, useState, useEffect
- **Deployment**: (Include here if deployed on any platform)

---

## Setup

### 1. **Clone the repository**:

```bash
git clone https://github.com/chuadharysagar/complaint_management_system
```
### 2. **Install dependencies**:
Backend Setup:
Navigate to the backend folder:
```
cd backend
```
Install the required dependencies:
```
npm install
```
Set up environment variables:

Create a .env file and add your database URI, Google client credentials, and JWT secret.
```
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```
### 3. **Frontend Setup**:
Navigate to the frontend folder:
```
cd admin
```
Install the required dependencies:
```
npm install
```
Set up environment variables:

Create a .env file and add the base URL for the backend API:
```
VITE_API_ENDPOINT ="http://localhost:3000"
```
## Backend Setup
Start the backend server:
```
npm run dev
```
## Frontend Setup
Start the frontend server:
```
npm start
```

