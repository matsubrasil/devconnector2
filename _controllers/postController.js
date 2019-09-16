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

// ---------------------------------------------------------
// @route   GET api/posts
// @desc    Get all posts
// @access  Private
const allPosts = async (req, res) => {
  // Open connection
  const client = await pool.connect();

  try {
    const txFindPosts = `SELECT p.id
                                , p.id_user
                                , u.name
                                , u.avatar
                                , p.post_title
                                , p.post_text
                                , p.create_at
                          FROM posts p
                          INNER JOIN users u ON p.id_user = u.id
                          ORDER BY create_at DESC;`;

    let result = await pool.query(txFindPosts);

    return res.status(200).send({
      success: true,
      posts: result.rows,
    });

    //
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
const postsById = async (req, res) => {
  // Open connection
  const client = await pool.connect();
  const id_post = req.params.id;
  try {
    const txFindPosts = `SELECT p.id
                                , p.id_user
                                , u.name
                                , u.avatar
                                , p.post_title
                                , p.post_text
                                , p.create_at
                          FROM posts p
                          INNER JOIN users u ON p.id_user = u.id
                          WHERE p.id = $1;`;

    const params_posts = [id_post];
    let result = await pool.query(txFindPosts, params_posts);
    console.log('result ==>', result);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Post not found' });
    }

    return res.status(200).send({
      success: true,
      posts: result.rows,
    });

    //
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   DELETE api/posts/:id
// @desc    Delete post by ID
// @access  Private
const deletePost = async (req, res) => {
  // Open connection
  const client = await pool.connect();
  const id_user = req.user.id;
  const id_post = req.params.id;
  try {
    const txFindPosts = `SELECT p.id
                            , p.id_user
                            , p.post_title
                            , p.post_text
                            , p.create_at
                        FROM posts p
                        WHERE p.id = $1;`;

    const params_posts = [id_post];
    let result = await pool.query(txFindPosts, params_posts);
    console.log('result ==>', result);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Post not found' });
    }
    if (result.rows[0].id_user !== id_user) {
      return res.status(401).send({
        success: false,
        message: 'Delete not allow, user not authorized',
      });
    }

    const txDeletePost = `DELETE FROM posts
                          WHERE id = $1;`;

    let result_delete = await pool.query(txDeletePost, params_posts);

    console.log('result_delete -->', result_delete);
    res.status(200).send({ success: true, message: 'Post removed' });

    //
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
const likePost = async (req, res) => {
  const client = await pool.connect();
  const id_user = req.user.id;
  const id_post = req.params.id;
  try {
    // check if post exists
    const txFindPosts = `SELECT p.id
                            , p.id_user
                            , p.post_title
                            , p.post_text
                            , p.create_at
                        FROM posts p
                        WHERE p.id = $1;`;

    const params_posts = [id_post];
    let result = await pool.query(txFindPosts, params_posts);

    console.log('result ==>', result);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Post not found' });
    }

    if (result.rows[0].id_user === id_user) {
      return res
        .status(400)
        .send({ success: false, message: 'Owner same user' });
    }

    // Check if already liked

    const txFindLiked = `SELECT id FROM likes WHERE user_id = $1 AND posts_id = $2;`;
    const params_kiked = [id_user, id_post];
    let result_liked = await pool.query(txFindLiked, params_kiked);

    console.log('result_liked -->', result_liked);
    if (result_liked.rowCount > 0) {
      return res
        .status(400)
        .send({ success: false, message: 'Post already liked' });
    }

    // Add like
    const txInserLikes = `INSERT INTO likes (user_id, posts_id) VALUES ($1, $2) RETURNING *;`;

    const params_insert = [id_user, id_post];
    let result_insert = await pool.query(txInserLikes, params_insert);

    console.log('result_insert ==>', result_insert);
    res.status(200).send({ success: true, message: 'Like add' });

    //
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   DELETE api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
const unlikePost = async (req, res) => {
  const client = await pool.connect();
  const id_user = req.user.id;
  const id_post = req.params.id;

  try {
    // check if post exists
    const txFindPosts = `SELECT p.id
                            , p.id_user
                            , p.post_title
                            , p.post_text
                            , p.create_at
                        FROM posts p
                        WHERE p.id = $1;`;

    const params_posts = [id_post];
    let result = await pool.query(txFindPosts, params_posts);

    console.log('result unlike ==>', result);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Post not found' });
    }

    if (result.rows[0].id_user === id_user) {
      return res
        .status(400)
        .send({ success: false, message: 'Owner same user' });
    }

    // Check if already liked
    const txFindLiked = `SELECT id FROM likes WHERE user_id = $1 AND posts_id = $2;`;
    const params_kiked = [id_user, id_post];
    let result_liked = await pool.query(txFindLiked, params_kiked);

    console.log('result_liked -->', result_liked);
    if (result_liked.rowCount === 0) {
      return res
        .status(400)
        .send({ success: false, message: 'Post not liked' });
    }

    // Add like
    const txDeleteLike = `DELETE FROM likes WHERE user_id = $1 AND posts_id = $2 RETURNING *;`;

    const params_delete = [id_user, id_post];
    let result_delete = await pool.query(txDeleteLike, params_delete);

    console.log('result_delete ==>', result_delete);
    res.status(200).send({ success: true, message: 'Unlike done' });

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
  allPosts,
  postsById,
  deletePost,
  likePost,
  unlikePost,
};
module.exports = controller;
