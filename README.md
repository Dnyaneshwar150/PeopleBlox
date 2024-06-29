# Web Application with Account Lock Feature

This web application allows users to register, log in, and access a home page, with security features to lock accounts after five consecutive failed login attempts within a 12-hour period.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Features

- **Registration Page**: Form with username and password fields.
- **Login Page**: Form with username and password fields, redirects to Home Page on success.
- **Home Page**: Displays "Welcome, {{userName}}".
- **Security**: Locks account for 24 hours after five failed login attempts in 12 hours.

## Setup and Installation

1. **Clone the repo**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Backend Setup**:
    - Navigate to `backend` directory.
    - Install dependencies:
        ```bash
        npm install
        ```
    - Create a `.env` file with:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```
    - Start server:
        ```bash
        npm run dev
        ```

3. **Frontend Setup**:
    - Navigate to `frontend` directory.
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start React server:
        ```bash
        npm start
        ```

## Running the Application

1. **Start Backend**:
    ```bash
    cd backend
    npm run dev
    ```

2. **Start Frontend**:
    ```bash
    cd frontend
    npm start
    ```

3. **Access**: Visit `http://localhost:3000` in your browser.

## API Endpoints

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Get User**: `GET /api/user` (requires JWT token)

