const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const prompt = require('prompt-sync')();

const app = express();
const port = 3000;

const uri = 'mongodb+srv://meghan:meghan@practicecluster.dxjehc1.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.use(express.json());

class politician {
  constructor(id, name, vote, money) {
    this._id = id;
    this.name = name;
    this.vote = vote;
    this.money = money;
  }
}

let db;
let politiciansCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('Politicians');
    politiciansCollection = db.collection('Data');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

// POST - Create a new politician
app.post('/politicians', async (req, res) => {
  const name = prompt('Enter politician name: ');
  const vote = parseInt(prompt('Enter politician vote: '));
  const money = parseInt(prompt('Enter politician money: '));

  const newPolitician = new politician(null, name, vote, money);
  const result = await politiciansCollection.insertOne(newPolitician);
  newPolitician._id = result.insertedId;

  res.status(201).json(newPolitician);
});

// GET - Get all politicians
app.get('/politicians', async (req, res) => {
  const politicians = await politiciansCollection.find().toArray();
  res.json(politicians);
});

// GET - Get a specific politician by ID
app.get('/politicians/gbn', async (req, res) => {
    const Name = prompt('Enter the politician name: ');
  const politician = await politiciansCollection.findOne({name:Name});
  if (politician) {
    res.json(politician);
  } else {
    res.status(404).json({ error: 'politician not found' });
  }
});

// PUT - Update a politician by ID
app.put('/politicians/ubn', async (req, res) => {
//   const name = req.params.name;
  const Name = prompt('Enter the politician name: ');
  const vote = parseInt(prompt('Enter updated politician vote: '));
  const money = parseInt(prompt('Enter updated politician money: '));

  const result = await politiciansCollection.updateOne(
    { name: Name },
    { $set: { vote:vote, money:money } }
  );

  if (result.matchedCount > 0) {
    const updatedpolitician = await politiciansCollection.findOne({name: Name});
    res.json(updatedpolitician);
  } else {
    res.status(404).json({ error: 'politician not found' });
  }
});

// DELETE - Delete a politician by ID
app.delete('/politicians/dbn', async (req, res) => {
    const Name = prompt('Enter the politician name: ');
  const result = await politiciansCollection.deleteOne({name:Name});
  if (result.deletedCount > 0) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'politician not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
