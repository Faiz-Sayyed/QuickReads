const Summary = require('../models/Summary.js');
const User = require('../models/User.js');
const axios = require('axios');
require('dotenv').config();

const getSummary = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: {
            url: req.body.link,
            length: '3'
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
    };

    try {
        const isPresent = await Summary.findOne({ url: req.body.link, createdBy: req.user });
        if (isPresent) {
            return res.status(400).json({ error: 'Article already exists' });
        }

        const response = await axios.request(options);
        // console.log(response.data);

        const article = {
            url: req.body.link,
            content: response.data.summary,
            createdBy: req.user
        };

        await Summary.create(article);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.response) {
            return res.status(400).json({ error: error.response.data.error });
        }
        res.status(400).json({ error: error })
    }
}

module.exports = getSummary;