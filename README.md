# MongoDB Express Server

A simple local Node.js server using Express and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
3. Start MongoDB locally (for example with `mongod`).
4. Run the server:
   ```bash
   npm run dev
   ```

## API routes

- `GET /` - health check
- `GET /items` - list items from MongoDB
- `POST /items` - add an item with JSON payload

## Environment variables

- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - database name
- `PORT` - server port
