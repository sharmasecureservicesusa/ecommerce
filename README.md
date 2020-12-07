# Ecommerce

A fullstack eCommerce website built with MySQL/PostgresQL, Express, React, and Redux. Integrated Stripe payment gateway. Uses Docker to containerize services and Kubernetes to manage containers.

![](https://i.imgur.com/g57HueB.png)

## Entity Relationship Diagram (ERD)
![erd](https://i.imgur.com/do6NWyr.png)

## Prerequisites
- Docker
- Kubernetes (minikube)
- Skaffold
- Stripe account

## Run Locally

1. Create a `.env` file in `/backend/` folder:
```
HOST=localhost
PORT=8080
AUTH_SECRET_KEY=YOUR_JWT_SECRET
SENDGRID_API_KEY=YOUR_SENDGRID_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```

2. Create a `.env` file in `/frontend/` folder:
```
REACT_APP_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY
REACT_APP_BACKEND_URL=/api
```

3. Start minikube
```bash
$ minikube start
```

4. Enable ingress service
```bash
$ minikube addons enable ingress
```

5. Run skaffold
```bash
$ skaffold dev
```

## A star would be nice if you like it!