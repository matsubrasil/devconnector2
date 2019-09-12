const { Pool } = require('pg');
const validateProfileInput = require('./../_shared/_validation/profileInput.validation');

const pool = new Pool();

// ---------------------------------------------------------
// @route   GET api/profile/
// @desc    Get current user profile
// @access  Private
const profile = async (req, res) => {
  // Open connection
  const client = await pool.connect();
  const errors = {};

  try {
    // Take user id
    const id = req.user.id;
    // console.log('id', id);

    const txFindProfile = `SELECT  
                                   p.id_user
                                  , u.name
                                  , u.avatar
                                  , p.company
                                  , p.website
                                  , p.location
                                  , p.status
                                  , p.skills
                                  , p.bio
                                  , p.githubusername
                            FROM profile p
                            INNER JOIN users u ON p.id_user = u.id
                            WHERE id_user = $1`;
    const params_id = [id];
    let result = await pool.query(txFindProfile, params_id);

    //console.log('result ==> ', result);

    if (result.rowCount === 0) {
      errors.profile = 'There is no profile for this user';
      return res.status(400).send({ success: false, errors });
    }

    return res.status(200).send({ success: true, profile: result.rows[0] });
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   POST api/profile/include
// @desc    User profile include
// @access  Private
const includeProfile = async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).send({ success: false, error: errors });
  }

  // Open connection
  const client = await pool.connect();

  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    githubusername,
  } = req.body;

  console.log('body', req.body);
  profileskills = skills.split(',').map(skill => skill.trim());

  console.log('skills', profileskills.toString());

  try {
    const txInsertProfile = `INSERT INTO profile (
      id_user
      , company
      , website
      , location
      , status
      , skills
      , bio
      , githubusername
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
    const params_profile = [
      req.user.id,
      website,
      company,
      location,
      status,
      profileskills.toString(),
      bio,
      githubusername,
    ];
    let result = await pool.query(txInsertProfile, params_profile);

    console.log('result ==> ', result.rows[0]);

    return res
      .status(200)
      .send({ success: true, user: req.user.id, profile: result.rows[0] });
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

//
const controller = {
  profile,
  include: includeProfile,
};

module.exports = controller;
