const express = require('express');
const router = express.Router();

const getArticles = require('../controllers/getArticles.js');

router.route('/').get(getArticles);

module.exports = router;