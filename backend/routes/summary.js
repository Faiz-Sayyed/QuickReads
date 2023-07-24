const express = require('express');
const router = express.Router();

const getSummary = require('../controllers/getSummary.js');

router.route('/').post(getSummary);

module.exports = router;