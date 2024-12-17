const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Import axios for making HTTP requests

const app = express();
const port = 3001;

const hunterApiKey = '77af2174e9962d9ae99c7864fb4825c09d99a1c3'; // Hunter API key

app.use(cors());
app.use(bodyParser.json());

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'contact_db', // Replace with your database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Helper function to check email validity using Hunter API
const isEmailValid = async (email) => {
  try {
    const response = await axios.get(`https://api.hunter.io/v2/email-verifier`, {
      params: {
        email: email,
        api_key: hunterApiKey,
      },
    });

    const { data } = response;
    return data.data.result === 'deliverable'; // Check if the email is deliverable
  } catch (error) {
    console.error('Error verifying email:', error);
    return false; // If an error occurs, assume the email is invalid
  }
};

// Create a POST route to handle form submissions
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  // Check if the email is valid
  const emailValid = await isEmailValid(email);

  if (!emailValid) {
    return res.status(400).send('Invalid email address. Please enter a valid email.');
  }

  // If email is valid, insert the data into MySQL database
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.send('Message received!');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
