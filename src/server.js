const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'nsf',         // Database username
  host: 'localhost',   // Database host, assuming it's running locally
  database: 'nsf',     // Database name
  password: 'nsf5',     // Database password
  port: 5432           // PostgreSQL port, default is 5432
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Server is up and running');
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
        post.username = $1
        `,
      [username]
    );

    res.json(result.rows); 
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
