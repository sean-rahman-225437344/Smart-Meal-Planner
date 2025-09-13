# Smart Meal Planner — Backend

## Overview

This is the backend service for the **Smart Meal Planner** project.  
It is built with **Node.js (Express.js)** and **MongoDB**, following a **domain-based modular architecture** (auth, profile, plans, recipes).

Key design choices:

- Controllers → handle requests and responses
- Services → contain business logic
- Models → Mongoose schemas for MongoDB
- Routes → define API endpoints
- Middleware → auth checks, validation, error handling

---

## Architecture Diagram

![System Architecture](docs/architecture-diagram.png)

The architecture follows a clean separation of concerns:

- **Frontend (HTML, CSS, Vanilla JS)** communicates with backend APIs via `fetch`/Axios.
- **Backend (Express.js)** is split into domain modules: `auth/`, `profile/`, `plans/`, `recipes/`.
- **MongoDB** stores users, profiles, recipes, and meal plans.
- **Middleware** enforces authentication, validation, and error handling.

---
