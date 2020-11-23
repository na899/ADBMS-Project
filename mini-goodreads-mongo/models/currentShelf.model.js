const mongoose = require('mongoose');

let currentShelfSchema = new mongoose.Schema(
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

module.exports = mongoose.model('CurrentShelf', currentShelfSchema);
