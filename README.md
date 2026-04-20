# Task Flow Server (Backend)

## Overview
This is the backend server for the Collaborative Task Management application. It is built using **Node.js** and **Express.js**, completely typed with **TypeScript**. It provides a RESTful API for user authentication, project management, and collaborative task tracking.

## Technology Stack
- **Framework:** Node.js + Express.js
- **Language:** TypeScript
- **Database ORM:** Prisma (v7+)
- **Database:** PostgreSQL (via `@prisma/adapter-pg`)
- **Validation:** `class-validator` and `class-transformer` for DTOs
- **Caching & Background Jobs:** Redis (to be implemented)
- **Authentication:** JWT (JSON Web Tokens)

## Architecture
The application uses a **feature-based modular architecture**. Each core feature has its own folder containing its specific logic:
- `controller`: Handles HTTP requests, extracts parameters, and sends responses.
- `service`: Contains the core business logic.
- `route`: Defines the API endpoints and maps them to controllers.
- `dto`: Defines Data Transfer Objects for request validation using `class-validator`.
- `util`: Feature-specific utility functions.

## Getting Started
1. **Install Dependencies:** `npm install`
2. **Environment Setup:** Create a `.env` file based on the default configuration. Ensure `DATABASE_URL` is set to your local PostgreSQL instance.
3. **Database Setup:** 
   - Run `npx prisma db push` or `npx prisma migrate dev` to create the tables.
   - Run `npx prisma generate` to generate the Prisma Client.
4. **Run Server (Dev):** `npm run dev` (starts on port 5000 by default).
