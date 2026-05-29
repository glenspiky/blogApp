# Full Stack Blog App

A modern full stack blog application built with React, Node.js, Express, MongoDB, and shadcn/ui.

## Features

### Authentication

* User registration
* User login/logout
* JWT authentication
* Protected routes
* Password hashing

### Blog Features

* Create posts
* Read posts
* Update posts
* Delete posts
* View single blog post
* User dashboard

### UI

* Responsive design
* Modern UI with shadcn/ui
* Clean layout
* Toast notifications
* Loading states

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* shadcn/ui
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## Project Structure

```bash
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── lib/
│   └── context/

server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── utils/
```

## Core Models

### User

* username
* email
* password

### Post

* title
* content
* author
* createdAt

## API Routes

### Auth Routes

* POST /api/auth/register
* POST /api/auth/login

### Post Routes

* GET /api/posts
* GET /api/posts/:id
* POST /api/posts
* PUT /api/posts/:id
* DELETE /api/posts/:id

## What I Want To Learn From This Project

* Authentication with JWT
* CRUD operations
* REST APIs
* Protected routes
* MongoDB relationships
* Full stack architecture
* Error handling
* State management
* Backend structure

## Future Improvements

* Comments
* Likes
* Rich text editor
* Image uploads
* Dark mode
* User profiles
* Search functionality
* Pagination
* Admin dashboard

## Notes

This project is focused on learning backend and full stack fundamentals by building a real application from scratch.
