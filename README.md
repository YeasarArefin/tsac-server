# TSAC Server

A brief description of your project. What it does, who it's for, and the problem it solves.

[![Build Status](https://img.shields.io/travis/com/your-username/your-repo.svg)](https://travis-ci.com/your-username/your-repo)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)

## Tech Stack

- **Server:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Hosting/Backend Services:** Firebase Admin SDK
- **Linting:** ESLint
- **Code Formatting:** Prettier
- **Development:** Nodemon

## Features

- User account creation and management
- JWT-based authentication
- Expenditure tracking
- Invoice creation and management
- Dashboard with an overview of financial data

## Installation Guide

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tsac-server.git
    cd tsac-server
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```
    or
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```
    PORT=5000
    DB_USER=<your_database_user>
    DB_PASS=<your_database_password>
    ACCESS_TOKEN_SECRET=<your_jwt_secret>
    ```

4.  **Set up Firebase:**
    - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
    - Download your Firebase Admin SDK private key JSON file and place it in `source/utils/firebase/firebase.config.js`.

## Usage Instructions

1.  **Start the server:**
    ```bash
    npm run dev
    ```
    This will start the server with nodemon, which will automatically restart the server on file changes.

2.  **Start the server in production:**
    ```bash
    npm start
    ```

## Configuration

- **Database:** The database connection is configured in `source/db/db.config.js`.
- **Firebase:** Firebase is configured in `source/utils/firebase/firebase.init.js`.
- **ESLint:** Linting rules are defined in `.eslintrc.json`.
- **Prettier:** Formatting rules are defined in `.prettierrc` (or in `package.json`).

## API Documentation

The API is versioned under `/v1`.

### Authentication

- `POST /v1/jwt` - Generate a JWT token.

### Accounts

- `GET /v1/accounts` - Get all accounts.
- `POST /v1/create-account` - Create a new account.

### Expenditure

- `GET /v1/expenditure` - Get all expenditures.
- `POST /v1/expenditure` - Add a new expenditure.

### Invoice

- `GET /v1/invoice` - Get all invoices.
- `POST /v1/invoice` - Create a new invoice.

### Dashboard

- `GET /v1/dashboard` - Get dashboard data.

## Screenshots / Demo

![Screenshot of the application](https://via.placeholder.com/800x400.png?text=Application+Screenshot)
*A brief caption for the screenshot.*

## Contact / Support

- **Author:** Yeasar Arefin
- **Email:** [yeasararefin007@gmail.com](mailto:yeasararefin007@gmail.com)
- **Portfolio:** [yeasararefin.vercel.app](https://yeasararefin.vercel.app)
