## Table of Contents

- [README](README.md)
- [MongoDB Atlas Integration Guide](DATABASE.md)
- [Post Collection Schema](POST.md)
- [Chat Collection Schema](CHAT.md)
- [User Collection Schema](USER.md)
- [Activity Collection Schema](ACTIVITY.md)

# Social Media Node.js & Express API Project

## Overview

This project is a social media backend built using Node.js and Express. It includes RESTful APIs for user management, posts, comments, and more. The project is designed to support a dynamic social media application with essential backend features such as user authentication, media uploads, and role-based access.

## Features

- **User Authentication**: Registration, login, and JWT-based authentication.
- **Posts & Comments**: Users can create, read, update, and delete posts and comments.
- **Middleware**: Custom middleware for authentication, error handling, and request logging.
- **Logging**: Logs are maintained for server activities.
- **API Documentation**: Well-documented API endpoints for easy integration.

## Project Structure

- `api/` - Contains route definitions for users, posts, and other features.
- `config/` - Configuration files for database connections and environment variables.
- `middlewares/` - Middleware logic for authentication, error handling, etc.
- `services/` - Business logic abstracted into services.
- `data/` - Placeholder for data-related operations.
- `logs/` - Server log files.
- `public/` - Static assets.
- `server.js` - The main server file to start the Express app.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/shlomiNugarker/social-media-node-express.git
   ```

2. Navigate to the project directory:

   ```sh
   cd social-media-node-express-main
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

- Create a `.env` file in the root directory and provide the following environment variables:

  ```env
  DB_SOCIAL_NETWWORK=your_mongodb_uri_here
  REACT_APP_GOOGLE_MAP_KEY=
  TOKEN_SECRET=your_jwt_secret

  ```

## Running the Server

To start the server in development mode:

```sh
npm run dev
```

To start the server in production mode:

```sh
npm start
```

## API Endpoints

The following are the primary API endpoints:

- **User Routes**:

  - `POST /api/users/register` - Register a new user
  - `POST /api/users/login` - Authenticate a user
  - `GET /api/users/profile` - Get the authenticated user's profile

- **Post Routes**:
  - `GET /api/posts` - Fetch all posts
  - `POST /api/posts` - Create a new post
  - `PUT /api/posts/:id` - Update a post
  - `DELETE /api/posts/:id` - Delete a post

## Frontend

The frontend for this project can be found at [Chess v2 React Frontend](https://github.com/shlomiNugarker/chess-v2-react).

## Contributing

Feel free to submit pull requests for new features, bug fixes, or improvements. Please ensure all tests pass before submitting.
