const Summary = require('../models/Summary.js');

const getTasks = async (req, res) => {
    try {
        const task = await Summary.find({ createdBy: req.user }).sort({ createdAt: -1 });
        res.status(200).json(task);
    } catch (error) {
        console.log('Error');
    }
}

module.exports = getTasks;