# Soha Technical Challenge

## Overview

This project was created for the Soha technical challenge. It consists of a Next.js frontend with a NestJS backend API. The main technologies used are:

### Frontend

- Next.js - React framework for building server-rendered apps
- MaterialUI - A comprehensive React UI framework based on Material Design principles, offering a set of beautiful and customizable components.
- TailwindCSS - A utility-first CSS framework for crafting stylish and responsive user interfaces.
- Redux - State management
- Axios - Promise based HTTP client

### Backend

- NestJS - Backend framework for building efficient, scalable server-side apps
- Prisma ORM - Modern database access library
- JWT - Authentication using JSON Web Tokens
- Swagger - API documentation
- Jest - A powerful testing framework ensuring the reliability and accuracy of your application.

## Running the App

Before running the project, ensure that all other Docker containers and applications are stopped to avoid any conflicts.

To run the entire app, navigate to the root directory of the repository and execute:

    docker-compose up

This will start the Next.js frontend on port 3000 and the NestJS API on port 3001.

The frontend can be accessed at http://localhost:3000.
The API docs can be accessed at http://localhost:3001/api.

You may need to restart the containers if the migration does not occur automatically. This can happen when the PostgreSQL database takes some time to initialize for the first time.

## Test (only for backend)

NOTE: If you are not conducting tests within the container, please ensure that you execute this command in the /back directory.

    npm install

To test the backend, navigate to the /back directory and execute:

    npm test
