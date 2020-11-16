const database = require('../utils/database');
const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: True
        },
        isbn: {
            type: String,
            required: True
        },
        content: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        rating: {
            type: Number,
            required: True
        }
    }
)

module.exports = mongoose.model('Review', reviewSchema);
