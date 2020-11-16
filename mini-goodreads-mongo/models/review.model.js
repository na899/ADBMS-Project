const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
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
            required: true
        }
    }
)

module.exports = mongoose.model('Review', reviewSchema);
