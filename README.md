# Node.ts API with Prisma, SQLite, and Fastify

This project is a simple API built using **Node.ts** (TypeScript), **Prisma** as the ORM, **SQLite** as the database, and **Fastify** for the server. The API includes CRUD operations for managing **users** and **contacts** associated with each user.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Endpoints](#endpoints)
  - [User CRUD](#user-crud)
  - [Contact CRUD](#contact-crud)
- [Running the Server](#running-the-server)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Generate the Prisma client:

    ```bash
    npx prisma generate
    ```

## Environment Variables

Create a `.env` file in the root of the project with the following content:

```env
DATABASE_URL="file:./dev.db"

## To set up the database schema
npx prisma migrate dev --name init

## To start the development server, run:
npm run dev



