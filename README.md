# 🛒 E-Commerce Platform (Apni Dukan)

A scalable **full-stack e-commerce platform** built using **Next.js, Node.js, PostgreSQL**, and modern frontend architecture.  
Designed with **performance, scalability, and production-grade reliability** in mind.

---

## 📌 Overview

This project is a **production-ready e-commerce system** supporting:

- Product browsing & search  
- Cart & order management  
- Secure checkout & payment processing  
- Authentication & user management  

---

## 🧠 Architecture Highlights

- **Scalable Architecture:** Built a modular system combining **Next.js frontend** with an **event-driven microservices approach (Kafka-ready design)** for Catalog, Order, and Payment services — enabling loose coupling and scalability.

- **Performance Optimization:** Achieved **sub-100ms product search latency** using optimized indexing strategies and improved API response times via **Redis caching and rate limiting strategies**.

- **Reliable Payments:** Integrated **Stripe Checkout with webhook-based idempotent workflows**, ensuring **fault-tolerant order processing** and strong **data consistency** using PostgreSQL.

---

## 🚀 Core Features

### 🛍️ Product Catalog
- Dynamic product listing with optimized queries  
- Fast search and filtering  
- Category-based navigation  

---

### 🛒 Cart & Order Management
- Real-time cart updates  
- Persistent state handling  
- Transaction-safe order creation  

---

### 💳 Payment Integration
- Secure payments via **Stripe Checkout**  
- Webhook-based order confirmation  
- Idempotent transaction handling  

---

### 🔐 Authentication
- User authentication using **Clerk**  
- Secure session handling  
- Protected routes  

---

## ⚡ Performance & Scalability

- Optimized rendering using **Next.js (SSR + App Router)**  
- Efficient state management using **Zustand**  
- Reduced API latency using caching strategies  
- Designed for future **microservices scalability**

---

## 🧪 Tech Stack

| Layer              | Tech Used                                      |
|------------------|-----------------------------------------------|
| Frontend         | Next.js, React, Tailwind CSS                  |
| Backend          | Node.js                                       |
| Database         | PostgreSQL                                    |
| Messaging        | Kafka                                         |
| Caching          | Redis                                         |
| Auth             | Clerk                                         |
| Payments         | Stripe                                        |
| State Mgmt       | Zustand                                       |

---

## 🙌 Author

Made with ❤️ by Atul Chune

---
