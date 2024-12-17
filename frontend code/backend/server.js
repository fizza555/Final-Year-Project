const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Initialize Express
const app = express();
const port = 5002;

// Middlewarecd 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'contact_db',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('MySQL Connected...');
});

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fizzabukhari555@gmail.com', // Replace with your email
    pass: 'ptfu jlwp gbzl qgkp', // Replace with your app-specific password
  },
});

// ==================== Routes ==================== //

// **1. Forgot Password Route**
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Check if the user exists in the database
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If no user found, send a generic message for security
    if (results.length === 0) {
      return res.status(200).json({ message: 'If an account with that email exists, a reset link will be sent.' });
    }

    // Generate a secure reset token and set an expiration time (1 hour)
    const resetToken = crypto.randomBytes(20).toString('hex');
    const tokenExpiration = Date.now() + 3600000; // 1 hour

    // Update the user's record with the reset token and expiry time
    const updateTokenQuery = 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
    db.query(updateTokenQuery, [resetToken, tokenExpiration, email], async (err) => {
      if (err) {
        console.error('Error updating token:', err);
        return res.status(500).json({ error: 'Error setting reset token' });
      }

      // Send the reset email
      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

      const mailOptions = {
        from: 'fizzabukhari555@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        html: `
          <p>Hello,</p>
          <p>You are receiving this email because we received a request to reset the password for your account.</p>
          <p>If you made this request, please click the link below to reset your password:</p>
          <p><a href="${resetLink}">${resetLink}</a></p>
          <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged, and no action is required.</p>
          <p>If you have any questions or need further assistance, feel free to contact us.</p>
          <p>Best regards,</p>
          <p>DeeepGuard Application</p>
        `,
      };
      

      try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Password reset link sent to your email.' });
      } catch (emailErr) {
        console.error('Error sending email:', emailErr);
        return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
      }
    });
  });
});

// **2. Verify Token Route**
app.post('/verify-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const query = 'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?';
  const currentTime = Date.now();

  db.query(query, [token, currentTime], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    res.status(200).json({ message: 'Token is valid' });
  });
});

// **3. Reset Password Route**
app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  // Check if the token is valid and not expired
  const checkTokenQuery = 'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?';
  const currentTime = Date.now();

  db.query(checkTokenQuery, [token, currentTime], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database and clear the reset token
    const updatePasswordQuery = 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?';
    db.query(updatePasswordQuery, [hashedPassword, token], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to reset password' });
      }

      res.status(200).json({ message: 'Password successfully updated' });
    });
  });
});


const hunterApiKey = '77af2174e9962d9ae99c7864fb4825c09d99a1c3'; // Hunter API key

// Signup Route
app.post('/Signup', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and Password are required' });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com|\.pk)$/i;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email domain or format.' });
  }

  try {
    // First check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error during email check: ", err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // If the email already exists, send error response
      if (results.length > 0) {
        return res.status(409).json({ error: 'Email already in use. Please use a different email.' });
      }

      // If the email does not exist, proceed to verify with Hunter API
      try {
        const hunterResponse = await axios.get(`https://api.hunter.io/v2/email-verifier`, {
          params: {
            email: email,
            api_key: hunterApiKey
          }
        });

        const verificationData = hunterResponse.data.data;
        if (!verificationData || verificationData.status !== 'valid') {
          return res.status(400).json({ error: 'The email is not valid or deliverable.' });
        }

        // Hash the password and insert the user after passing all checks
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
          if (err) {
            console.error("Error during user insertion: ", err);
            return res.status(500).json({ error: 'Database insertion error' });
          }

          res.status(201).json({ message: 'User registered successfully!' });
        });

      } catch (hunterErr) {
        console.error('Error with Hunter API or server: ', hunterErr);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } catch (err) {
    console.error('Error with server: ', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and Password are required' });
  }

  try {
    // Check if the email exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        // If no user found
        return res.status(401).json({ error: 'Incorrect email or password. Please try again.' });
      }

      // Email exists, now compare the password
      const user = results[0]; // Get the user object from results
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        // If password does not match
        return res.status(401).json({ error: 'Incorrect email or password. Please try again.' });
      }

      // If both email and password are correct
      res.status(200).json({ message: 'Login successful', user });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
