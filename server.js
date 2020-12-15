const cors = require('cors');
const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToDatabase');

app.use(cors());

connectToDatabase();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on: ${PORT}`))