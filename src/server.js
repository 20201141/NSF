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

// API Route to create a comment; returns comment type
app.post('/comments', async (req, res) => {
  const { post_id, username, parent_id, content } = req.body;

  if (!post_id || !username || !content ) {
    return res.status(400).json({ message: 'post_id, username, and content are required!'})
  }

  try {
    const result = await pool.query(
      `INSERT INTO comment (post_id, username, parent_id, content, date, likes)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 0)
      RETURNING comment_id, post_id, username, parent_id, content, date, likes`,
      [post_id, username, parent_id || null, content]
    );
    
    // make it comment type
    const comment = result.rows[0];
    const matchType = {
      content: comment.content,
      date: comment.date,
      likes: comment.likes,
      username: comment.username,
      parent_id: comment.parent_id,
    };
    res.status(201).json(matchType);
  } catch (err) {
    console.error('Error creating comment:', err);
    if (err.code == '23503') {
      return res.status(400).json({ message: 'Invalid post_id or username'});
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
