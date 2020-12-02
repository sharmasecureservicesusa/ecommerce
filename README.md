# Ecommerce

A fullstack eCommerce website built with Mysql, Express, React, and Redux. Integrated Stripe payment gateway.

## Entity Relationship Diagram (ERD)
![erd](https://i.imgur.com/do6NWyr.png)

## Prerequisites
- Ubuntu 18.04 LTS (or later)
- yarn
- node.js
- MySQL
- Stripe account

## Usage

### Configure MySQL server:
1. You may follow [the instrucions](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) to install and configure MySQL server.
2. Create a `.env` file in `/backend/` folder:
```
HOST=localhost
PORT=8080
DB_USER=YOUR_DB_USER_NAME
DB_PASSWORD=YOUR_DB_PASSWORD
AUTH_SECRET_KEY=YOUR_JWT_SECRET
SENDGRID_API_KEY=YOUR_SENDGRID_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```
3. Start your MySQL server

### Stripe payment gateway:
1. Create a Stripe account
2. Create a `.env` file in `/frontend/` folder:
```
REACT_APP_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY
REACT_APP_BACKEND_URL=http://localhost:8080/api
```

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