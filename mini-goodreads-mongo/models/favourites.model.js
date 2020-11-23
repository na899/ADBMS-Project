const mongoose = require('mongoose');

let favouritesSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Favourites', favouritesSchema);
