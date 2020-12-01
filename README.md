# Ecommerce

A simple eCommerce website built with Mysql, Express, React, and Redux.

## ERD Diagram
![erd](https://i.imgur.com/oYg2XMc.png)

## Prerequisites
- Ubuntu 18.04 LTS (or later)
- yarn
- node.js
- MySQL

## Usage

### Configure MySQL server:
1. You may follow [the instrucions]() to install and configure MySQL server.
2. Create a `.env` file in `/backend/` folder:
    ```
    HOST=localhost
    PORT=8080
    DB_USER=your-user-name
    DB_PASSWORD=your-db-password
    AUTH_SECRET_KEY=your-jwt-secret-key
    SENDGRID_API_KEY=your-sendgrid-api-key
    STRIPE_SECRET_KEY=your-stripe-secret-key
    ```
3. Start your MySQL server.

###  Run backend server:
```bash
$ cd backend
$ yarn # install dependencies for the first time
$ yarn start
```

### Run React frontend:
```bash
$ cd frontend
$ yarn # install dependencies for the first time
$ yarn start
```

## A star would be nice if you like it!