# Contacts App

A simple CRUD (Create, Read, Update, Delete) application for managing contacts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Docker](https://www.docker.com/get-started) installed on your machine.

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

2. **Create the .env file:**

   Copy the contents of .env.example into a new .env file

   ```bash
   cp .env.example .env
   ```

3. **Start Docker services:**

   Ensure Docker is running, then bring up the necessary services

   ```bash
   docker compose up --build
   ```

4. **Access the app:**

   Open your web browser and navigate to:

   ```bash
   http://localhost:3000
   ```

## Features

Create, Read, Update, and Delete contacts.

Manage contact details including name, phone number, email, address and notes.
