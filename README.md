# Setup Instructions

Follow these steps to configure the environment for your application:

## Prerequisites

- **PostgreSQL**: Version 17
- **Node.js**: Version 20

## Steps to Configure the Environment

1. **Download PostgreSQL v17**  
   Visit the [PostgreSQL website](https://www.postgresql.org/download/) and download version 17 for your operating system.

2. **Download Node.js v20**  
   Visit the [Node.js website](https://nodejs.org/en/download/) and download version 20 for your operating system.

3. **Install Dependencies**  
   Navigate to your project directory in the terminal and run:
   ```bash
   npm install

4. create file .env with the information abour DB    
 ```bash
 DB_HOST=your_db_host
 DB_PORT=your_db_port
 DB_USERNAME=your_db_username
 DB_PASSWORD=your_db_password
 DB_DATABASE=your_db_name
```
5. Create Database
6. run
```
npm run typeorm:generate
```
to generate de first migration.

7. run
```
npm start
```
and await the migration creates.
8 - setup must be ok.

