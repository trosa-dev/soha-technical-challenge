# Soha Technical Challenge (BACK)

IMPORTANT NOTE 1: This project was developed using Node.js version 20.10.0.

If you encounter any errors, please verify your Node.js version by running:

    node -v

IMPORTANT NOTE 2: To run the backend project successfully, ensure that you have a running instance of PostgresDB. The connection details must be configured and set in the .env file under the variable DATABASE_URL.

## Overview

This project was created for the Soha technical challenge. It consists of a NestJS backend. The main technologies used are:

### Backend

- NestJS - Backend framework for building efficient, scalable server-side apps
- Prisma ORM - Modern database access library
- JWT - Authentication using JSON Web Tokens
- Swagger - API documentation
- Jest - A powerful testing framework ensuring the reliability and accuracy of your application.

## Running the App

Before running the project, ensure that all other Docker containers and applications are stopped to avoid any conflicts.

To initiate the frontend, navigate to the /back directory from the repository's root directory and execute:

    npm install

After installing the packages, execute:

    npm run dev

This will start the NestJS frontend on port 3001.

The backend can be accessed at http://localhost:3001.
