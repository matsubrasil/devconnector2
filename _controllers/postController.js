const { Pool } = require('pg');

const validatePostsInput = require('./../_shared/_validation/postsInput.validation');

const pool = new Pool();

// ---------------------------------------------------------
// @route   POST api/posts
// @desc    Create new post
// @access  Private
const createPost = async (req, res) => {
  const { errors, isValid } = validatePostsInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).send({ success: false, error: errors });
  }
  /*
id serial NOT NULL PRIMARY KEY,
  id_user INTEGER,
  post_title text NOT NULL,
  post_text text NOT NULL,
  create_at TIMESTAMP DEFAULT Now(),
*/
  // Open connection
  const client = await pool.connect();

  const { title, text } = req.body;
  const id = req.user.id;

  try {
    const txInsertPosts = `INSERT INTO posts (
                                                id_user
                                              , post_title
                                              , post_text      
                                            ) VALUES ($1, $2, $3) RETURNING *;`;
    const params_posts = [id, title, text];
    let result = await pool.query(txInsertPosts, params_posts);
    console.log('result ==>', result);
    return res.status(200).send({
      success: true,
      user: id,
      posts: result.rows[0],
    });

    //
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

const controller = {
  createPost,
};

module.exports = controller;
