const mongoose = require('mongoose');

let readShelfSchema = new mongoose.Schema(
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

module.exports = mongoose.model('ReadShelf', readShelfSchema);
