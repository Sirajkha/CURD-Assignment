
# CURD Assignment:User Management API
A simple RESTful API for user registration, login, and user data management built with Node.js, Express, MongoDB, and JWT Authentication.

## Features
- User registration
- User Login
- JWT Authentication
- Retrieve User Data
- Protected Routes

## Getting Started
### 1. Clone the repository

```bash
git clone https://github.com/yourusername/user-management-api.git
cd user-management-api
```
### 2.Install dependencies:
```bash
npm install
```
### 3.Create a .env file and add:
```bash
PORT:8000
MONGO_URI=your_mongoDB_connection_string
SECRET=your_jwt_secret_key
```
### 4.Run the server:
```bash
npm run dev  # For development
npm start    # For production
```

## API Endpoints
### 1.Register a User
- URL: /api/auth/register
- Method: POST
- Description: Registers a new user by providing a name, email, and password.
- Payload:
```json
{"name":"user_name", "email":"user_email","password":"user_password" }
```
- Request Body Example:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

``` 
- Response Example:
```json
{
  "message": "User Registered Successfully"
}
```
### 2. Login a User
- URL: /api/auth/login
- Method: POST
- Description: Logs in an existing user by providing email and password, returns a JWT token for authentication.
- Payload:
```json
{"email":"user_email","password":"user_password"}
```
- Request Body Example:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Response Example:
```json
"message" :"User Login Successfully"
```
### 3.Get User Details (Protected)
- URL: /api/auth/user
- Method:GET
- Description: Retrieves the logged-in user's details. Requires the user to be authenticated using a valid JWT token.
- Headers:
  - Authorization: Bearer <token>
- Response example:
```json
{
  "_id": "60f71dcf12a1b42b18953a2f",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-09-12T15:23:07.123Z",
  "updatedAt": "2024-09-12T15:23:07.123Z"
}
```
## Technologies Used
- Node.js
- Express
- MongoDB
- JWT
