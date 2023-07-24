const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, 'Please provide URL'],
            match: [
                /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
                'Please provide valid URL',
            ],
            unique: [true, 'Summary already exists'],
        },
        content: {
            type: String,
            required: [true, 'Cannot be empty'],
            trim: true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Summary', SummarySchema);