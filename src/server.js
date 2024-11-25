const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'nsf',         // Database username
  host: 'localhost',   // Database host, assuming it's running locally
  database: 'nsf',     // Database name
  password: 'nsf5',     // Database password
  port: 5432           // PostgreSQL port, default is 5432
});

// Middleware
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

// Basic test route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Server is running on port 5000');
});

// API Route to get all posts
app.get('/posts', async (req, res) => {
  try {
    // Query to retrieve posts from the "post" table
    const result = await pool.query(`
      SELECT post_id, username, title, date, post_type, content, isresolved, code, getnotif
      FROM post
    `);

    // Return the rows directly as an array
    res.json(result.rows);  // Make sure this returns an array directly
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* User Account */
// API Route to sign up
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await pool.query(
      `SELECT * FROM user_account WHERE username = $1 OR email = $2`,
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO user_account (username, email, password) VALUES ($1, $2, $3)`,
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// API Route to login
app.post('/api/login', async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || (!username && !email)) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await pool.query(
      `SELECT * FROM user_account WHERE username = $1`,
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.rows[0].username,
        email: user.rows[0].email,
        isDark: user.rows[0].isdark,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* User Settings Subpage */
// API Route to get all posts from specific user
app.get('/user-posts/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Query to retrieve posts from the "post" table
    const result = await pool.query(`
      SELECT post_id, title, date, post_type, isresolved, getnotif
      FROM post, user_account
      WHERE 
        post.username = user_account.username
        AND
        post.username = $1`,
      [username]
    );

    res.json(result.rows); 
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// API Route to get the user's theme preference
app.get('/api/user-theme', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: "Username is required"});
  }

  try {
    const result = await pool.query(
      `SELECT isDark FROM user_account WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found"});
    }

    res.json({ isDark: result.row[0].isDark });
  } catch (error) {
    console.error("Error fetching theme preference:", error);
    res.status(500).json({ message: "Server error"});
  }
});

// API Route to change user's theme preference
app.post('/api/user-theme', async (req, res) => {
  const { username, isDark } = req.body;

  if (!username || typeof isDark !== 'boolean') {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    await pool.query(
      'UPDATE user_account SET isDark = $1 WHERE username = $2',
      [isDark, username]
    );

    res.status(200).json({ message: "Theme preference updated" });
  } catch (err) {
    console.error("Error updating theme preference:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
