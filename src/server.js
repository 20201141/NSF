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

/* User Account */
// API Route to sign up
app.post('/signup', async (req, res) => {
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

    await pool.query(
      `INSERT INTO user_account (username, email, password) VALUES ($1, $2, $3)`,
      [username, email, password]
    );
    res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// API Route to login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

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
app.get('/user-theme', async (req, res) => {
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
app.post('/ user-theme', async (req, res) => {
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

//API Route to get all of the post's comments
// API Route to get all of the post's comments
app.get('/comments/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await pool.query(
      `SELECT comment_id, post_id, username, parent_id, content, date, likes
      FROM comment 
      WHERE post_id = $1 
      ORDER BY date ASC`,
      [postId]
    );

    const comments = result.rows.map((row) => ({
      content: row.content,
      date: row.date,
      likes: row.likes,
      username: row.username,
      parent_id: row.parent_id,
    }));
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error getting comments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//API Route to update the comment's likes
// API Route to update the comment's likes
app.patch('/comments/:commentId/likes', async (req, res) => {
  const { commentId } = req.params;
  const { increment } = req.body; // should be true or false
  const { username, increment } = req.body; // increment should be true or false
  try {
    const query = `UPDATE comment SET likes = likes + $1 WHERE comment_id = $2 RETURNING likes`;
    const value = increment ? 1 : -1;
    const result = await pool.query(query, [value, commentId]);
    const checkLike = await pool.query(
      'SELECT * FROM likes WHERE comment_id = $1 AND username = $2',
      [commentId, username]
    );
    if (increment) { // adding like
      if (checkLike.rowCount > 0) {
        return res.status(400).json({ message: 'User already liked this comment'});
      }
      // insert into likes table
      await pool.query(
        `INSERT INTO likes (comment_id, username) VALUES ($1, $2)`,
        [commentId, username]
      );
      const result = await pool.query(
        `UPDATE comment SET likes = likes + 1 WHERE comment_id = $1 RETURNING likes`,
        [commentId]
      );
      return res.status(200).json({ likes: result.rows[0].likes});
    } else { // removing like
      if (checkLike.rowCount > 0) {
        return res.status(400).json({ message: 'User already liked this comment'});
      }
      await pool.query(
        `DELETE FROM likes WHERE comment_id = $1 AND username = $2`,
        [commentId, username]
      );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Comment not found'});
      const result = await pool.query(
        `UPDATE comment SET likes = likes - 1 WHERE comment_id = $1 RETURNING likes`,
        [commentId]
      );
      return res.status(200).json({ likes: result.rows[0].likes});
    }
    res.status(200).json({ likes: result.rows[0].likes});
  } catch (err) {
    console.error('Error updating likes:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
