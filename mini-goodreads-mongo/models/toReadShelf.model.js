const database = require('../utils/database');
const mongoose = require('mongoose');

let toReadShelfSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
          },
        isbn: {
            type: String,
            required: true
          }
    }
)

module.exports = mongoose.model('ToReadShelf', toReadShelfSchema);
