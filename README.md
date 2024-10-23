# Contacts App

A simple CRUD (Create, Read, Update, Delete) application for managing contacts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

To set up and run the project locally, follow these steps:

1. **Clone the repository:**

   Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

   Navigate to the project directory:
   
   ```bash
   cd CRUD-APP/contacts-app
   ```

2. **Start Docker services:**

    Ensure Docker is running, then bring up the necessary services

    ```bash
    docker compose up -d
    ```

3. **Install dependencies:**

    Install the project dependencies using npm:

    ```bash
    npm install
    ```


4. **Setup Prisma:**

    Run Prisma migrations to set up the database:

    ```bash
    npx prisma migrate dev
    ```
    Generate Prisma Client:

    ```bash
    npx prisma generate
    ```

5. **Build the project:**

    Build the application for production:

    ```bash
    npm run build
    ```

6. **Start the application:**

    Start the server to run the app:

    ```bash
    npm run start
    ```

7. **Access the app:**

    Open your web browser and navigate to:

    ```bash
    http://localhost:3000
    ```

## Features

Create, Read, Update, and Delete contacts.

Manage contact details including name, phone number, email, address and notes.
