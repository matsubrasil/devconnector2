const { Pool } = require('pg');

const pool = new Pool();

// ---------------------------------------------------------
// @route   GET api/auth/
// @desc    Tests auth route
// @access  Public
const user_info = async (req, res) => {
  // Open connection
  const client = await pool.connect();
  const id = req.user.id;
  try {
    //See if user exists

    const txFindUser =
      'SELECT id, name, email, avatar, create_at FROM users WHERE id = $1';
    const params_id = [id];
    let result = await pool.query(txFindUser, params_id);

    // console.log('result ==> ', result);
    const { name, email, avatar, create_at } = result.rows[0];
    return res
      .status(201)
      .send({ success: true, user: { id, name, email, avatar, create_at } });
  } catch (e) {
    console.log({ err_get_api_auth: e.message });
    return res.status(500).send({ success: false, message: 'Server Error' });
  } finally {
    client.release();
  }
};

//
const controller = {
  user_info,
};

module.exports = controller;
