# Chat API

A full-featured Chat API built using modern Node.js technologies. This API supports user authentication, chat room creation, and real-time-like messaging endpoints.

## 🛠 Tech Stack

* **Express.js** – Fast and minimalist web framework
* **MongoDB** & **Mongoose** – Database and object modeling
* **JWT (Access + Refresh Tokens)** – Secure authentication
* **bcryptjs** – Password hashing
* **express-validator** – Request validation
* **cookie-parser** – Cookie handling
* **Morgan** – HTTP request logging
* **Winston** – Advanced logging

---

## 🛆 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-api.git
   cd chat-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root with the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_access_secret
   REFRESH_TOKEN_SECRET=your_refresh_secret
   ```

4. Run the server:

   ```bash
   npm start
   ```

---

## 🔐 Authentication Routes

### Register

```
POST /api/auth/register
```

* Body: `{ "username": "yourname", "email": "you@example.com", "password": "yourpassword" }`

### Login

```
POST /api/auth/login
```

* Body: `{ "email": "you@example.com", "password": "yourpassword" }`

---

## 💬 Message Routes

### Send a Message

```
POST /api/messages/:roomId
```

* Body: `{ "message": "Hello world" }`
* Requires: Auth token (access token)

### Get Messages from a Room

```
GET /api/messages/:roomId
```

* Requires: Auth token

---

## 🏠 Room Routes

### Create a Room

```
POST /api/rooms
```

* Body: `{ "name": "room-name" }`
* Requires: Auth token

### Get All Rooms

```
GET /api/rooms
```

* Requires: Auth token

---

## ✅ Features

* User registration and login with hashed passwords
* JWT-based authentication (access + refresh)
* Cookie support for storing refresh tokens securely
* Chat room creation and messaging system
* Input validation and error handling
* Structured logging with Morgan and Winston

---

## 📂 Folder Structure

```
chat-api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── logger.js
├── app.js
├── server.js
└── .env
```

---

## 🧪 Testing the API

Use Postman, Thunder Client, or cURL to test the API endpoints. Make sure to include the JWT access token in headers where required:

```
Authorization: Bearer <your_token>
```

---

## 📄 License

This project is licensed under the MIT License.

---

Feel free to contribute or open issues if you find bugs!
