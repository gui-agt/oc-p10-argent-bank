# Argent Bank Fullstack Application

This repository contains the code needed to run both the frontend and backend for Argent Bank.

## Prerequisites
Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

## Installation

Clone this repository to your local machine:

```bash
git clone git@github.com:gui-agt/oc-p10-argent-bank.git
cd <folder-name>
```

## Install dependencies for both backend and frontend:

```bash
npm run install:all
```

## Running the Application

To start both the backend and frontend servers, run:

```bash
npm run start
```

## Initialize the database:

```bash
npm run populate-db
```

### Active Servers:
Backend is available at: http://localhost:3001
Frontend is available at: http://localhost:5173

## Populated Database Data

After running the npm run setup:db script, the database will be populated with two users:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

## Design Assets

Static HTML and CSS has been created for most of the site and is located in: `/designs`.

For some of the dynamic features, like toggling user editing, there is a mock-up for it in `/designs/wireframes/edit-user-name.png`.

And for the API model that you will be proposing for transactitons, the wireframe can be found in `/designs/wireframes/transactions.png`

## Tech Stack

Backend: Node.js, Express, MongoDB
Frontend: React, Vite, Redux
