# Ecommerce

A fullstack eCommerce website built with MySQL/PostgresQL, Express, React, and Redux. Integrated Stripe payment gateway.

## Entity Relationship Diagram (ERD)
![erd](https://i.imgur.com/do6NWyr.png)

## Prerequisites
- Docker
- Kubernetes (minikube)
- Skaffold
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
REACT_APP_BACKEND_URL=/api
```

###  Run Locally
1. Start minikube
```bash
$ minikube start
```

2. Enable ingress service
```bash
$ minikube addons enable ingress
```

3. Run skaffold
```bash
$ skaffold dev
```

## A star would be nice if you like it!