# Social Media Node.js & Express API Project

## Table of Contents

- [README](README.md)
- [MongoDB Atlas Integration Guide](DATABASE.md)
- [Post Collection Schema](POST.md)
- [Chat Collection Schema](CHAT.md)
- [User Collection Schema](USER.md)
- [Activity Collection Schema](ACTIVTY.md)

---

## Overview

This project is a social media backend built using Node.js and Express. It includes RESTful APIs for user management, posts, comments, and more. The project is designed to support a dynamic social media application with essential backend features such as user authentication, media uploads, and role-based access.

---

## Features

- **User Authentication**: Registration, login, and JWT-based authentication.
- **Posts & Comments**: Users can create, read, update, and delete posts and comments.
- **Middleware**: Custom middleware for authentication, error handling, and request logging.
- **Logging**: Logs are maintained for server activities.
- **Content Moderation**: Integrated Google Vision API and Cloudinary WebPurify for detecting and preventing uploads of inappropriate content.
- **API Documentation**: Well-documented API endpoints for easy integration.

---

## Project Structure

- `api/` - Contains route definitions for users, posts, and other features.
- `config/` - Configuration files for database connections and environment variables.
- `middlewares/` - Middleware logic for authentication, error handling, etc.
- `services/` - Business logic abstracted into services.
- `data/` - Placeholder for data-related operations.
- `logs/` - Server log files.
- `public/` - Static assets.
- `server.js` - The main server file to start the Express app.

---

## Getting Started

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

---

## Configuration

- Create a `.env` file in the root directory and provide the following environment variables:

  ```env
  DB_URI=your_mongodb_uri_here
  REACT_APP_GOOGLE_MAP_KEY=
  TOKEN_SECRET=your_jwt_secret
  CLOUD_NAME=your_cloud_name
  CLOUD_API_KEY=your_api_key
  CLOUD_API_SECRET=your_api_secret
  
  GOOGLE_PRIVATE_KEY=
  GOOGLE_CLIENT_EMAIL=
  GOOGLE_PROJECT_ID=

  ```

---

## Running the Server

To start the server in development mode:

```sh
npm run dev
```

To start the server in production mode:

```sh
npm start
```

---

## API Endpoints

### Activity Routes

- **GET /** - Fetch all activities
- **POST /** - Add a new activity
- **PUT /:id** - Update an activity by ID
- **GET /length** - Get the number of activities

### Auth Routes

- **POST /login** - User login
- **POST /signup** - User signup
- **POST /logout** - User logout

### Chat Routes

- **GET /** - Fetch all chats
- **GET /:id** - Fetch a chat by ID
- **POST /** - Create a new chat
- **PUT /:id** - Update a chat by ID
- **DELETE /:id** - Delete a chat by ID

### Comment Routes

- **GET /** - Fetch all comments
- **GET /:id** - Fetch a comment by ID
- **POST /** - Add a new comment
- **PUT /:id** - Update a comment by ID
- **DELETE /:id** - Delete a comment by ID

### Post Routes

- **GET /** - Fetch all posts
- **GET /length** - Fetch the number of posts
- **GET /:id** - Fetch a post by ID
- **POST /** - Create a new post
- **PUT /:id** - Update a post by ID
- **DELETE /:id** - Delete a post by ID

### User Routes

- **GET /** - Fetch all users
- **GET /:id** - Fetch a user by ID
- **POST /** - Add a new user
- **PUT /:id** - Update a user by ID
- **DELETE /:id** - Delete a user by ID

---

## Frontend

The frontend for this project can be found at [Chess v2 React Frontend](https://github.com/shlomiNugarker/chess-v2-react).

---

## Contributions

Feel free to submit pull requests for new features, bug fixes, or improvements. Please ensure all tests pass before submitting.

---

## License

This project is licensed under the MIT License.
