# 🎬 Balkanetflix

A full-stack web platform built to demonstrate a modern, containerized, and decoupled application architecture for managing a movie collection.

This project was developed to showcase end-to-end skills, from setting up infrastructure with Docker and preparing for CI/CD, to building a secure API and a reactive user interface.

## 🚀 Live Demo

- **Frontend (React + Vite, hosted on Vercel):** [Your Vercel Deployment URL Here]
- **Backend API Status (Node.js + Express, hosted on Railway):** [Your Railway API Status URL Here, e.g., `https://.../api/status`]

## 📸 Application Preview

_(Here you can add a screenshot of your application, for example, the styled HomePage)_
![Balkanetflix Screenshot](link-to-your-screenshot.png)

## ✨ Core Features

- **Containerized Infrastructure:** A fully isolated and reproducible development environment using Docker and Docker Compose.
- **Secure Authentication:** Complete registration and login system based on JSON Web Tokens (JWT), with secure password hashing via `bcrypt`.
- **Role-Based Authorization (RBAC):** Clear distinction between regular users (`USER`) and administrators (`ADMIN`), with appropriately protected API routes.
- **Full CRUD API:** Complete Create, Read, Update, and Delete operations for movie management.
- **Robust Validation:** All incoming API data is validated using Zod to ensure data integrity and prevent errors.
- **Reactive UI:** A user interface built with React and Vite, featuring global state management with Zustand.
- **Protected Frontend Routes:** Logged-out users cannot access private pages.
- **Automated Deployment:** Backend and database deployed on Railway, frontend on Vercel, with a CI/CD-ready workflow.

## 🛠️ Tech Stack

#### **Frontend**

- **Framework:** React 18+ (with Hooks)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** Zustand (with `persist` middleware)
- **API Communication:** Axios

#### **Backend**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with Prisma
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Validation:** Zod

#### **Infrastructure & DevOps**

- **Containerization:** Docker & Docker Compose
- **Backend & DB Hosting:** Railway
- **Frontend Hosting:** Vercel
- **Version Control:** Git & GitHub

---

## 🏗️ Architecture Overview

This application uses a modern, decoupled architecture:

1.  **Frontend (Vercel):** A React Single Page Application (SPA) is served to users through Vercel's global CDN, ensuring maximum performance.
2.  **Backend (Railway):** A Docker-containerized RESTful API that handles all business logic.
3.  **Database (Railway):** A managed PostgreSQL instance that communicates with the backend over a secure, private network.

Communication between the frontend and backend is handled via secure HTTP requests, and the entire system is designed to be scalable and maintainable.

---

## ⚙️ Local Development Setup

To run this project locally, ensure you have **Git**, **Node.js**, and **Docker Desktop** installed.

**1. Clone the Repository**

```bash
git clone [https://github.com/paulcureu/Balkanetflix.git](https://github.com/paulcureu/Balkanetflix.git)
cd Balkanetflix
```

**2. Configure Environment Variables**
This project requires two `.env` files to manage secrets and configuration. These files are not committed to Git and must be created manually.

- **A. Root `.env` file:** At the project root (`/Balkanetflix`), create a new file named **`.env`**. Add the following content, replacing placeholder values.

  ```ini
  # Root .env file - Used by Docker Compose and the server container

  # PostgreSQL Database Variables
  POSTGRES_USER=balkanetflix_user
  POSTGRES_PASSWORD=your_secure_password_here
  POSTGRES_DB=balkanetflix_db

  # Secret key for signing JWTs
  JWT_SECRET=a_very_long_and_complex_secret_key_12345

  # Backend Server Variables
  PORT=3000

  # Full database connection string for Docker network
  DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?schema=public"
  ```

- **B. Server `.env` file:** In the `server/` folder, create another file named **`.env`**. This is used for running Prisma commands locally against the Docker database.

  ```ini
  # server/.env - Used for local development commands

  # Connection string for connecting from your PC to the DB in Docker
  DATABASE_URL="postgresql://balkanetflix_user:your_secure_password_here@localhost:5432/balkanetflix_db?schema=public"

  # JWT Secret is also needed here
  JWT_SECRET=a_very_long_and_complex_secret_key_12345
  ```

**3. Build and Run the Docker Containers**
This command will build the Docker images for the `server` and `client` and start all 4 services.

```bash
docker compose up --build
```

_(To run in the background, add the `-d` flag)_

**4. Initialize the Database (First Migration)**
Once the containers are running, open a **new terminal** and run the Prisma migration to create the database tables.

```bash
docker compose exec server npx prisma migrate dev
```

**5. You're all set!**

- **Frontend:** `http://localhost:3000`
- **Backend Status:** `http://localhost:3001/api/status`
- **Adminer (DB GUI):** `http://localhost:8888`

---

## 🗺️ Roadmap (Future Improvements)

- [ ] **Automated Testing:** Add integration tests for the API (with Jest & Supertest) and unit/component tests for the frontend (with Vitest & React Testing Library).
- [ ] **CI/CD Pipeline:** Finalize the GitHub Actions workflow to run tests automatically on every push.
- [ ] **Advanced Data Fetching:** Migrate the frontend from `useEffect` + `axios` to **React Query** (TanStack Query) for superior server state management (caching, re-fetching, etc.).
- [ ] **Genre Refactoring:** Refactor the `genre` field from a simple `String` to a many-to-many relationship with a `Genre` table for better filtering and management.
- [ ] **New Features:** Implement pagination for the movie list, a search functionality, and file uploads for movie posters.
