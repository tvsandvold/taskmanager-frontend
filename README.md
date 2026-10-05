# ✅ Task Manager - Frontend

The React frontend for my fullstack Task Manager application.

I built this project together with a Spring Boot backend to get more hands-on experience with fullstack development and to better understand how a frontend communicates with a REST API, handles authentication and manages application state.

The backend lives in a separate repository:

[Task Manager Backend](https://github.com/tvsandvold/taskmanager)

## About the project

This is the user-facing part of my Task Manager project.

The goal was to build a simple and practical interface around the backend API, where users can create an account, log in and manage their tasks.

Building the frontend gave me practical experience with React and, more importantly, with connecting a frontend to a separate backend application.

## Built with

- React
- JavaScript
- HTML
- CSS
- npm

The application communicates with a separate Java and Spring Boot backend through a REST API.

## What can it do?

- Register a new user
- Log in to an existing account
- Communicate with the backend API
- Handle JWT-based authentication
- Display the user's tasks
- Create new tasks
- Update existing tasks
- Delete tasks
- Keep the frontend and backend separated as two independent applications

## Authentication

Authentication is handled together with the Spring Boot backend.

When a user logs in, the frontend sends the credentials to the backend. After a successful login, the backend returns a JWT that can be used when making requests to protected API endpoints.

This was one of the more useful parts of the project for me, since it helped me understand how authentication works across a separate frontend and backend rather than only inside one application.

## Backend

This repository only contains the frontend.

The backend handles:

- User registration and login
- JWT authentication
- Spring Security
- Task management
- Database persistence
- PostgreSQL

You can find the backend here:

[tvsandvold/taskmanager](https://github.com/tvsandvold/taskmanager)

## Running it locally

### What you'll need

Make sure you have:

- Node.js
- npm
- The Task Manager backend running locally

### 1. Clone the repository

```bash
git clone https://github.com/tvsandvold/taskmanager-frontend.git
cd taskmanager-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the application

```bash
npm start
```

The frontend will normally be available at:

```text
http://localhost:3000
```

For the complete application to work, the backend also needs to be running.

## Running the backend

Clone the backend repository separately:

```bash
git clone https://github.com/tvsandvold/taskmanager.git
```

Then follow the setup instructions in the backend repository:

[Task Manager Backend](https://github.com/tvsandvold/taskmanager)

With both applications running, the setup looks like this:

```text
React Frontend
      ↓
   REST API
      ↓
Spring Boot Backend
      ↓
  PostgreSQL
```

## Why I built it

I wanted this project to be more than just a React interface.

The interesting part for me was connecting everything together and understanding the complete flow from the user interface to the database:

**User → React → REST API → Spring Boot → PostgreSQL**

Working on the frontend gave me more experience with React, API communication and authentication, while the project as a whole helped me understand how the different parts of a fullstack application work together.

It's a project I can continue improving as I learn more.

## Author

**Terje Vo Sandvold**

- [GitHub](https://github.com/tvsandvold)
- [LinkedIn](https://linkedin.com/in/tvsandvold)
