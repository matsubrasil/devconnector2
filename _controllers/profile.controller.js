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

    const txFindProfile = `SELECT  p.id
                                  , p.id_user
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
                            WHERE id_user = $1;`;
    const params_id = [id];
    let result = await pool.query(txFindProfile, params_id);

    console.log('result ==> ', result);

    if (result.rowCount === 0) {
      errors.profile = 'There is no profile for this user';
      return res.status(400).send({ success: false, errors });
    }
    const id_profile = result.rows[0].id;

    const txFindSocial = `SELECT  
        twitter
      , facebook
      , linkedin
      , instagram
      , youtube
    FROM social
    WHERE id_profile = $1;`;

    const params_social = [id_profile];
    let result_social = await pool.query(txFindSocial, params_social);

    return res.status(200).send({
      success: true,
      profile: result.rows[0],
      social: result_social.rows[0],
    });
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   POST api/profile/create
// @desc    User profile create
// @access  Private
const createProfile = async (req, res) => {
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

  const { youtube, twitter, facebook, linkedin, instagram } = req.body;

  // console.log('body', req.body);

  // make list
  profileskills = skills.split(',').map(skill => skill.trim());

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
    console.log('result ==>', result);
    let result_social = null;
    if (result.rowCount == 1) {
      const id_profile = result.rows[0].id;

      const texInsertSocial = `INSERT INTO SOCIAL (
          id_profile,
          twitter,
          facebook,
          linkedin,
          instagram, 
          youtube
    
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
      const params_social = [
        id_profile,
        twitter,
        facebook,
        linkedin,
        instagram,
        youtube,
      ];
      result_social = await pool.query(texInsertSocial, params_social);
    }

    return res.status(200).send({
      success: true,
      user: req.user.id,
      profile: result.rows[0],
      social: result_social.rows[0],
    });
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   POST api/profile/update
// @desc    User profile update
// @access  Private
const updateProfile = async (req, res) => {
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

  const { youtube, twitter, facebook, linkedin, instagram } = req.body;

  // make list
  profileskills = skills.split(',').map(skill => skill.trim());

  try {
    const txUpdateProfile = `UPDATE profile
      SET
          company = $2
        , website = $3
        , location = $4
        , status =  $5
        , skills = $6
        , bio = $7
        , githubusername = $8
      WHERE id_user = $1 RETURNING *;`;

    const params_profile = [
      req.user.id,
      company,
      website,
      location,
      status,
      profileskills.toString(),
      bio,
      githubusername,
    ];

    let result = await pool.query(txUpdateProfile, params_profile);
    const id_profile = result.rows[0].id;

    const texUpdateSocial = `UPDATE SOCIAL 
      SET 
        twitter = $2,
        facebook = $3,
        linkedin = $4,
        instagram = $5, 
        youtube =$6
      WHERE id_profile = $1 RETURNING *;`;

    const params_social = [
      id_profile,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
    ];

    result_social = await pool.query(texUpdateSocial, params_social);

    console.log('update ==>', result);

    return res.status(200).send({
      success: true,
      user: req.user.id,
      profile: result.rows[0],
      social: result_social.rows[0],
    });
  } catch (e) {
    console.log({ err: e });
    return res.status(500).send({ success: false, error: 'Server Error' });
  } finally {
    client.release();
  }
};

// ---------------------------------------------------------
// @route   GET api/profile/all
// @desc    All Users profile
// @access  Public
const allProfiles = async (req, res) => {
  // Open connection
  const client = await pool.connect();
  const errors = {};

  try {
    const txFindAllProfile = `SELECT  p.id
                                , p.id_user
                                , u.name
                                , u.avatar
                                , p.company
                                , p.website
                                , p.location
                                , p.status
                                , p.skills
                                , p.bio
                                , p.githubusername
                                , s.twitter
                                , s.facebook
                                , s.linkedin
                                , s.instagram
                                , s.youtube
                          FROM profile p
                          INNER JOIN users u ON p.id_user = u.id
                          INNER JOIN social s ON p.id = s.id_profile
                          ORDER BY u.name;`;

    let result = await pool.query(txFindAllProfile);

    console.log('result ==> ', result);
    return res.status(200).send({
      success: true,
      profiles: result.rows,
    });
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
  create: createProfile,
  update: updateProfile,
  all: allProfiles,
};

module.exports = controller;
