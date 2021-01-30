# Ecommerce

A fullstack eCommerce website built with MySQL/PostgresQL, Express, React, and Redux. Integrated Stripe payment gateway. Uses Docker to containerize services and Kubernetes to manage containers.

<p align="center">
    <img src="https://i.imgur.com/5UdYRCl.png" />
</p>

## Entity Relationship Diagram (ERD)
![erd](https://i.imgur.com/do6NWyr.png)

## Prerequisites
- Docker
- Kubernetes (Minikube)
- Skaffold
- Stripe account

## Run Locally

1. Start minikube
```bash
$ minikube start
```

2. Inject environment variables into Kubernetes
```bash
$ kubectl create secret generic jwt-secret-key --from-literal JWT_SECRET_KEY=YOUR_JWT_SECRET
$ kubectl create secret generic stripe-secret-key --from-literal STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
$ kubectl create secret generic mysql-password --from-literal MYSQL_ROOT_PASSWORD=YOUR_DB_PASSWORD
```

3. Enable NGINX ingress controller (Go to the [official doc](https://kubernetes.github.io/ingress-nginx/deploy/) to find instructions that suit your platform)
```bash
$ minikube addons enable ingress
```

4. Edit `/etc/hosts` file, paste in minikube ip (by running `minikube ip` in terminal)
```
[your_minikube_ip] ecommerce-fullstack.dev
```

5. Run skaffold
```bash
$ skaffold dev
```

6. Now you should see the app running at `ecommerce-fullstack.dev`

## A star would be nice if you like it!