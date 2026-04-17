require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'mydatabase';

app.use(express.json());

let db;

async function connectToMongo() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to MongoDB: ${mongoUri}/${dbName}`);
}

app.get('/', (req, res) => {
  res.send('Express + MongoDB server is running');
});

app.get('/items', async (req, res) => {
  try {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const item = req.body;
    const result = await db.collection('items').insertOne(item);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create item' });
  }
});

connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
