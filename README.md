# Backend Server with Auth Setup

This is a starter repository for a backend server with authentication setup using Node.js and MongoDB.

## Features

- User authentication (signup, login)
- JWT token-based authentication
- MongoDB for database
- Environment configuration using `.env` files
- Test setup with Jest

## Prerequisites

- Node.js
- MongoDB

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abuka-Victor/node_backend_starter.git
cd node_backend_starter
```

### 2. Install dependencies

```bash
yarn
```

### 3. Environment Setup

Create a .env file and a .env.test file in the root directory. You can use the sampleEnv and sampleTestEnv files as examples.

```bash
cp sampleEnv .env
cp sampleTestEnv .env.test
```

Edit the .env and .env.test files to set your environment variables.

### 4. Start the server

To start the server in development mode:

```bash
yarn server
```

To start the server in production mode:

```bash
yarn start
```

### 5. Running Tests

To run the test suite:

```bash
yarn test
```

### API Endpoints

#### Auth

- POST /api/auth/signup - User signup
- POST /api/auth/login - User login

#### Protected Routes

These routes require a valid JWT token.

- GET /api/protected - Example protected route

### Project Structure

```lua
Copy code
.
│── config
│  └── db.js
│── controllers
│  └── userController.js
│── middlewares
│  └── authMiddleware.js
│  └── errorMiddleware.js
│── models
│  └── userModel.js
│── routes
│  └── userRoutes.js
│── __tests__
│  └── user.test.js
│── utils
│  └── generateToken.js
│── server.js
├── .env
├── .env.test
├── sampleEnv
├── sampleTestEnv
├── package.json
└── README.md
```

### Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

License

This project is licensed under the MIT License.
