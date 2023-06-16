import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
import fs from 'fs';
import cors from 'cors'
import readline from 'readline';
import express from 'express';
mongoose.connect("mongodb://0.0.0.0:27017/englishwords")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
const tutSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  }
});
const collection = mongoose.model('collection1', tutSchema);
const url = 'mongodb://localhost:27017/englishwords';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(cors())
// ... define routes and other middleware
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get('/api/search', async (req, res) => {
  const word = req.query.w; // Retrieve the 'w' query parameter
  try {
    // Search for the word in the database
    const result = await collection.exists({ word });
    // Send the result back as the response
    res.json({ exists: result });
  } catch (error) {
    console.error('Error searching for word:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Datas to MongoDB

// const addLineToMongoDB = async (line) => {
//   try {
//     await collection.create({ word: line });
//     console.log('Line inserted successfully:', line);
//   } catch (error) {
//     console.error('Error inserting line:', error);
//   }
// };
// const readTextFileLineByLine = (filename) => {
//   const fileStream = fs.createReadStream(filename);
//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });
//   rl.on('line', async (line) => {
//     // Process each line here
//     await addLineToMongoDB(line);
//   });
//   rl.on('close', () => {
//     // File reading completed
//     console.log('File reading completed.');
//     client.close();
//   });
// };
// readTextFileLineByLine('file');